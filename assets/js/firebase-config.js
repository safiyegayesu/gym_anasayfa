// ══════════════════════════════════════════════════════════════
//  IRONPEAK GYM — Firebase Konfigürasyonu
//  Bu dosyayı projenin assets/js/ klasörüne ekle
// ══════════════════════════════════════════════════════════════
//
//  KURULUM ADIMLARI:
//  1. https://console.firebase.google.com → Yeni proje oluştur
//  2. "Web uygulaması ekle" butonuna tıkla
//  3. Aşağıdaki firebaseConfig nesnesini kendi projenin değerleriyle güncelle
//  4. Firebase Console → Authentication → Sign-in method → Email/Password'ü etkinleştir
//  5. Firebase Console → Firestore Database → Veritabanı oluştur (test modu)
//  6. Firebase Console → Firestore → Rules sekmesine gidip aşağıdaki kuralları yapıştır:
//
//  rules_version = '2';
//  service cloud.firestore {
//    match /databases/{database}/documents {
//      match /contacts/{docId} {
//        allow create: if true;
//        allow read, update, delete: if request.auth != null && request.auth.token.admin == true;
//      }
//      match /users/{userId} {
//        allow read, write: if request.auth != null && request.auth.uid == userId;
//      }
//      match /workouts/{workoutId} {
//        allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
//        allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
//      }
//    }
//  }

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ⚠️  BURAYA KENDİ FIREBASE PROJE BİLGİLERİNİ YAPIŞT
const firebaseConfig = {
  apiKey: "AIzaSyAX-2gIH9XqHfsPPokP4frGjCDE3CtprNA",
  authDomain: "ironpeak-github.firebaseapp.com",
  projectId: "ironpeak-github",
  storageBucket: "ironpeak-github.firebasestorage.app",
  messagingSenderId: "102276797108",
  appId: "1:102276797108:web:5fadf92ad92999d32cbde1",
  measurementId: "G-XC067LFF1K"
};

// Firebase başlat
const app = initializeApp(firebaseConfig);

// Servisleri dışa aktar
export const db  = getFirestore(app);
export const auth = getAuth(app);
export default app;
