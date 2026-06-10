// ══════════════════════════════════════════════════════════════
//  IRONPEAK GYM — Firebase Authentication
//  assets/js/firebase-auth.js
// ══════════════════════════════════════════════════════════════

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { auth, db } from "./firebase-config.js";

// ── Kayıt ──────────────────────────────────────────────────
export async function registerUser(name, email, password) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Kullanıcı adını Firebase Auth profiline yaz
  await updateProfile(user, { displayName: name });

  // Firestore'da kullanıcı belgesi oluştur
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    displayName: name,
    email: email,
    createdAt: serverTimestamp(),
    role: "member"
  });

  return user;
}

// ── Giriş ──────────────────────────────────────────────────
export async function loginUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

// ── Çıkış ──────────────────────────────────────────────────
export async function logoutUser() {
  await signOut(auth);
}

// ── Oturum Durumu Dinle ─────────────────────────────────────
// callback(user) → user null ise oturum yok, user varsa giriş yapılmış
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}
