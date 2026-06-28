import { initializeApp, cert, getApps } from "firebase-admin/app";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const serviceAccount = require("./firebase-private-key.json");

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

console.log("✅ Firebase Admin Initialized");