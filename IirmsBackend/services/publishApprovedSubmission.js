const Publication = require('../models/Publication');

/** Creates the single public catalogue record for an approved submission. */
async function publishApprovedSubmission(submission) {
  if (submission.status !== 'approved' || submission.publication_id) return null;

  const publication = await Publication.create({
    title: submission.title,
    department_id: submission.department_id || null,
    research_summary: submission.research_summary || submission.abstract || null,
  });

  if (submission.user_id) {
    await publication.addResearchers([submission.user_id]);
  }

  await submission.update({ publication_id: publication.publication_id });
  return publication;
}

module.exports = publishApprovedSubmission;
