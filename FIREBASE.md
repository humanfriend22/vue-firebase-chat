# Setup Firebase

Most of the Firebase configuration is already done for you so unless extra features are required, running ```firebase init``` is not neccesary.


### 1. Create the Firebase Project
Create a project in the [Firebase Console](https://console.firebase.google.com/) &
add a web app to your project.


### 1. Install the Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Login
Follow the login process
```bash
firebase login
```

### 3. Add the project reference
```bash
firebase use --add
```

### 5. Add Your Configuration
Create `firebase.config.ts` in src/app & export your app config object as the default.
```typescript
export default {
    // Your App Config Here
}
```

### 6. Install Dependencies
NPM:
```bash
npm install
```

Yarn:
```bash
yarn
```

### 6. Build
```bash
yarn build
```

### 7. Deploy
```bash
yarn deploy
```