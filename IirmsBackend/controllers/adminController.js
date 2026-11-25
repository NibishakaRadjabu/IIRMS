const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/db');
const User = require('../models/User');
const StudentProfile = require('../models/Profile');
const Department = require('../models/Department');
const Submission = require('../models/Submission');
const Certificate = require('../models/Certificate');
const Payment = require('../models/Payment');
const Notification = require('../models/Notification');
const Message = require('../models/Message');
const Project = require('../models/Project');
const FundingGrant = require('../models/FundingGrant');
const publishApprovedSubmission = require('../services/publishApprovedSubmission');
// const { User, StudentProfile, Submission } = require('../models');

const isAdmin = (req) => req.user?.role === 'admin';
const isDepartmentManager = (req) =>
  req.user?.role === 'scientific_staff' && Boolean(req.user.can_manage_department) && Boolean(req.user.department_id);

const canManageDepartmentId = (req, departmentId) => {
  if (isAdmin(req)) return true;
  return isDepartmentManager(req) && Number(req.user.department_id) === Number(departmentId);
};

const requireDepartmentAccess = (req, res, departmentId) => {
  if (canManageDepartmentId(req, departmentId)) return true;
  res.status(403).json({ message: 'You can manage only records in your own department.' });
  return false;
};

// ── USERS ──────────────────────────────────────────────
exports.getUsers = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required.' });
    const users = await User.findAll({ attributes: { exclude: ['password_hash'] } });
    res.json(users);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// Approval is intentionally separate from ordinary user editing so a public
