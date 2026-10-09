# BKW V2 — image audit and provenance

All site photographs come from the public BKW website, under the owner's reuse permission. No stock photography or generated employees/projects are used. Exact original URLs, dimensions and crop boxes are recorded in `source-assets/manifest.json` and `optimized-manifest.json`. The reproducible optimizer is `scripts/prepare-images.py` (Pillow required only to regenerate images, not to build the website).

## Decisions

- **V1 Hornbach/team panorama:** sharp but dominant third-party signage, already darkened and poorly suited to a portrait mobile hero. Removed from the hero.
- **V2 craft hero:** newly selected 2180 × 1266 BKW photograph. Crop removes the baked green diagonal; shows real workmanship rather than third-party branding. Largest retained crop: 1570 × 1266. No artificial upscaling.
- **Maintenance:** source-resolution doorway conversation; crop removes the baked dark diagonal and retains the people and work context.
- **Locks:** real BKW locksmiths at a door. Crop removes the diagonal, avoids fictional security guarantees.
- **Insulation:** real spouwmuur work; source crop retains the tool, wall and operator. No generated insulation diagram or imaginary result.
- **Business building:** authentic image from BKW's own site, described as a building pictured there, not proof of ownership or a client relationship.
- **Workshop:** newly selected 2180 × 1266 BKW workshop photo supports the maintenance story; original brand remains visible. Right baked diagonal cropped out.
- **Team/workshop exterior:** new, unedited 1600 × 1200 public photograph provides organizational context on the business page.
- **Tool detail:** real BKW equipment used as a supporting contact-page image, not as an unrelated hero.

## Processing and delivery

Only crop, modest brightness normalization (×1.035, ×1.22 for the underexposed building image), Lanczos downsampling and WebP encoding (quality 88). Newly selected fleet/workshop image replaces the repeated building in the homepage business section. Hero captions sit below the image, preserving the working context. No generated reconstruction, invented personnel, retouching of project facts or embedded new text. Fixed intrinsic dimensions and CSS aspect ratios reserve layout space. `srcset` variants up to the original retained width; `sizes` reflects service-card and hero contexts. Hero eager/high priority; below-fold photography lazy. All assets are hosted with the preview; no hotlinking or external image API.

Self-hosted Manrope variable Latin WOFF2, Google Fonts source, SIL Open Font License included alongside the font. No Google Fonts runtime requests.

## Limits for a future production handoff

Current photography is genuine and relevant but finite. Some source shots have tightly framed faces/tools and pre-existing editorial treatment. A fresh BKW photoshoot with portrait-safe compositions would give greater creative freedom. No unconfirmed reference projects, testimonials, customer logos, response-time or certification claims were added to compensate.
