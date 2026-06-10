# IRONPEAK GYM — Hareket & Kas Rehberi

> Bilimsel antrenman prensipleriyle güçlen. Doğru teknik, doğru kas, doğru sonuç.

🔗 **Canlı Demo:** [safiyegayesu.github.io/gym_anasayfa](https://safiyegayesu.github.io/gym_anasayfa/)

---

## 📁 Proje Yapısı

```
ironpeak-gym/
├── index.html                    ← Anasayfa (Hero, Hareketler, Program, CTA)
├── magaza.html                   ← Supplement mağazası
├── supplements.json              ← Ürün verileri
├── favicon.png
├── pages/
│   ├── about.html                ← Hakkımızda sayfası
│   ├── contact.html              ← İletişim formu (Firebase Firestore)
│   └── uye.html                  ← Üye girişi & antrenman takip paneli
├── assets/
│   ├── css/
│   │   └── style.css             ← Tüm stiller (CSS Variables + Responsive)
│   └── js/
│       ├── java.js               ← Hamburger menü, filtreler, modal, animasyonlar
│       ├── firebase-config.js    ← Firebase bağlantı konfigürasyonu
│       ├── firebase-auth.js      ← Kullanıcı kayıt / giriş / çıkış
│       ├── firebase-contact.js   ← İletişim formu → Firestore
│       └── firebase-workouts.js  ← Antrenman CRUD → Firestore
└── README.md
```

---

## 🏋️ Özellikler

### Anasayfa (`index.html`)

- **Hero bölümü** — Büyük tipografi, istatistikler, CTA butonları
- **Hareket Rehberi** — 12 hareket kartı, kas grubu filtreleme
- **İnteraktif Modal** — Karta tıklayınca detaylı teknik adımlar açılır
- **Vücut Haritası SVG** — Filtreyle birlikte kas grubu görselleştirilir
- **Antrenman İpuçları** — 6 bilimsel tavsiye kartı
- **PPL Split Programı** — 7 günlük push-pull-legs planı

### Mağaza (`magaza.html`)

- Supplement ürün listesi `supplements.json` dosyasından dinamik olarak yüklenir
- Kategori filtresi, ürün kartları, sepete ekleme arayüzü

### Üye Paneli (`pages/uye.html`) 🔥 Firebase

- Email/şifre ile **kayıt & giriş** (Firebase Authentication)
- Giriş sonrası kişisel **antrenman kaydetme** formu
- Kaydedilen antrenmanların **geçmiş listesi** (Firestore)
- Antrenman **silme** işlemi
- Oturum durumu otomatik algılanır; sayfa yenilenince giriş korunur

### İletişim Formu (`pages/contact.html`) 🔥 Firebase

- Form verileri simülasyon yerine gerçek olarak **Firestore'a kaydedilir**
- Yükleniyor durumu, başarı/hata mesajları ile tam geri bildirim

---

## 🔥 Firebase Entegrasyonu

Proje üç Firebase servisi kullanır:

| Servis | Kullanım Amacı |
|---|---|
| **Firebase Authentication** | Üye kayıt, giriş, çıkış (Email/Password) |
| **Cloud Firestore** | İletişim mesajları + antrenman verileri |

### Firestore Koleksiyon Yapısı

```
firestore/
├── contacts/
│   └── {autoId}/
│       ├── name, email, subject, message
│       ├── createdAt   : timestamp
│       └── read        : boolean
│
├── users/
│   └── {uid}/
│       ├── uid, displayName, email
│       ├── createdAt   : timestamp
│       └── role        : "member"
│
└── workouts/
    └── {autoId}/
        ├── userId      : string  (sahibin UID'si)
        ├── exerciseName, muscleGroup
        ├── sets, reps, weight
        ├── notes
        └── createdAt   : timestamp
```

### Güvenlik Kuralları (Firestore Rules)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contacts/{docId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null
        && request.auth.token.admin == true;
    }
    match /users/{userId} {
      allow read, write: if request.auth != null
        && request.auth.uid == userId;
    }
    match /workouts/{workoutId} {
      allow read, update, delete: if request.auth != null
        && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null
        && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

---

## 🏃 Hareketler (12 Adet)

| Hareket        | Kas Grubu | Tür       |
|----------------|-----------|-----------|
| Bench Press    | Göğüs     | Bileşik   |
| Squat          | Bacak     | Bileşik   |
| Deadlift       | Sırt      | Bileşik   |
| Pull-Up        | Sırt      | Bileşik   |
| Overhead Press | Omuz      | Bileşik   |
| Barbell Curl   | Biceps    | İzole     |
| Tricep Dip     | Triceps   | Bileşik   |
| Leg Press      | Bacak     | Makine    |
| Lat Pulldown   | Sırt      | Kablo     |
| Plank          | Core      | İzometrik |
| Calf Raise     | Bacak     | İzole     |
| Face Pull      | Omuz      | Kablo     |

---

## 📱 Responsive Tasarım

| Ekran Boyutu            | Davranış                                          |
|-------------------------|---------------------------------------------------|
| Masaüstü (1024px+)      | Tam navigasyon + vücut SVG paneli görünür         |
| Tablet (768px – 1024px) | Vücut SVG gizlenir, grid 2 sütuna düşer           |
| Mobil (< 768px)         | Nav linkleri gizlenir, hamburger menü aktifleşir  |
| Küçük Mobil (< 480px)   | Tek sütun grid, küçük font boyutları              |

---

## 🎨 Tasarım Sistemi

```css
--black:   #0a0a0a    /* Ana arka plan      */
--dark:    #111111    /* Section arka planı */
--card:    #181818    /* Kart arka planı    */
--red:     #e63c2f    /* Ana vurgu rengi    */
--white:   #f5f0eb    /* Ana yazı rengi     */
--gray:    #888888    /* İkincil yazı       */

/* Fontlar */
Bebas Neue        → Başlıklar, logolar
Barlow Condensed  → Etiketler, menü linkleri
Barlow            → Gövde metni
```

---

## ⚡ JavaScript Özellikleri (`java.js`)

1. **Scroll İlerleme Çubuğu** — Kırmızı şerit (üst sabit)
2. **Navbar Scroll Efekti** — Scroll sonrası kompakt görünüm
3. **Hamburger Menü** — Aç/kapa + dışarı tıklama kapatma
4. **Aktif Link** — URL'ye göre otomatik aktif sınıfı
5. **Kas Grubu Filtresi** — Kartları filtreler + SVG'yi günceller
6. **Hareket Modali** — Karta tıklayınca overlay popup açılır
7. **Scroll Animasyonları** — IntersectionObserver ile fadeUp
8. **İletişim Formu** — Firebase entegrasyonuyla gerçek gönderim

---

## 🚀 Kurulum & Çalıştırma

### 1. Repoyu klonla

```bash
git clone https://github.com/safiyegayesu/gym_anasayfa.git
cd gym_anasayfa
```

### 2. Firebase projesini yapılandır

`assets/js/firebase-config.js` dosyasını aç ve kendi Firebase proje bilgilerinle güncelle:

```js
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId:             "YOUR_APP_ID"
};
```

Firebase Console'da yapılması gerekenler:
- **Authentication** → Sign-in method → Email/Password → Etkinleştir
- **Firestore Database** → Veritabanı oluştur (test modu)
- **Firestore** → Rules → Yukarıdaki güvenlik kurallarını yapıştır

### 3. Yerel sunucu başlat

Firebase ES Modülleri kullandığından proje bir HTTP sunucusu üzerinde çalışmalıdır:

```bash
# Python ile
python -m http.server 8000
# → http://localhost:8000

# Node.js ile
npx serve .
```

> ⚠️ `index.html` dosyasını doğrudan tarayıcıda açmak (`file://`) Firebase modüllerinin çalışmamasına neden olur.

---

## 🛠️ Kullanılan Teknolojiler

| Teknoloji | Versiyon | Amaç |
|---|---|---|
| HTML5 | — | Yapı |
| CSS3 | — | Stil (CSS Variables, Grid, Flexbox) |
| JavaScript (ES Modules) | ES2020+ | Etkileşim & Firebase |
| Firebase Authentication | 10.12.2 | Kullanıcı yönetimi |
| Cloud Firestore | 10.12.2 | Veritabanı |
| Google Fonts | — | Bebas Neue, Barlow |

---

## 📄 Lisans

Bu proje eğitim amaçlı oluşturulmuştur. Ticari kullanım için izin gereklidir.
