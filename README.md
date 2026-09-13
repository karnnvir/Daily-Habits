# Habits

A gamified personal habit tracker: three life pillars (Growth, Career,
Wellbeing), each broken into sub-categories you log against with a
self-chosen effort level (Quick / Steady / Deep). Points feed a per-pillar
level and XP bar, with a streak bonus for consistency.

Built as a React + Vite PWA on Firebase (Auth + Firestore + Hosting).

## Stack

- React 19 + TypeScript + Vite, installable as a PWA (`vite-plugin-pwa`)
- Firebase Authentication (email/password) and Firestore for data
- Firebase Hosting for deployment

The seed data in [`src/lib/seedData.ts`](src/lib/seedData.ts) is a small,
generic starter sample, not anyone's real data - it only ever runs once,
against an empty database. Add your own sub-categories from the Manage
Habits screen once it's running.

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Create your own Firebase project** at [console.firebase.google.com](https://console.firebase.google.com),
   then link this repo to it:

   ```bash
   npx firebase login
   npx firebase use --add
   ```

3. **Enable Email/Password sign-in** — in the Firebase console, under
   Authentication → Sign-in method → enable "Email/Password".

4. **Create your account** — Authentication → Users → Add user. This app
   has no self-service sign-up screen; you create the one account by hand.

5. **Lock down Firestore rules to your email** — edit
   [`firestore.rules`](firestore.rules) and replace the email address with
   your own, then deploy it:

   ```bash
   npx firebase deploy --only firestore:rules
   ```

6. **Register a Web app and get its config** (if you don't already have one):

   ```bash
   npx firebase apps:create WEB "Habits Web"
   npx firebase apps:sdkconfig WEB <the App ID it prints>
   ```

   Copy `.env.example` to `.env` and fill in the values from that config.

7. **Run it locally**

   ```bash
   npm run dev
   ```

8. **Deploy**

   ```bash
   npm run build
   npx firebase deploy --only hosting
   ```

## Notes

- There's no push-notification setup yet (that needs Firebase's paid Blaze
  plan for Cloud Functions) — this is Hosting + Firestore only, which stays
  on the free Spark plan.
- `ui-mockup/` holds the original design-canvas mockups this app was built
  from — not part of the running app.
