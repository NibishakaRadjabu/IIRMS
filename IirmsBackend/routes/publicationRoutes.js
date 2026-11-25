const express = require('express');
const router = express.Router();
const Publication = require('../models/Publication');
const User = require('../models/User');
const Department = require('../models/Department');
const Submission = require('../models/Submission');
const { protect } = require('../middleware/authMiddleware');

const publicPublicationInclude = [
  {
    model: User,
    as: 'researchers',
    through: { attributes: [] },
    attributes: ['user_id', 'name', 'email', 'role'],
  },
  {
    model: Department,
    as: 'department',
    attributes: ['department_id', 'faculties', 'depertment'],
  },
  {
    model: Submission,
    as: 'submission',
    attributes: ['abstract', 'research_summary', 'file_path', 'submitted_at'],
    include: [{ model: User, as: 'user', attributes: ['user_id', 'name'] }],
  },
];

const escapeHtml = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const articleMetadata = (publication, canonicalUrl, pdfUrl) => {
  const linkedAuthors = (publication.researchers || []).map((researcher) => researcher.name).filter(Boolean);
  const authors = linkedAuthors.length
    ? linkedAuthors
    : [publication.submission?.user?.name].filter(Boolean);
  const abstract = publication.research_summary
    || publication.submission?.abstract
    || publication.submission?.research_summary
    || '';
  const publicationDate = publication.publication_date
    || publication.created_at
    || publication.submission?.submitted_at;
  const parsedDate = publicationDate ? new Date(publicationDate) : null;
  const citationDate = parsedDate && !Number.isNaN(parsedDate.getTime())
    ? parsedDate.toISOString().slice(0, 10).replace(/-/g, '/')
    : '';
  const firstPage = publication.first_page || '';
  const lastPage = publication.last_page || '';
  const values = [
    ['citation_title', publication.title],
    ...authors.map((author) => ['citation_author', author]),
    ['citation_publication_date', citationDate],
    ['citation_journal_title', publication.journal_title],
    ['citation_issn', publication.issn],
    ['citation_volume', publication.volume],
    ['citation_issue', publication.issue],
    ['citation_firstpage', firstPage],
    ['citation_lastpage', lastPage],
    ['citation_doi', publication.doi],
    ['citation_pdf_url', pdfUrl],
    ['citation_abstract', abstract],
  ].filter(([, value]) => value);
  const metaTags = values
    .map(([name, content]) => `<meta name="${escapeHtml(name)}" content="${escapeHtml(content)}">`)
    .join('\n    ');
  const structuredData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: publication.title,
    author: authors.map((name) => ({ '@type': 'Person', name })),
    datePublished: publicationDate || undefined,
    isPartOf: publication.journal_title
      ? { '@type': 'Periodical', name: publication.journal_title, issn: publication.issn || undefined }
      : undefined,
    volumeNumber: publication.volume || undefined,
    issueNumber: publication.issue || undefined,
    pageStart: firstPage || undefined,
    pageEnd: lastPage || undefined,
    identifier: publication.doi || undefined,
    abstract: abstract || undefined,
    url: canonicalUrl,
    encoding: pdfUrl ? { '@type': 'MediaObject', contentUrl: pdfUrl, encodingFormat: 'application/pdf' } : undefined,
  }).replace(/</g, '\\u003c');
  return {
    authors,
    abstract,
    publicationDate: parsedDate && !Number.isNaN(parsedDate.getTime())
      ? parsedDate.toISOString().slice(0, 10)
      : '',
    metaTags,
    structuredData,
  };
};

const publicationFields = [
  'title',
  'doi',
  'department_id',
  'research_summary',
  'document',
  'journal_title',
  'volume',
  'issue',
  'publication_year',
  'first_page',
  'last_page',
  'issn',
  'publication_date',
];

