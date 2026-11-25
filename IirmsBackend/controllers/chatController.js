const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { Op } = require('sequelize');
const Message = require('../models/Message');
const User = require('../models/User');
// const { User, StudentProfile, Submission } = require('../models');

const uploadDir = path.join(__dirname, '../uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname || 'file');
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    cb(null, safeName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

const allowedRoleContact = (senderRole, targetRole) => {
  const userRoles = ['student', 'researcher', 'scientific_staff'];
  if (userRoles.includes(senderRole) && targetRole === 'admin') return true;
  if (senderRole === 'admin' && userRoles.includes(targetRole)) return true;
  return false;
};

exports.upload = upload.single('file');

exports.getContacts = async (req, res) => {
  try {
    if (!req.user || !req.user.user_id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const currentRole = req.user.role;
    let where = { role: 'admin' };

    if (currentRole === 'admin') {
      where = { role: { [Op.in]: ['student', 'researcher', 'scientific_staff'] } };
    }

    const contacts = await User.findAll({
      where,
      attributes: ['user_id', 'name', 'email', 'role'],
      order: [['name', 'ASC']],
    });

    res.json(contacts.map(user => ({
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      role: user.role,
    })));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    if (!req.user || !req.user.user_id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const senderId = req.user.user_id;
    const { receiverId, content } = req.body;

    if (!receiverId) {
      return res.status(400).json({ message: 'Receiver is required.' });
    }

    const receiver = await User.findByPk(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found.' });
    }

    if (!allowedRoleContact(req.user.role, receiver.role)) {
      return res.status(403).json({ message: 'You can only chat with admin or student/scientific contacts.' });
    }

    if (!content && !req.file) {
      return res.status(400).json({ message: 'Message text or document is required.' });
    }

    const message = await Message.create({
      sender_id: senderId,
      receiver_id: receiverId,
      content: content || null,
      file_url: req.file ? `/uploads/${req.file.filename}` : null,
      file_name: req.file ? req.file.originalname : null,
      file_type: req.file ? req.file.mimetype : null,
    });

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    if (!req.user || !req.user.user_id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const userId = req.user.user_id;
    const { receiverId } = req.query;

    if (!receiverId) {
      return res.status(400).json({ message: 'A receiverId is required.' });
    }

    const receiver = await User.findByPk(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found.' });
    }

    if (!allowedRoleContact(req.user.role, receiver.role)) {
      return res.status(403).json({ message: 'You cannot access this chat.' });
    }

    const msgs = await Message.findAll({
      where: {
        [Op.or]: [
          { sender_id: userId, receiver_id: receiverId },
          { sender_id: receiverId, receiver_id: userId },
        ],
      },
      order: [['timestamp', 'ASC']],
      include: [
        { model: User, as: 'sender', attributes: ['user_id', 'name', 'role'] },
        { model: User, as: 'receiver', attributes: ['user_id', 'name', 'role'] },
      ],
    });

    res.json(msgs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
