install Node packege
=====================
npm install

Run Project:
============
"build": "npm run build --prefix client",
"start": "npm run start --prefix server",
"deploy": "npm run build && npm run start"

npm run watch    # development
npm run build    # build frontend only
npm run start    # start backend only
npm run deploy   # build frontend + start backend