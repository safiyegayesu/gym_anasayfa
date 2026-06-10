// ══════════════════════════════════════════════════════════════
//  IRONPEAK GYM — Antrenman Takibi (Firestore CRUD)
//  assets/js/firebase-workouts.js
// ══════════════════════════════════════════════════════════════

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db, auth } from "./firebase-config.js";

// Antrenman seansı ekle
// workoutData: { exerciseName, muscleGroup, sets, reps, weight, notes }
export async function addWorkout(workoutData) {
  const user = auth.currentUser;
  if (!user) throw new Error("Antrenman kaydetmek için giriş yapmalısınız.");

  const docRef = await addDoc(collection(db, "workouts"), {
    ...workoutData,
    userId: user.uid,
    createdAt: serverTimestamp()
  });

  return docRef.id;
}

// Kullanıcının tüm antrenmanlarını getir (tarihe göre sıralı)
export async function getMyWorkouts() {
  const user = auth.currentUser;
  if (!user) throw new Error("Antrenmanları görmek için giriş yapmalısınız.");

  const q = query(
    collection(db, "workouts"),
    where("userId", "==", user.uid),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

// Antrenman güncelle
export async function updateWorkout(workoutId, updatedData) {
  const workoutRef = doc(db, "workouts", workoutId);
  await updateDoc(workoutRef, {
    ...updatedData,
    updatedAt: serverTimestamp()
  });
}

// Antrenman sil
export async function deleteWorkout(workoutId) {
  await deleteDoc(doc(db, "workouts", workoutId));
}
