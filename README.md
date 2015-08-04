# Internations Users & Groups
Thank you for this opportunity.  I hope you find this project interesting and I look forward to discussing it with you and answering any questions you may have.

I chose Backbone for this project because it's the opposite of a "monolithic" framework yet still provides structure.  The code and file structure is organized according to my presentation on the topic: [9 Tips for a clean backbonejs app](http://slides.com/adamterlson/9-tips-for-a-clean-backbonejs-app#/).

I tried some new things in this project.  I combined Backbone with ES6 which wasn't as straight-forward as I would have liked because of [issues](http://benmccormick.org/2015/07/06/backbone-and-es6-classes-revisited/).  Dragula was also new.

## Quick Start
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
