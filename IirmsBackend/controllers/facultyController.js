const User = require('../models/User');
const StudentProfile = require('../models/Profile');
const Department = require('../models/Department');
const Submission = require('../models/Submission');
const Notification = require('../models/Notification');
const { Op } = require('sequelize');
const publishApprovedSubmission = require('../services/publishApprovedSubmission');
// const { User, StudentProfile, Submission } = require('../models');

// GET /api/faculty/department — own department info
exports.getDepartment = async (req, res) => {
  try {
    const dept = await Department.findByPk(req.user.department_id);
    if (!dept) return res.status(404).json({ message: 'Department not found' });
    res.json({ department_id: dept.department_id, faculties: dept.faculties, depertment: dept.depertment, speciality: dept.speciality });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET /api/faculty/students — students in same department
exports.getStudents = async (req, res) => {
  try {
    const members = await StudentProfile.findAll({
      include: [{
        model: User,
        as: 'profile_user',
        attributes: ['user_id', 'name', 'email', 'role'],
        where: {
          department_id: req.user.department_id,
          role: { [Op.in]: ['student', 'researcher'] },
        },
      }],
    });
    // Preserve the frontend response contract while using the Sequelize alias
    // declared in models/index.js.
    res.json(members.map((member) => {
      const data = member.toJSON();
      data.user = data.profile_user;
      delete data.profile_user;
      return data;
    }));
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET /api/faculty/staff — scientific staff in the leader's department
exports.getScientificStaff = async (req, res) => {
  try {
    const staff = await User.findAll({
      where: { department_id: req.user.department_id, role: 'scientific_staff' },
      attributes: ['user_id', 'name', 'email', 'is_leader', 'leadership_role', 'created_at'],
      order: [['name', 'ASC']],
    });
    res.json(staff);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET /api/faculty/submissions — submissions in same department
exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.findAll({
      where: { department_id: req.user.department_id },
      include: [{ model: User, as: 'user', attributes: ['user_id', 'name', 'email'] }],
    });
    res.json(submissions);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// PUT /api/faculty/submissions/:id — update submission status
exports.updateSubmission = async (req, res) => {
  try {
    const sub = await Submission.findOne({
      where: { submission_id: req.params.id, department_id: req.user.department_id },
    });
    if (!sub) return res.status(404).json({ message: 'Submission not found in your department' });
    await sub.update({ status: req.body.status });
    await publishApprovedSubmission(sub);
    res.json(sub);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// POST /api/faculty/notifications — send notification to a student
exports.sendNotification = async (req, res) => {
  try {
    const userId = Number(req.body.user_id);
    const message = typeof req.body.message === 'string' ? req.body.message.trim() : '';

    if (!Number.isInteger(userId) || userId < 1) {
      return res.status(400).json({ message: 'A valid recipient is required.' });
    }
    if (!message) return res.status(400).json({ message: 'Notification message is required.' });

    const target = await User.findOne({
      where: {
        user_id: userId,
        department_id: req.user.department_id,
        role: { [Op.in]: ['student', 'researcher'] },
      },
    });
    if (!target) {
      return res.status(403).json({ message: 'You can notify only students or researchers in your department.' });
    }

    const notif = await Notification.create({ user_id: userId, message });
    res.status(201).json(notif);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