// Get all publications with researchers (PUBLIC - no auth required)
router.get('/public', async (req, res) => {
  try {
    const publications = await Publication.findAll({
      include: publicPublicationInclude,
      order: [['created_at', 'DESC']]
    });
    res.json(publications.map((publication) => ({
      ...publication.toJSON(),
      article_url: `/api/publications/public/${publication.publication_id}/article`,
    })));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all publications (PROTECTED)
router.get('/', protect, async (req, res) => {
  try {
    const publications = await Publication.findAll({
      include: [
        { 
          model: User, 
          as: 'researchers',
          through: { attributes: [] },
          attributes: ['user_id', 'name', 'email', 'role'] 
        },
        { 
          model: Department, 
          as: 'department',
          attributes: ['department_id', 'faculties', 'depertment'] 
        }
      ]
    });
    res.json(publications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Server-render each article so citation metadata is present in the initial HTML.
router.get('/public/:id/article', async (req, res) => {
  try {
    const publication = await Publication.findByPk(req.params.id, { include: publicPublicationInclude });
    if (!publication) return res.status(404).send('Article not found.');

    const record = publication.toJSON();
    const baseUrl = process.env.PUBLIC_API_URL || `${req.protocol}://${req.get('host')}`;
    const canonicalUrl = `${baseUrl.replace(/\/$/, '')}/api/publications/public/${publication.publication_id}/article`;
    const frontendUrl = process.env.FRONTEND_URL || baseUrl;
    const rawDocument = publication.document || record.submission?.file_path;
    const pdfUrl = rawDocument
      ? (/^https?:\/\//i.test(rawDocument)
        ? rawDocument
        : `${baseUrl.replace(/\/$/, '')}${rawDocument.startsWith('/') ? '' : '/'}${rawDocument}`)
      : '';
    const metadata = articleMetadata(record, canonicalUrl, pdfUrl);
    const dateText = metadata.publicationDate
      ? new Date(metadata.publicationDate).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' })
      : '';
    const pageRange = [record.first_page, record.last_page].filter(Boolean).join('–');
    const issueDetails = [
      record.journal_title,
      record.volume ? `Volume ${record.volume}` : '',
      record.issue ? `Issue ${record.issue}` : '',
      record.publication_year || '',
      pageRange ? `Pages ${pageRange}` : '',
    ].filter(Boolean).join(' · ');
    const researchersHtml = metadata.authors.length
      ? `<ul>${metadata.authors.map((author) => `<li>${escapeHtml(author)}</li>`).join('')}</ul>`
      : '<p>Author information has not been added.</p>';
    const pdfHtml = pdfUrl
      ? `<section><h2>Article PDF</h2><p><a href="${escapeHtml(pdfUrl)}" type="application/pdf">Open or download the searchable PDF</a></p><iframe title="Article PDF preview" src="${escapeHtml(pdfUrl)}"></iframe></section>`
      : '<p class="notice">The article PDF has not been uploaded yet.</p>';

    return res.type('html').send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(record.title)} | ${escapeHtml(record.journal_title || 'Research Portal')}</title>
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}">
    ${metadata.metaTags}
    <script type="application/ld+json">${metadata.structuredData}</script>
    <style>
      body{font:16px/1.6 system-ui,sans-serif;color:#1f2937;margin:0;background:#f8fafc}
      main{max-width:900px;margin:3rem auto;padding:2rem;background:white;border-radius:1rem;box-shadow:0 8px 24px #0f172a12}
      h1{line-height:1.2;color:#0f172a}.metadata{color:#475569}.abstract{white-space:pre-line}
      iframe{width:100%;height:70vh;border:1px solid #cbd5e1;border-radius:.5rem}
      a{color:#1d4ed8}.notice{padding:1rem;background:#fff7ed;color:#9a3412}
    </style>
  </head>
  <body>
    <main>
      <p><a href="${escapeHtml(`${frontendUrl.replace(/\/$/, '')}/research`)}">Browse publications</a></p>
      <article>
        <h1>${escapeHtml(record.title)}</h1>
        <section aria-labelledby="authors-heading"><h2 id="authors-heading">Author(s)</h2>${researchersHtml}</section>
        ${issueDetails ? `<p class="metadata">${escapeHtml(issueDetails)}</p>` : ''}
        ${record.issn ? `<p class="metadata"><strong>ISSN:</strong> ${escapeHtml(record.issn)}</p>` : ''}
        ${dateText ? `<p class="metadata"><strong>Publication date:</strong> ${escapeHtml(dateText)}</p>` : ''}
        ${record.doi ? `<p class="metadata"><strong>DOI:</strong> <a href="https://doi.org/${encodeURIComponent(record.doi).replace(/%2F/gi, '/')}">${escapeHtml(record.doi)}</a></p>` : ''}
        ${metadata.abstract ? `<section><h2>Abstract</h2><p class="abstract">${escapeHtml(metadata.abstract)}</p></section>` : ''}
        ${pdfHtml}
      </article>
    </main>
  </body>
</html>`);
  } catch (err) {
    console.error('Public article page failed to load:', err);
    res.status(500).send('Could not load this article.');
  }
});

// Get single publication (PUBLIC)
router.get('/public/:id', async (req, res) => {
  try {
    const publication = await Publication.findByPk(req.params.id, {
      include: publicPublicationInclude,
    });
    if (!publication) return res.status(404).json({ message: 'Publication not found' });
    res.json(publication);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create publication (PROTECTED)
router.post('/', protect, async (req, res) => {
  try {
    const { researchers } = req.body;
    const values = Object.fromEntries(publicationFields
      .filter((field) => req.body[field] !== undefined)
      .map((field) => [field, req.body[field]]));
    const publication = await Publication.create(values);
    
    if (researchers && Array.isArray(researchers)) {
      await publication.addResearchers(researchers);
    }
    
    const full = await Publication.findByPk(publication.publication_id, {
      include: [{ model: User, as: 'researchers', through: { attributes: [] } }]
    });
    
    res.status(201).json(full);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update publication (PROTECTED)
router.put('/:id', protect, async (req, res) => {
  try {
    const { researchers } = req.body;
    const publication = await Publication.findByPk(req.params.id);
    
    if (!publication) return res.status(404).json({ message: 'Publication not found' });
    
    const values = Object.fromEntries(publicationFields
      .filter((field) => req.body[field] !== undefined)
      .map((field) => [field, req.body[field]]));
    await publication.update(values);
    
    if (researchers && Array.isArray(researchers)) {
      await publication.setResearchers(researchers);
    }
    
    const full = await Publication.findByPk(publication.publication_id, {
      include: [{ model: User, as: 'researchers', through: { attributes: [] } }]
    });
    
    res.json(full);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete publication (PROTECTED)
router.delete('/:id', protect, async (req, res) => {
  try {
    const publication = await Publication.findByPk(req.params.id);
    if (!publication) return res.status(404).json({ message: 'Publication not found' });
    
    await publication.destroy();
    res.json({ message: 'Publication deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