// registration can never promote itself or grant itself access.
exports.setUserApproval = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    const { approval_status } = req.body;
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!['approved', 'rejected'].includes(approval_status)) {
      return res.status(400).json({ message: 'Approval status must be approved or rejected.' });
    }
    if (user.user_id === req.user.user_id && approval_status !== 'approved') {
      return res.status(400).json({ message: 'You cannot revoke your own administrator access.' });
    }

    await user.update({
      approval_status,
      approved_by: req.user.user_id,
      approved_at: new Date(),
    });
    res.json({ message: `User ${approval_status}.` });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required.' });
    const { name, email, password, role, can_manage_department } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password_hash: hashed,
      role,
      can_manage_department: role === 'scientific_staff' && can_manage_department === true,
      approval_status: 'approved',
      approved_by: req.user.user_id,
      approved_at: new Date(),
    });
    await StudentProfile.create({ user_id: user.user_id });
    res.status(201).json({ message: 'User created', user_id: user.user_id });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateUser = async (req, res) => {
  try {
    const targetId = Number(req.params.id);
    const isSelf = Number(req.user.user_id) === targetId;

    if (!req.user || (req.user.role !== 'admin' && !isSelf)) {
      return res.status(403).json({ message: 'You can only update your own account unless you are an admin.' });
    }

    const user = await User.findByPk(targetId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { password, ...rest } = req.body;
    if (password) rest.password_hash = await bcrypt.hash(password, 10);

    if ('can_manage_department' in rest && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only an admin can grant department-management permission.' });
    }
    if (req.user.role === 'admin') {
      rest.can_manage_department = rest.role === 'scientific_staff' && rest.can_manage_department === true;
    } else {
      delete rest.can_manage_department;
    }

    if (rest.email) {
      const existing = await User.findOne({ where: { email: rest.email } });
      if (existing && existing.user_id !== targetId) {
        return res.status(400).json({ message: 'Email already registered to another account.' });
      }
    }

    await user.update(rest);
    res.json({ message: 'User updated' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteUser = async (req, res) => {
  try {
    const targetId = Number(req.params.id);
    const isSelf = Number(req.user.user_id) === targetId;

    if (!req.user || (req.user.role !== 'admin' && !isSelf)) {
      return res.status(403).json({ message: 'You can only delete your own account unless you are an admin.' });
    }

    const id = targetId;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await sequelize.query('SET FOREIGN_KEY_CHECKS=0');
    await Notification.destroy({ where: { user_id: id } });
    await StudentProfile.destroy({ where: { user_id: id } });
    await sequelize.query('UPDATE Messages SET sender_id=NULL WHERE sender_id=:id', { replacements: { id } });
    await sequelize.query('UPDATE Messages SET receiver_id=NULL WHERE receiver_id=:id', { replacements: { id } });
    await sequelize.query('UPDATE Payments SET user_id=NULL WHERE user_id=:id', { replacements: { id } });
    await sequelize.query('UPDATE Research_Submissions SET user_id=NULL WHERE user_id=:id', { replacements: { id } });
    await user.destroy();
    await sequelize.query('SET FOREIGN_KEY_CHECKS=1');
    res.json({ message: 'User deleted' });
  } catch (err) {
    await sequelize.query('SET FOREIGN_KEY_CHECKS=1').catch(() => {});
    res.status(500).json({ message: err.message });
  }
};

// ── DEPARTMENTS ────────────────────────────────────────
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.json(departments);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createDepartment = async (req, res) => {
  try {
    const dept = await Department.create(req.body);
    res.status(201).json(dept);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateDepartment = async (req, res) => {
  try {
    const dept = await Department.findByPk(req.params.id);
    if (!dept) return res.status(404).json({ message: 'Department not found' });
    if (!requireDepartmentAccess(req, res, dept.department_id)) return;
    await dept.update(req.body);
    res.json(dept);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const dept = await Department.findByPk(req.params.id);
    if (!dept) return res.status(404).json({ message: 'Department not found' });
    if (!requireDepartmentAccess(req, res, dept.department_id)) return;
    await dept.destroy();
    res.json({ message: 'Department deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ── STUDENT PROFILES ───────────────────────────────────
exports.getStudents = async (req, res) => {
  try {
    const students = await StudentProfile.findAll({
      include: [{ model: User, as: 'profile_user', attributes: ['user_id', 'name', 'email', 'role'] }],
    });
    res.json(students.map((student) => {
      const data = student.toJSON();
      data.user = data.profile_user;
      delete data.profile_user;
      return data;
    }));
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateStudent = async (req, res) => {
  try {
    const profile = await StudentProfile.findByPk(req.params.id, {
      include: [{ model: User, as: 'profile_user', attributes: ['user_id', 'department_id'] }],
    });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    if (!requireDepartmentAccess(req, res, profile.profile_user?.department_id)) return;
    await profile.update(req.body);
    res.json(profile);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteStudent = async (req, res) => {
  try {
    const profile = await StudentProfile.findByPk(req.params.id, {
      include: [{ model: User, as: 'profile_user', attributes: ['user_id', 'department_id'] }],
    });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    if (!requireDepartmentAccess(req, res, profile.profile_user?.department_id)) return;
    await profile.destroy();
    res.json({ message: 'Student profile deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ── SUBMISSIONS ────────────────────────────────────────
exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.findAll({
      include: [{ model: User, as: 'user', attributes: ['user_id', 'name', 'email'] }],
    });
    res.json(submissions);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateSubmission = async (req, res) => {
  try {
    const sub = await Submission.findByPk(req.params.id);
    if (!sub) return res.status(404).json({ message: 'Submission not found' });
    if (!requireDepartmentAccess(req, res, sub.department_id)) return;
    await sub.update(req.body);
    await publishApprovedSubmission(sub);
    res.json(sub);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteSubmission = async (req, res) => {
  try {
    const sub = await Submission.findByPk(req.params.id);
    if (!sub) return res.status(404).json({ message: 'Submission not found' });
    if (!requireDepartmentAccess(req, res, sub.department_id)) return;
    await sub.destroy();
    res.json({ message: 'Submission deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ── CERTIFICATES ───────────────────────────────────────
exports.getCertificates = async (req, res) => {
  try {
    const certs = await Certificate.findAll({
      include: [{ model: Submission, as: 'submission' }],
    });
    res.json(certs);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateCertificate = async (req, res) => {
  try {
    const cert = await Certificate.findByPk(req.params.id, {
      include: [{ model: Submission, as: 'submission', attributes: ['submission_id', 'department_id'] }],
    });
    if (!cert) return res.status(404).json({ message: 'Certificate not found' });
    if (!requireDepartmentAccess(req, res, cert.submission?.department_id)) return;
    await cert.update(req.body);
    res.json(cert);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteCertificate = async (req, res) => {
  try {
    const cert = await Certificate.findByPk(req.params.id, {
      include: [{ model: Submission, as: 'submission', attributes: ['submission_id', 'department_id'] }],
    });
    if (!cert) return res.status(404).json({ message: 'Certificate not found' });
    if (!requireDepartmentAccess(req, res, cert.submission?.department_id)) return;
    await cert.destroy();
    res.json({ message: 'Certificate deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ── PAYMENTS ───────────────────────────────────────────
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: [{ model: User, as: 'user', attributes: ['user_id', 'name', 'email'] }],
    });
    res.json(payments);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    await payment.destroy();
    res.json({ message: 'Payment deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getProjects = async (req, res) => {
  try {
    res.json(await Project.findAll({ order: [['project_name', 'ASC']] }));
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getFundingGrants = async (req, res) => {
  try {
    const grants = await FundingGrant.findAll({
      include: [{ model: Project, as: 'project', attributes: ['project_id', 'project_name'] }],
      order: [['funding_id', 'DESC']],
    });
    res.json(grants);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createFundingGrant = async (req, res) => {
  try {
    const projectId = Number(req.body.project_id);
    const grantAmount = Number(req.body.grant_amount);
    if (!Number.isInteger(projectId) || projectId < 1) return res.status(400).json({ message: 'A valid project is required.' });
    if (!Number.isFinite(grantAmount) || grantAmount < 0) return res.status(400).json({ message: 'Grant amount must be a non-negative number.' });

    const project = await Project.findByPk(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found.' });
    if (!requireDepartmentAccess(req, res, project.department_id)) return;

    const grant = await FundingGrant.create({ project_id: projectId, grant_amount: grantAmount });
    const createdGrant = await FundingGrant.findByPk(grant.funding_id, {
      include: [{ model: Project, as: 'project', attributes: ['project_id', 'project_name'] }],
    });
    res.status(201).json(createdGrant);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteFundingGrant = async (req, res) => {
  try {
    const grant = await FundingGrant.findByPk(req.params.id, {
      include: [{ model: Project, as: 'project', attributes: ['project_id', 'department_id'] }],
    });
    if (!grant) return res.status(404).json({ message: 'Funding grant not found.' });
    if (!requireDepartmentAccess(req, res, grant.project?.department_id)) return;
    await grant.destroy();
    res.json({ message: 'Funding grant deleted.' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ── NOTIFICATIONS ──────────────────────────────────────
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      include: [{ model: User, as: 'user', attributes: ['user_id', 'name', 'email'] }],
    });
    res.json(notifications);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createNotification = async (req, res) => {
  try {
    const userId = Number(req.body.user_id);
    const message = typeof req.body.message === 'string' ? req.body.message.trim() : '';
    if (!Number.isInteger(userId) || userId < 1) {
      return res.status(400).json({ message: 'A valid user ID is required.' });
    }
    if (!message) return res.status(400).json({ message: 'Notification message is required.' });

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const notification = await Notification.create({ user_id: userId, message });
    res.status(201).json(notification);
  } catch (err) {
    if (err.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(404).json({ message: 'User not found. Refresh the page and choose an existing user.' });
    }
    res.status(500).json({ message: err.message });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    await notification.destroy();
    res.json({ message: 'Notification deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
