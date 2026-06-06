# Viridian Institute RP Stuff

A sci-fi themed interactive quiz page with Star Wars-inspired puzzles and a hidden final challenge.

## Project Files

- `index.html` — main quiz interface and question layout.
- `styles.css` — page styling, question panel design, and footer status indicators.
- `script.js` — validation logic for answers, progress tracking, and final question flow.

## Features

- Six themed questions with instant answer validation.
- Progress tracking via a "Layers breached" counter.
- Hidden final question revealed after all six answers are correct.
- Dynamic footer status updates from "ESTABLISHING SECURED LINK" to "PENDING SECURED LINK" and finally "SECURED LINK ESTABLISHED".
- Flexible answer matching for multiple valid text inputs.

## Local Preview

1. Open `index.html` in a browser.
2. Type answers into the input fields.
3. Correct answers reveal the status and unlock the final challenge.

## Notes

- The quiz is fully client-side and does not require a server.
- Editable data-answer values are stored in the HTML `data-answer` attributes.
- The final challenge accepts a secret phrase to complete the experience.

## Recommended Usage

For quick testing, open the project in a local editor or browser preview extension and interact with `index.html` directly.

---

If additional content or more questions are needed, update `index.html` and `script.js` accordingly.
