# Meridian Partners modern website prototype

A responsive, accessible redesign of [mplaw.nz](https://mplaw.nz), prepared as a separate prototype for review.

## Development

```bash
npm install
npm run dev
npm run build
npm run test:sites
```

## Articles and future automation

Homepage article content lives in `src/data/articles.js`. Each entry uses a stable schema (`title`, `summary`, `category`, `source`, `date`, `isoDate`, `href`), making it a clean integration point for a future CMS, RSS ingestion job, or media-monitoring automation. Replacing that exported array with generated JSON or an API response does not require changing the interface.

## Content notes

- Names, roles, contact information, service links, profile photography, and article links were grounded in the current public Meridian Partners website.
- The consultation CTA currently opens the existing Meridian Partners booking page.
- No form backend or content automation has been added to this review prototype.
