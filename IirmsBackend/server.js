// const express = require('express');
// const dotenv = require('dotenv');
// dotenv.config();
// const { connectDB, sequelize } = require('./config/db');
// const app = express();

// const verificationRoutes = require("./routes/verification");

// app.use(express.json());
// app.use("/", verificationRoutes);

// // Load all models so Sequelize syncs them
// require('./models/User');
// require('./models/Department');
// require('./models/Profile');
// require('./models/Submission');
// require('./models/Certificate');
// require('./models/Payment');
// require('./models/PaymentSettings');
// require('./models/Message');
// require('./models/Notification');
// require('./models/Project');
// require('./models/FundingGrant');
// require('./models/Publication');
// require('./models/PeerReview');
// require('./models/HeroSlide');
// require('./models/PublicationResearcher');

// // Setup many-to-many relationship
// const User = require('./models/User');
// const Publication = require('./models/Publication');
// const PublicationResearcher = require('./models/PublicationResearcher');

// Publication.belongsToMany(User, { 
//   through: PublicationResearcher, 
//   foreignKey: 'publication_id',
//   otherKey: 'user_id',
//   as: 'researchers' 
// });

// User.belongsToMany(Publication, { 
//   through: PublicationResearcher, 
//   foreignKey: 'user_id',
//   otherKey: 'publication_id',
//   as: 'publications' 
// });

// const app = express();
// app.use(express.json());
// app.use(require('cors')());
// app.use('/uploads', require('express').static(require('path').join(__dirname, 'uploads')));

// // Connect to DB and sync models
// const start = async () => {
// 	await connectDB();
// 	try {
// 		await sequelize.sync({ alter: true });
// 		console.log('Database synced');

// 		// Seed departments if empty
// 		const Department = require('./models/Department');
// 		const count = await Department.count();
// 		if (count === 0) {
// 			await Department.bulkCreate([
// 				{ department_id: 1, faculties: 'Civil Engineering and Environment', depertment: 'Engineering', speciality: '0' },
// 				{ department_id: 2, faculties: 'Computer Science, AI & Digital Tech', depertment: 'Technology', speciality: '0' },
// 				{ department_id: 3, faculties: 'Economics and Management Sciences', depertment: 'Business', speciality: '0' },
// 				{ department_id: 4, faculties: 'Health and Biomedical Sciences', depertment: 'Health', speciality: '0' },
// 				{ department_id: 5, faculties: 'Law and Governance', depertment: 'Law', speciality: '0' },
// 				{ department_id: 6, faculties: 'Agriculture and Rural Development', depertment: 'Agriculture', speciality: '0' },
// 				{ department_id: 7, faculties: 'Energy and Sustainable Development', depertment: 'Energy', speciality: '0' },
// 			]);
// 			console.log('Departments seeded');
// 		}
// 	} catch (err) {
// 		console.error('Error syncing database:', err);
// 	}
// // // server.js or app.js
// // const express = require("express");
// // const app = express();

// // const verificationRoutes = require("./routes/verification");

// // app.use(express.json());

// // // Mount dynamic verification routes
// // app.use("/", verificationRoutes);

// // app.listen(3000, () => console.log("Server running on port 3000"));

// 	// Routes
// 	app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/profiles', require('./routes/profileRoutes'));
// app.use('/api/submissions', require('./routes/submissionRoutes'));
// app.use('/api/certificates', require('./routes/certificateRoutes'));
// app.use('/api/payments', require('./routes/paymentRoutes'));
// app.use('/api/payment-settings', require('./routes/paymentSettingsRoutes'));
// app.use('/api/paypal', require('./routes/paypalRoutes'));
// app.use('/api/chat', require('./routes/chatRoutes'));
// app.use('/api/hero', require('./routes/heroRoutes'));
// app.use('/api/publications', require('./routes/publicationRoutes'));
// 	app.use('/api/admin', require('./routes/adminRoutes'));
// 	app.use('/api/faculty', require('./routes/facultyRoutes'));
// 	app.use('/api/routes/verification', require('./routes/verification'));

// app.get('/', (req, res) => res.send('Backend API running'));

// 	const PORT = process.env.PORT || 5000;
// 	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// };

// start();

