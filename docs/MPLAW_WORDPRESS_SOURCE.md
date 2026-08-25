# mplaw.nz WordPress content source

The existing Meridian Partners site is available as a durable, read-only source through the public WordPress REST API.

## Source

- Site: `https://mplaw.nz`
- Dashboard: `https://mplaw.nz/wp-admin/`
- REST API: `https://mplaw.nz/wp-json/wp/v2`
- Local content snapshot: `src/data/mplaw-wordpress.json`

## Refreshing the snapshot

Run:

```bash
npm run sync:wordpress
```

The sync retrieves all published posts, pages, media metadata, categories, and tags. It does not download media binaries, access drafts/private content, or require an administrator password.

Use this source whenever a request refers to the “old site”, “existing site”, “WordPress site”, or current content on `mplaw.nz`. Refresh the snapshot first when current information matters.

## Security boundary

No WordPress administrator password, browser cookie, API key, or application password is stored in this repository. The connection is intentionally read-only. Use the signed-in WordPress dashboard only when the user explicitly requests an administrative change.
