# vue-firebase-chat

[VueJS]: https://vuejs.org/
[Firebase]: https://firebase.google.com/
[Fireship]: https://fireship.io/
[React Firebase Chat]: https://youtu.be/zQyrwxMPm88/
[Firebase Setup Guide]: FIREBASE.md

[Production Build]: https://vue-firebase-chat-b32b6.web.app/

A simple chat app built with [VueJS] and [Firebase] inspired by [Fireship]'s [React Firebase Chat]().

You can check out the application right here: [Production Build]

## Usage

### 1. Setup Firebase
Follow this guide: [Firebase Setup Guide]

### 2. Build
This will build both Vue and Firebase Functions! You may want to use `npm run build:web` or `yarn build:web` to just build the Vue.

For `npm`:
```bash
npm run build
```

Or `yarn`:
```bash
yarn build
```

### 3. Deploy
This will deploy your Firestore rules, Firebase Functions and whatever is in the `dist` directory. Make sure to run the `build` script to not re-deploy outdated website files and Firebase Functions

For `npm`:
```bash
npm run deploy
```

Or `yarn`:
```bash
yarn deploy
```
