# Content, Localization, and Public-Safety Guidelines

Status: Mandatory policy for the public repository and published website.

## Source of Truth
Use `PROFESSIONAL_PROFILE.md` for approved professional facts and wording. Changes to roles, dates, responsibilities, project scope, or claims require owner review. Do not silently embellish content.

## Public-Safe Only
- The GitHub repository is intended to be public from its first commit.
- Never commit Samsung confidential information, proprietary platform names, private architecture diagrams, internal APIs, unpublished screenshots, private repositories, internal documents, customer data, secrets, tokens, or access credentials.
- Describe cross-platform JavaScript/native integration generically; do not disclose internal integration-layer product names.
- Do not invent metrics, customer counts, business outcomes, team sizes, awards, certification names, or dates.
- Exclude unverified achievements entirely from the public repository until confirmed. Keep verification notes outside the public repo, not merely in a hidden or ignored folder that could accidentally be committed.
- Use custom diagrams, abstract illustrations, and licensed assets rather than screenshots of internal Samsung products.
- Before publication, review both visible content and Git history for accidental sensitive material. If sensitive data is committed, stop publication and remediate history and credentials as applicable.

## Tone and Editorial Style
- Professional, precise, confident without exaggeration.
- Prefer concrete contributions over generic buzzwords.
- Distinguish Tech Lead responsibilities on selected projects from the formal employer job title.
- Prefer qualitative, evidenced impact when numeric metrics are unavailable.
- Use concise headings, scannable paragraphs, and meaningful CTAs.

## Localization
- English default; Indonesian as a full alternative.
- Maintain equivalent content across locales and preserve semantic meaning rather than literal word-for-word translation.
- Locale paths: `/en/...` and `/id/...`; retain current page when switching language where translated content exists.
- Use appropriate date, punctuation, and typography conventions; do not mix languages accidentally in UI controls.
- Validate long text, screen-reader language metadata, and translated metadata.

## Project Content Template
Each project should include: title, approved one-sentence context, role and responsibilities, Problem, Approach, Impact, technology stack, and safe visual treatment. Avoid proprietary code, exact internal system diagrams, or claims not supported by user-provided evidence.

## Assets and Photography
- Owner-supplied smart-casual About photo and professional headshot for Premium CV; no photo in ATS CV.
- Confirm permission for every photograph, illustration, icon, and logo.
- Optimize image sizes, provide useful alt text, and avoid decorative images that add no value.

## Content Review Checklist
- [ ] Every factual claim matches approved source material.
- [ ] No confidential or internal identifiers or screenshots.
- [ ] No unverified awards, certification details, or invented metrics.
- [ ] English and Indonesian versions agree in meaning.
- [ ] Links, metadata, accessibility labels, and image licenses are checked.
- [ ] Owner approves public release and any new claims.
