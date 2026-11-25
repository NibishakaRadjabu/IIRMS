const path = require('path');
const multer = require('multer');
const HeroSlide = require('../models/HeroSlide');
const { User, StudentProfile, Submission } = require('../models');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => cb(null, `slide_${Date.now()}${path.extname(file.originalname)}`),
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
      : err.message || 'Unable to upload the slide image.';
    return res.status(400).json({ message });
  });
};

exports.getSlides = async (req, res) => {
  try {
    const slides = await HeroSlide.findAll({ order: [['created_at', 'DESC']] });
    res.json(slides);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createSlide = async (req, res) => {
  try {
    const image_url = req.file ? `/uploads/${req.file.filename}` : req.body.image_url || null;
    const slide = await HeroSlide.create({ ...req.body, image_url });
    res.status(201).json(slide);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateSlide = async (req, res) => {
  try {
    const slide = await HeroSlide.findByPk(req.params.id);
    if (!slide) return res.status(404).json({ message: 'Slide not found' });
    const image_url = req.file ? `/uploads/${req.file.filename}` : slide.image_url;
    await slide.update({ ...req.body, image_url });
    res.json(slide);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteSlide = async (req, res) => {
  try {
    const slide = await HeroSlide.findByPk(req.params.id);
    if (!slide) return res.status(404).json({ message: 'Slide not found' });
    await slide.destroy();
    res.json({ message: 'Slide deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
