const { User, StudentProfile, Submission } = require('../models');

const canAccessSubmission = (req, submission) => {
  if (req.user.role === 'admin') return true;
  if (Number(submission.user_id) === Number(req.user.user_id)) return true;
  return req.user.role === 'scientific_staff'
    && Number(submission.department_id) === Number(req.user.department_id);
};

const canManageSubmission = (req, submission) => {
  if (req.user.role === 'admin') return true;
  return Number(submission.user_id) === Number(req.user.user_id);
};

exports.createSubmission = async (req, res) => {
  try {
    if (!req.user || !req.user.user_id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const userId = req.user.user_id;
    const payload = req.body || {};
    const title = typeof payload.title === 'string' ? payload.title : '';
    const abstract = typeof payload.abstract === 'string' ? payload.abstract : null;
    const researchSummary = typeof payload.research_summary === 'string'
      ? payload.research_summary
      : typeof payload.researchSummary === 'string'
        ? payload.researchSummary
        : null;
    const providedFilePath = typeof payload.file_path === 'string' ? payload.file_path : null;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'A submission title is required.' });
    }

    const filePath = req.file ? `/uploads/${req.file.filename}` : providedFilePath;

    // Never accept the owner, department, or review status from the browser.
    // They must be derived from the authenticated account / workflow.
    const submission = await Submission.create({
      title: title.trim(),
      abstract: abstract ? abstract.trim() : null,
      research_summary: researchSummary ? researchSummary.trim() : null,
      file_path: filePath,
      user_id: userId,
      department_id: req.user.department_id || null,
    });
    res.status(201).json(submission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSubmissions = async (req, res) => {
  try {
    if (!req.user || !req.user.user_id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const userId = req.user.user_id;
    const submissions = await Submission.findAll({ where: { user_id: userId } });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSubmission = async (req, res) => {
  try {
    const submission = await Submission.findByPk(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Not found' });
    if (!canAccessSubmission(req, submission)) {
      return res.status(403).json({ message: 'You can only read your own submissions or submissions in your department.' });
    }
    res.json(submission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSubmission = async (req, res) => {
  try {
    const submission = await Submission.findByPk(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Not found' });
    if (!canManageSubmission(req, submission)) {
      return res.status(403).json({ message: 'Only the owner account or an admin can edit this submission.' });
    }

    const { title, file_path, department_id } = req.body;
    const updates = {};
    if (title) updates.title = title;
    if (file_path !== undefined) updates.file_path = file_path;
    if (department_id !== undefined) updates.department_id = department_id;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No editable submission details provided.' });
    }

    await submission.update(updates);
    res.json(submission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteSubmission = async (req, res) => {
  try {
    const submission = await Submission.findByPk(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Not found' });
    if (!canManageSubmission(req, submission)) {
      return res.status(403).json({ message: 'Only the owner account or an admin can delete this submission.' });
    }

    await submission.destroy();
    res.json({ message: 'Submission deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
