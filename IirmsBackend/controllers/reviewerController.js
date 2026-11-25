const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ReviewerApplication = require('../models/ReviewerApplication');
const User = require('../models/User');
const Submission = require('../models/Submission');
const PeerReview = require('../models/PeerReview');
const { Op } = require('sequelize');

const uploadDir = path.join(__dirname, '../uploads/reviewer');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

exports.reviewerLogin = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const application = await ReviewerApplication.findOne({
      where: { email: String(email).trim().toLowerCase() },
    });
    if (!application || application.status !== 'accepted') {
      const message = application?.status === 'rejected'
        ? 'Your reviewer application was not approved. Please contact an administrator.'
        : 'Your reviewer application is awaiting administrator approval.';
      return res.status(403).json({ message });
    }

    const passwordMatches = application.password_hash && await bcrypt.compare(password, application.password_hash);
    if (!passwordMatches) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ reviewer_application_id: application.application_id, email: application.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });
    res.json({
      message: 'Reviewer login successful.',
      token,
      user: { id: application.application_id, name: application.full_name, email: application.email, role: 'reviewer' },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.submitReviewerApplication = async (req, res) => {
  try {
    const body = req.body || {};
    const required = [
      'salutation',
      'full_name',
      'qualification',
      'designation',
      'department',
      'organization',
      'discipline_field',
      'research_areas',
      'email',
      'password',
      'mobile_number',
      'country',
      'state_province',
      'city_district',
      'postal_code',
      'address',
    ];

    for (const field of required) {
      if (!body[field] || !String(body[field]).trim()) {
        return res.status(400).json({ message: `Field "${field}" is required.` });
      }
    }

    if (String(body.password).length < 8) {
      return res.status(400).json({ message: 'Reviewer password must be at least 8 characters.' });
    }

    if (!req.files || !req.files.resume || !req.files.qualification_proof || !req.files.identity_proof) {
      return res.status(400).json({ message: 'Resume, qualification proof, and identity proof are required.' });
    }

    const resume = req.files.resume[0];
    const qualificationProof = req.files.qualification_proof[0];
    const identityProof = req.files.identity_proof[0];

    const payload = {
      salutation: body.salutation,
      full_name: body.full_name,
      qualification: body.qualification,
      designation: body.designation,
      department: body.department,
      organization: body.organization,
      discipline_field: body.discipline_field,
      research_areas: body.research_areas,
      email: body.email,
      password_hash: await bcrypt.hash(body.password, 10),
      mobile_number: body.mobile_number,
      country: body.country,
      state_province: body.state_province,
      city_district: body.city_district,
      postal_code: body.postal_code,
      address: body.address,
      resume_path: `/uploads/reviewer/${resume.filename}`,
      qualification_proof_path: `/uploads/reviewer/${qualificationProof.filename}`,
      identity_proof_path: `/uploads/reviewer/${identityProof.filename}`,
      status: 'pending',
    };

    const existing = await ReviewerApplication.findOne({
      where: { email: { [Op.eq]: body.email } },
    });

    if (existing) {
      return res.status(400).json({ message: 'A reviewer application with this email already exists.' });
    }

    const app = await ReviewerApplication.create(payload);
    res.status(201).json({ message: 'Reviewer application submitted successfully.', application: app });
  } catch (err) {
    console.error('submitReviewerApplication error', err);
    res.status(500).json({ message: err.message || 'Failed to submit reviewer application.' });
  }
};

exports.getReviewerApplications = async (req, res) => {
  try {
    const apps = await ReviewerApplication.findAll({
      include: [{ model: User, as: 'reviewed_admin', attributes: ['user_id', 'name', 'email'] }],
      order: [['created_at', 'DESC']],
    });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateReviewerApplicationStatus = async (req, res) => {
  try {
    const { status, comments } = req.body || {};
    const allowed = ['pending', 'accepted', 'minor_revisions', 'major_revisions', 'rejected'];

    if (!allowed.includes(status)) {
      return res.status(400).json({ message: 'Status must be pending, accepted, minor_revisions, major_revisions, or rejected.' });
    }

    const app = await ReviewerApplication.findByPk(req.params.id);
    if (!app) return res.status(404).json({ message: 'Application not found.' });

    await app.update({
      status,
      reviewed_by: req.user.user_id,
      reviewed_at: new Date(),
      comments: comments || app.comments,
    });

    res.json({ message: 'Reviewer application updated.', application: app });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getReviewerApplication = async (req, res) => {
  try {
    const app = await ReviewerApplication.findByPk(req.params.id, {
      include: [{ model: User, as: 'reviewed_admin', attributes: ['user_id', 'name', 'email'] }],
    });
    if (!app) return res.status(404).json({ message: 'Application not found.' });
    res.json(app);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const isApprovedReviewer = async (user) => {
  if (!user || !user.email) return false;
  if (user.role === 'admin') return true;
  const app = await ReviewerApplication.findOne({
    where: {
      email: user.email,
      status: 'accepted',
    },
  });
  return Boolean(app);
};

exports.getReviewerSubmissions = async (req, res) => {
  try {
    const allowed = await isApprovedReviewer(req.user);
    if (!allowed) {
      return res.status(403).json({ message: 'Only approved reviewers can access this panel.' });
    }

    const submissions = await Submission.findAll({
      where: {
        status: {
          [Op.in]: ['submitted', 'under_review', 'minor_revisions', 'major_revisions'],
        },
      },
      include: [{ model: User, as: 'user', attributes: ['user_id', 'name', 'email'] }],
      order: [['submitted_at', 'DESC']],
    });

    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.submitSubmissionReview = async (req, res) => {
  try {
    const allowed = await isApprovedReviewer(req.user);
    if (!allowed) {
      return res.status(403).json({ message: 'Only approved reviewers can review submissions.' });
    }

    const decision = req.body?.decision;
    const comments = req.body?.comments || '';
    const allowedDecisions = ['accepted', 'minor_revisions', 'major_revisions', 'rejected'];

    if (!allowedDecisions.includes(decision)) {
      return res.status(400).json({ message: 'Invalid review decision.' });
    }

    const submission = await Submission.findByPk(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found.' });
    }

    await PeerReview.create({
      submission_id: submission.submission_id,
      reviewer_id: req.user.role === 'reviewer' ? null : req.user.user_id,
      reviewer_application_id: req.user.role === 'reviewer' ? req.user.user_id : null,
      decision,
      comments,
    });

    const nextStatus = decision === 'accepted' ? 'approved' : decision;
    await submission.update({ status: nextStatus });

    res.json({
      message: 'Review submitted successfully.',
      status: nextStatus,
      submission,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