// module.exports = app;
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const { connectDB, sequelize } = require('./config/db');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use(cors());
const { languageFromHeader, translateMessage } = require('./utils/i18n');
app.use((req, res, next) => {
  const language = languageFromHeader(req.headers['accept-language']);
  const sendJson = res.json.bind(res);
  res.json = (body) => {
    if (body && typeof body === 'object' && typeof body.message === 'string') {
      return sendJson({ ...body, message: translateMessage(body.message, language) });
    }
    return sendJson(body);
  };
  next();
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Load all models so Sequelize syncs them
require('./models/User');
require('./models/Department');
require('./models/Profile');
require('./models/Submission');
require('./models/Certificate');
require('./models/Payment');
require('./models/PaymentSettings');
require('./models/Message');
require('./models/Notification');
require('./models/Project');
require('./models/FundingGrant');
require('./models/Publication');
require('./models/PeerReview');
require('./models/ReviewerApplication');
require('./models/HeroSlide');
require('./models/PublicationResearcher');
require('./models/EventNews');
const LeadershipApplication = require('./models/LeadershipApplication');

// Setup many-to-many relationship
const User = require('./models/User');
const Publication = require('./models/Publication');
const PublicationResearcher = require('./models/PublicationResearcher');

Publication.belongsToMany(User, { 
  through: PublicationResearcher, 
  foreignKey: 'publication_id',
  otherKey: 'user_id',
  as: 'researchers' 
});

User.belongsToMany(Publication, { 
  through: PublicationResearcher, 
  foreignKey: 'user_id',
  otherKey: 'publication_id',
  as: 'publications' 
});

LeadershipApplication.belongsTo(User, { foreignKey: 'user_id', as: 'applicant' });
LeadershipApplication.belongsTo(require('./models/Department'), { foreignKey: 'department_id', as: 'department' });

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/leadership', require('./routes/leadershipRoutes'));
app.use('/api/profiles', require('./routes/profileRoutes'));
app.use('/api/submissions', require('./routes/submissionRoutes'));
app.use('/api/certificates', require('./routes/certificateRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/payment-settings', require('./routes/paymentSettingsRoutes'));
app.use('/api/paypal', require('./routes/paypalRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));
app.use('/api/hero', require('./routes/heroRoutes'));
app.use('/api/publications', require('./routes/publicationRoutes'));
app.use('/api/events', require('./routes/eventNewsRoutes'));
app.use('/api/reviewer', require('./routes/reviewerRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/faculty', require('./routes/facultyRoutes'));
app.use("/api/scientificStaff", require("./routes/scientificStaff"));

// ✅ Mount verification routes correctly
app.use('/api/verification', require('./routes/verification'));

app.get('/', (req, res) => res.send('Backend API running'));

const start = async () => {
  try {
    await connectDB();
    await sequelize.sync({ alter: false, force: false });
    const profileDocumentColumns = [
      'ADD COLUMN `resume_path` VARCHAR(255) NULL',
      'ADD COLUMN `qualification_proof_path` VARCHAR(255) NULL',
      'ADD COLUMN `identity_proof_path` VARCHAR(255) NULL',
    ];
    for (const column of profileDocumentColumns) {
      await sequelize.query(`ALTER TABLE \`StudentProfiles\` ${column}`).catch((err) => {
        const code = err.original?.code || err.parent?.code;
        if (code !== 'ER_DUP_FIELDNAME') throw err;
      });
    }
    const leadershipUserColumns = [
      'ADD COLUMN `is_leader` TINYINT(1) NOT NULL DEFAULT 0',
      'ADD COLUMN `leadership_role` VARCHAR(150) NULL',
    ];
    for (const column of leadershipUserColumns) {
      await sequelize.query(`ALTER TABLE \`Users\` ${column}`).catch((err) => {
        const code = err.original?.code || err.parent?.code;
        if (code !== 'ER_DUP_FIELDNAME') throw err;
      });
    }
    // Preserve access for accounts that existed before approval was introduced.
    // New public registrations explicitly use the model's `pending` value.
    const userApprovalColumns = [
      "ADD COLUMN `approval_status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'approved'",
      'ADD COLUMN `approved_by` INT NULL',
      'ADD COLUMN `approved_at` DATETIME NULL',
    ];
    for (const column of userApprovalColumns) {
      await sequelize.query(`ALTER TABLE \`Users\` ${column}`).catch((err) => {
        const code = err.original?.code || err.parent?.code;
        if (code !== 'ER_DUP_FIELDNAME') throw err;
      });
    }
    const passwordResetColumns = [
      'ADD COLUMN `password_reset_token_hash` CHAR(64) NULL',
      'ADD COLUMN `password_reset_expires_at` DATETIME NULL',
    ];
    for (const column of passwordResetColumns) {
      await sequelize.query(`ALTER TABLE \`Users\` ${column}`).catch((err) => {
        const code = err.original?.code || err.parent?.code;
        if (code !== 'ER_DUP_FIELDNAME') throw err;
      });
    }
    const publicationMetadataColumns = [
      'ADD COLUMN `journal_title` VARCHAR(255) NULL',
      'ADD COLUMN `volume` VARCHAR(50) NULL',
      'ADD COLUMN `issue` VARCHAR(50) NULL',
      'ADD COLUMN `publication_year` INT NULL',
      'ADD COLUMN `first_page` VARCHAR(50) NULL',
      'ADD COLUMN `last_page` VARCHAR(50) NULL',
      'ADD COLUMN `issn` VARCHAR(32) NULL',
      'ADD COLUMN `publication_date` DATE NULL',
    ];
    for (const column of publicationMetadataColumns) {
      await sequelize.query(`ALTER TABLE \`Publications\` ${column}`).catch((err) => {
        const code = err.original?.code || err.parent?.code;
        if (code !== 'ER_DUP_FIELDNAME') throw err;
      });
    }
    await sequelize.query('ALTER TABLE `Reviewer_Applications` ADD COLUMN `password_hash` VARCHAR(255) NULL')
      .catch((err) => {
        const code = err.original?.code || err.parent?.code;
        if (code !== 'ER_DUP_FIELDNAME') throw err;
      });
    const peerReviewColumns = [
      'ADD COLUMN `decision` ENUM(\'accepted\', \'minor_revisions\', \'major_revisions\', \'rejected\') NULL',
      'ADD COLUMN `comments` TEXT NULL',
      'ADD COLUMN `reviewed_at` DATETIME NULL',
      'ADD COLUMN `reviewer_application_id` INT NULL',
    ];
    for (const column of peerReviewColumns) {
      await sequelize.query(`ALTER TABLE \`peer_reviews\` ${column}`).catch((err) => {
        const code = err.original?.code || err.parent?.code;
        if (code !== 'ER_DUP_FIELDNAME') throw err;
      });
    }
    console.log('Database synced');

    // A new installation needs one trusted administrator. This is intentionally
    // environment-only: public registration can never create an admin account.
    const adminCount = await User.count({ where: { role: 'admin' } });
    if (adminCount === 0 && process.env.INITIAL_ADMIN_EMAIL && process.env.INITIAL_ADMIN_PASSWORD) {
      const password_hash = await bcrypt.hash(process.env.INITIAL_ADMIN_PASSWORD, 10);
      const admin = await User.create({
        name: process.env.INITIAL_ADMIN_NAME || 'System Administrator',
        email: process.env.INITIAL_ADMIN_EMAIL.trim().toLowerCase(),
        password_hash,
        role: 'admin',
        approval_status: 'approved',
        approved_at: new Date(),
      });
      const Profile = require('./models/Profile');
      await Profile.create({ user_id: admin.user_id });
      console.log('Initial administrator created');
    }

    // Seed departments if empty
    const Department = require('./models/Department');
    const count = await Department.count();
    if (count === 0) {
      await Department.bulkCreate([
        { department_id: 1, faculties: 'Civil Engineering and Environment', depertment: 'Engineering', speciality: '0' },
        { department_id: 2, faculties: 'Computer Science, AI & Digital Tech', depertment: 'Technology', speciality: '0' },
        { department_id: 3, faculties: 'Economics and Management Sciences', depertment: 'Business', speciality: '0' },
        { department_id: 4, faculties: 'Health and Biomedical Sciences', depertment: 'Health', speciality: '0' },
        { department_id: 5, faculties: 'Law and Governance', depertment: 'Law', speciality: '0' },
        { department_id: 6, faculties: 'Agriculture and Rural Development', depertment: 'Agriculture', speciality: '0' },
        { department_id: 7, faculties: 'Energy and Sustainable Development', depertment: 'Energy', speciality: '0' },
      ]);
      console.log('Departments seeded');
    }
  } catch (err) {
    console.error('Error syncing database:', err);
    process.exit(1);
  }

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();

module.exports = app;
