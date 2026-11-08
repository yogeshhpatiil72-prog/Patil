PATIL NEO — Firebase-connected starter package

FILES
- index.html, style.css, script.js: original PATIL NEO purple/pink website, updated to read shared movies from Firestore.
- admin.html: Firebase email/password admin login; add and delete titles for all visitors.
- movies.json: original sample catalogue data (reference/backup).
- firestore.rules: secure rules for the movies collection.
- SETUP_MARATHI.txt: simple setup steps.

IMPORTANT
- Firebase web config is included; it is designed to be public in a website.
- Admin access is restricted by the configured Firebase Auth UID.
- This package does not include payment/premium/referral features yet. Those need secure backend/payment setup and should be built as a separate phase.
- Only upload videos you own or have permission to stream. A public webpage URL is not necessarily a playable video URL.

SITE: https://yogeshhpatiil72-prog.github.io/Patilneo.in/
ADMIN: https://yogeshhpatiil72-prog.github.io/Patilneo.in/admin.html


UPDATE: Admin direct video upload is now supported through Firebase Storage. See SETUP_MARATHI.txt and publish storage.rules. Firebase Storage currently requires the Blaze pay-as-you-go plan; charges may apply beyond no-cost quotas.
