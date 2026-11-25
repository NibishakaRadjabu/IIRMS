const path = require('path');
const multer = require('multer');
const EventNews = require('../models/EventNews');
const { User, StudentProfile, Submission } = require('../models');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => cb(null, `event_${Date.now()}${path.extname(file.originalname)}`),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    allowed.test(path.extname(file.originalname).toLowerCase())
      ? cb(null, true)
      : cb(new Error('Only image files are allowed'));
  },
});

exports.upload = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (!err) return next();

    const message = err instanceof multer.MulterError
      ? err.message
      : err.message || 'Unable to upload the event/news image.';
    return res.status(400).json({ message });
  });
};

// Get all active events and news
exports.getEventsAndNews = async (req, res) => {
  try {
    const events = await EventNews.findAll({
      where: { is_active: true },
      order: [['event_date', 'DESC'], ['created_at', 'DESC']],
    });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all events and news (admin)
exports.getAllEventsAndNews = async (req, res) => {
  try {
    const events = await EventNews.findAll({
      order: [['event_date', 'DESC'], ['created_at', 'DESC']],
    });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create event/news
exports.createEventNews = async (req, res) => {
  try {
    const image_url = req.file ? `/uploads/${req.file.filename}` : req.body.image_url || null;
    const event = await EventNews.create({
      ...req.body,
      image_url,
      created_by: req.user?.id,
    });
    res.status(201).json(event);
  } catch (err) {
    console.error('Error creating event/news:', err);
    res.status(500).json({ message: err.message || 'Failed to create event/news' });
  }
};

// Update event/news
exports.updateEventNews = async (req, res) => {
  try {
    const event = await EventNews.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event/News not found' });
    
    const image_url = req.file ? `/uploads/${req.file.filename}` : event.image_url;
    await event.update({ ...req.body, image_url });
    res.json(event);
  } catch (err) {
    console.error('Error updating event/news:', err);
    res.status(500).json({ message: err.message || 'Failed to update event/news' });
  }
};

// Delete event/news
exports.deleteEventNews = async (req, res) => {
  try {
    const event = await EventNews.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event/News not found' });
    
    await event.destroy();
    res.json({ message: 'Event/News deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get event/news by id
exports.getEventNewsById = async (req, res) => {
  try {
    const event = await EventNews.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event/News not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
