// ══════════════════════════════════════════════════════════════
//  IRONPEAK GYM — İletişim Formu → Firestore
//  assets/js/firebase-contact.js
// ══════════════════════════════════════════════════════════════

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from "./firebase-config.js";

// İletişim formu gönderimi
// contact.html içindeki mevcut form simülasyonunu bu fonksiyon REPLACE eder
export async function submitContactForm({ name, email, subject, message }) {
  // Basit doğrulama
  if (!name || !email || !message) {
    throw new Error("Ad, e-posta ve mesaj alanları zorunludur.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Geçerli bir e-posta adresi girin.");
  }

  // Firestore'a yaz
  const docRef = await addDoc(collection(db, "contacts"), {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    subject: subject ? subject.trim() : "(Konu belirtilmedi)",
    message: message.trim(),
    createdAt: serverTimestamp(),
    read: false
  });

  return docRef.id;
}
