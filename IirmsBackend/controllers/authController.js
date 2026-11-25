const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sequelize } = require('../config/db');
const User = require('../models/User');
const StudentProfile = require('../models/Profile');
const Department = require('../models/Department');
const Notification = require('../models/Notification');
const ReviewerApplication = require('../models/ReviewerApplication');
const crypto = require('crypto');
const axios = require('axios');
// const { User, StudentProfile, Submission } = require('../models');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });

// Process 1.0 — User Registration
exports.register = async (req, res) => {
  const { name, email, password, role, university, trade, lesson, combination, department_id } = req.body;

  const allowedRoles = ['student', 'researcher', 'scientific_staff'];
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Name, email, password and role are required.' });
  }
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ message: 'Choose a valid public registration role.' });
  }
  if (String(password).length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
  }
  if (role === 'scientific_staff') {
    const files = req.files || {};
    if (!files.resume?.[0] || !files.qualification_proof?.[0] || !files.identity_proof?.[0]) {
      return res.status(400).json({ message: 'Scientific Staff registration requires a CV, qualification proof, and identity proof.' });
    }
  }

  const t = await sequelize.transaction();
  try {
    // Process 1.0 → Users Database
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create(
      {
        name: String(name).trim(),
        email: String(email).trim().toLowerCase(),
        password_hash: hashed,
        role,
        department_id: department_id || null,
        approval_status: 'pending',
      },
      { transaction: t }
    );

    // Process 1.0 → StudentProfiles Database (all roles get a profile row)
    await StudentProfile.create(
      {
        user_id: user.user_id,
        university: university || null,
        trade: trade || null,
        lesson: lesson || null,
        combination: combination || null,
        resume_path: req.files?.resume?.[0] ? `/uploads/staff-documents/${req.files.resume[0].filename}` : null,
        qualification_proof_path: req.files?.qualification_proof?.[0] ? `/uploads/staff-documents/${req.files.qualification_proof[0].filename}` : null,
        identity_proof_path: req.files?.identity_proof?.[0] ? `/uploads/staff-documents/${req.files.identity_proof[0].filename}` : null,
      },
      { transaction: t }
    );

    // Process 1.0 → Departments Database (only if department_id provided)
    let departmentName = '';
    if (department_id) {
      const department = await Department.findOne({ where: { department_id }, transaction: t });
      if (!department) {
        await t.rollback();
        return res.status(400).json({ message: 'Selected department does not exist.' });
      }
      departmentName = department.faculties;
    }

    // Process 3.0 → Notifications Database
    await Notification.create(
      { user_id: user.user_id, message: `Thank you ${name}. Your registration is pending administrator approval${departmentName ? '. Department: ' + departmentName : ''}.` },
      { transaction: t }
    );

    await t.commit();

    res.status(201).json({
      message: 'Registration received. An administrator must approve your account before you can log in.',
    });
  } catch (err) {
    await t.rollback();
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'An account already exists for this email address.' });
    }
    res.status(500).json({ message: err.message });
  }
};

