# Jana Travel

A responsive, bilingual (English/Arabic) luxury travel website based on the supplied editorial reference. It uses framework-free ES modules and reusable data-driven page components so it runs without a compilation toolchain.

## Run locally

Python 3 is the only requirement:

```bash
python3 scripts/serve.py
```

Open `http://127.0.0.1:4173`. The local server includes SPA fallback, so shareable paths such as `/destinations/maldives` and `/ar/collection/joali-maldives` work on refresh.

Run the project checks with:

```bash
python3 scripts/check_site.py
```

Create the Cloudflare Worker-compatible deployment output with:

```bash
python3 scripts/build.py
```

## Content and routes

- Editable destination, service and property records: `content.js`
- Components, router, search and enquiry logic: `app.js`
- Visual system and responsive behaviour: `styles.css`
- Official source ledger and image policy: `SOURCES.md`
- Cloudflare Pages-style fallback: `_redirects`

## Owner configuration required before launch

Edit `config.js`:

- `whatsappNumber`: a verified business WhatsApp number in international format, digits only or with `+`. While blank, the floating contact control opens the enquiry form.
- `enquiryEndpoint`: a verified form/API endpoint that accepts JSON. While blank, submission clearly states: “Demo only — your enquiry has not been sent.”
- `contactEmail`, `contactPhone`, `socialLinks`: intentionally blank and not shown until the owner supplies verified details.

Also required:

- Replace or formally approve all photography and retain rights/licence records.
- Have qualified counsel review and complete the Privacy and Terms templates.
- Confirm business identity, booking role, supplier relationships, cancellation wording, data controller details and governing jurisdiction.
- Review current entry, transfer and supplier information for every live proposal.

No passport or payment information is requested by the site.
