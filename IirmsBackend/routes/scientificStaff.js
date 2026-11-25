// // routes/scientificStaff.js
// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const { protect, requireAdmin } = require("../middleware/authMiddleware");

// // Get all scientific staff
// router.get("/", protect, requireAdmin, async (req, res) => {
//   const staff = await User.findAll({ where: { role: "scientific_staff" } });
//   res.json(staff);
// });

// // Verify scientific staff by ID
// router.put("/:id/verify", protect, requireAdmin, async (req, res) => {
//   const staff = await User.findByPk(req.params.id);
//   if (!staff || staff.role !== "scientific_staff") {
//     return res.status(404).json({ message: "Staff not found" });
//   }
//   staff.verified = true;
//   await staff.save();
//   res.json({ message: "Scientific staff verified", staff });
// });

// // Delete scientific staff
// router.delete("/:id", protect, requireAdmin, async (req, res) => {
//   const staff = await User.findByPk(req.params.id);
//   if (!staff || staff.role !== "scientific_staff") {
//     return res.status(404).json({ message: "Staff not found" });
//   }
//   await staff.destroy();
//   res.json({ message: "Scientific staff deleted" });
// });

// module.exports = router;
// routes/scientificStaff.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { protect, requireAdmin } = require("../middleware/authMiddleware");

// Get all scientific staff
router.get("/", protect, requireAdmin, async (req, res) => {
  const staff = await User.findAll({ where: { role: "scientific_staff" } });
  res.json(staff);
});

// Verify scientific staff by ID
router.put("/:id/verify", protect, requireAdmin, async (req, res) => {
  const staff = await User.findByPk(req.params.id);
  if (!staff || staff.role !== "scientific_staff") {
    return res.status(404).json({ message: "Staff not found" });
  }
  staff.verified = true;
  await staff.save();
  res.json({ message: "Scientific staff verified", staff });
});

// Delete scientific staff
router.delete("/:id", protect, requireAdmin, async (req, res) => {
  const staff = await User.findByPk(req.params.id);
  if (!staff || staff.role !== "scientific_staff") {
    return res.status(404).json({ message: "Staff not found" });
  }
  await staff.destroy();
  res.json({ message: "Scientific staff deleted" });
});

module.exports = router;
