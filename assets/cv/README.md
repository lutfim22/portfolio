# CV headshot asset

Put one approved professional photo here, named **headshot.png**, **headshot.jpg**,
or **headshot.jpeg**. Keep only one matching file. No photo is needed now.

From the repository root, run:

```sh
pnpm cv:refresh
```

This generates both PDFs, validates them, and rebuilds the site. With a photo,
the final Premium PDF and its download link are enabled automatically. Without
a photo, Premium stays a marked review draft and its public download is absent.
Removing the photo and running the command removes the old generated Premium
PDF/link. ATS always remains photo-free.

Use only a photo you own or are permitted to publish. Adding it here for final
CV generation means approving its use in the public Premium CV. This repository
is public: commit the photo together with regenerated PDFs and readiness JSON
when ready for PR review. Generation does not merge or deploy anything.
