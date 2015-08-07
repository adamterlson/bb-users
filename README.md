# Quick Start
1) `npm install`
2) `npm run database`
3) `npm start`
4) `open index.html`

## Domain Models
Please see `/src/js/app/models` for client-side models and `database.js` for server-side.

## Tests
I'd be happy to discuss unit testing approaches, I have a lot to say on the matter.  I excluded tests from this project in the interest of time; however, you will find that the code is laid out in such a way that unit testing would be straight-forward.  For front-end javascript, that means the code is abstracted well and the UI/DOM does not touch the business logic.

## Assumptions
I've assumed an API that impelements the business logic as well (e.g. validation).  However, in the interest of time, I have merely implemented business logic from a front-end perspective.