// Process 2.0 — Validate Credentials (Login)
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  try {
    // Check Users Database
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    if (user.approval_status !== 'approved') {
      const message = user.approval_status === 'rejected'
        ? 'Your registration was not approved. Please contact an administrator.'
        : 'Your registration is awaiting administrator approval.';
      return res.status(403).json({ message });
    }

    res.json({
      message: 'Login successful',
      user: { id: user.user_id, name: user.name, email: user.email, role: user.role, is_leader: user.is_leader, leadership_role: user.leadership_role },
      token: generateToken(user.user_id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const genericMessage = 'If an account exists for that email, a password reset link will be sent.';
  const email = String(req.body?.email || '').trim().toLowerCase();
  if (!email) return res.status(400).json({ message: 'Email is required.' });

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.json({ message: genericMessage });

    const rawToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    user.password_reset_token_hash = crypto.createHash('sha256').update(rawToken).digest('hex');
    user.password_reset_expires_at = expiresAt;
    await user.save();

    const serviceId = process.env.EMAILJS_SERVICE_ID || 'default_service';
    const templateId = process.env.EMAILJS_RESET_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    if (!templateId || !publicKey) {
      user.password_reset_token_hash = null;
      user.password_reset_expires_at = null;
      await user.save();
      console.error('Password reset email is not configured. Set EMAILJS_RESET_TEMPLATE_ID and EMAILJS_PUBLIC_KEY.');
      return res.json({ message: genericMessage });
    }

    const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '');
    const resetUrl = `${frontendUrl}/reset-password?token=${encodeURIComponent(rawToken)}`;
    try {
      await axios.post('https://api.emailjs.com/api/v1.0/email/send', {
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: process.env.EMAILJS_PRIVATE_KEY || undefined,
        template_params: {
          to_email: user.email,
          user_name: user.name,
          reset_url: resetUrl,
          expires_in: '1 hour',
        },
      }, { timeout: 10000 });
    } catch (emailError) {
      user.password_reset_token_hash = null;
      user.password_reset_expires_at = null;
      await user.save();
      console.error('Password reset email delivery failed:', emailError.message);
    }

    return res.json({ message: genericMessage });
  } catch (err) {
    console.error('Password reset request failed:', err.message);
    return res.json({ message: genericMessage });
  }
};

exports.resetPassword = async (req, res) => {
  const token = String(req.body?.token || '');
  const password = String(req.body?.password || '');
  if (!token || password.length < 8) {
    return res.status(400).json({ message: !token ? 'A valid reset token is required.' : 'Password must be at least 8 characters long.' });
  }

  try {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({ where: { password_reset_token_hash: tokenHash } });
    if (!user || !user.password_reset_expires_at || user.password_reset_expires_at <= new Date()) {
      return res.status(400).json({ message: 'This password reset link is invalid or expired. Request a new one.' });
    }

    user.password_hash = await bcrypt.hash(password, 10);
    user.password_reset_token_hash = null;
    user.password_reset_expires_at = null;
    await user.save();
    return res.json({ message: 'Password reset successful. You can now sign in.' });
  } catch (err) {
    return res.status(500).json({ message: 'Could not reset the password. Please try again.' });
  }
};

exports.me = async (req, res) => {
  try {
    if (req.user.role === 'reviewer') {
      const application = await ReviewerApplication.findByPk(req.user.user_id, {
        attributes: ['application_id', 'full_name', 'email', 'status'],
      });
      if (!application || application.status !== 'accepted') {
        return res.status(404).json({ message: 'Reviewer account not found.' });
      }
      return res.json({
        user_id: application.application_id,
        name: application.full_name,
        email: application.email,
        role: 'reviewer',
      });
    }

    const user = await User.findByPk(req.user.user_id, {
      attributes: { exclude: ['password_hash'] },
    });

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const { name, email, currentPassword, newPassword } = req.body || {};
    const normalizedName = typeof name === 'string' ? name.trim() : undefined;
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : undefined;
    const changingPassword = newPassword !== undefined && newPassword !== '';
    const missingCurrentPassword = typeof currentPassword !== 'string' || !currentPassword;

    if (normalizedName !== undefined && !normalizedName) {
      return res.status(400).json({ message: 'Name cannot be empty.' });
    }
    if (normalizedEmail !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({ message: 'Enter a valid email address.' });
    }
    if (changingPassword && (missingCurrentPassword || typeof newPassword !== 'string' || newPassword.length < 8)) {
      return res.status(400).json({
        message: missingCurrentPassword ? 'Enter your current password to change it.' : 'Password must be at least 8 characters long.',
      });
    }

    if (req.user.role === 'reviewer') {
      const application = await ReviewerApplication.findByPk(req.user.user_id);
      if (!application || application.status !== 'accepted') {
        return res.status(404).json({ message: 'Reviewer account not found.' });
      }
      if (!application.password_hash || (changingPassword && !await bcrypt.compare(currentPassword, application.password_hash))) {
        return res.status(400).json({ message: 'Current password is incorrect.' });
      }
      if (normalizedEmail !== undefined && normalizedEmail !== application.email) {
        const [existingUser, existingReviewer] = await Promise.all([
          User.findOne({ where: { email: normalizedEmail } }),
          ReviewerApplication.findOne({ where: { email: normalizedEmail } }),
        ]);
        if (existingUser || (existingReviewer && existingReviewer.application_id !== application.application_id)) {
          return res.status(400).json({ message: 'Email already registered to another account.' });
        }
      }

      const changes = {};
      if (normalizedName !== undefined) changes.full_name = normalizedName;
      if (normalizedEmail !== undefined) changes.email = normalizedEmail;
      if (changingPassword) changes.password_hash = await bcrypt.hash(newPassword, 10);
      if (Object.keys(changes).length === 0) {
        return res.status(400).json({ message: 'No account details provided to update.' });
      }
      await application.update(changes);
      return res.json({
        message: 'Account updated successfully',
        user: {
          id: application.application_id,
          user_id: application.application_id,
          name: application.full_name,
          email: application.email,
          role: 'reviewer',
        },
      });
    }

    const user = await User.findByPk(req.user.user_id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const payload = {};

    if (normalizedName !== undefined) payload.name = normalizedName;
    if (normalizedEmail !== undefined) {
      const [existingUser, existingReviewer] = await Promise.all([
        User.findOne({ where: { email: normalizedEmail } }),
        ReviewerApplication.findOne({ where: { email: normalizedEmail } }),
      ]);
      if ((existingUser && existingUser.user_id !== user.user_id) || existingReviewer) {
        return res.status(400).json({ message: 'Email already registered to another account.' });
      }
      payload.email = normalizedEmail;
    }
    if (changingPassword) {
      if (!await bcrypt.compare(currentPassword, user.password_hash)) {
        return res.status(400).json({ message: 'Current password is incorrect.' });
      }
      payload.password_hash = await bcrypt.hash(newPassword, 10);
    }

    if (Object.keys(payload).length === 0) {
      return res.status(400).json({ message: 'No account details provided to update.' });
    }

    await user.update(payload);

    res.json({
      message: 'Account updated successfully',
      user: {
        id: user.user_id,
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Account update failed:', err);
    res.status(500).json({ message: 'Could not update account details. Please try again.' });
  }
};

exports.deleteMe = async (req, res) => {
  try {
    const id = req.user.user_id;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await StudentProfile.destroy({ where: { user_id: id } });
    await Notification.destroy({ where: { user_id: id } });
    await sequelize.query('UPDATE Messages SET sender_id=NULL WHERE sender_id=:id', { replacements: { id } });
    await sequelize.query('UPDATE Messages SET receiver_id=NULL WHERE receiver_id=:id', { replacements: { id } });
    await sequelize.query('UPDATE Payments SET user_id=NULL WHERE user_id=:id', { replacements: { id } });
    await sequelize.query('UPDATE Research_Submissions SET user_id=NULL WHERE user_id=:id', { replacements: { id } });

    await user.destroy();

    res.json({ message: 'Your account has been deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
