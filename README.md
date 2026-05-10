 Canlı Demo (https://safiyegayesu.github.io/gym_anasayfa/)
# IRONPEAK GYM — Hareket & Kas Rehberi

> Bilimsel antrenman prensipleriyle güçlen. Doğru teknik, doğru kas, doğru sonuç.

---

## 📁 Proje Yapısı

```
ironpeak-gym/
├── index.html              ← Anasayfa (Hero, Hareketler, Program, CTA)
├── pages/
│   ├── about.html          ← Hakkımızda sayfası
│   └── contact.html        ← İletişim formu sayfası
├── assets/
│   ├── css/
│   │   └── style.css       ← Tüm stiller (CSS Variables + Responsive)
│   └── js/
│       └── java.js         ← Hamburger menü, filtreler, modal, animasyonlar
└── README.md               ← Bu dosya
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

### Hareketler (12 Adet)
| Hareket | Kas Grubu | Tür |
|---|---|---|
| Bench Press | Göğüs | Bileşik |
| Squat | Bacak | Bileşik |
| Deadlift | Sırt | Bileşik |
| Pull-Up | Sırt | Bileşik |
| Overhead Press | Omuz | Bileşik |
| Barbell Curl | Biceps | İzole |
| Tricep Dip | Triceps | Bileşik |
| Leg Press | Bacak | Makine |
| Lat Pulldown | Sırt | Kablo |
| Plank | Core | İzometrik |
| Calf Raise | Bacak | İzole |
| Face Pull | Omuz | Kablo |

---

## 📱 Responsive Tasarım

| Ekran Boyutu | Davranış |
|---|---|
| Masaüstü (1024px+) | Tam navigasyon + vücut SVG paneli görünür |
| Tablet (768px – 1024px) | Vücut SVG gizlenir, grid 2 sütuna düşer |
| Mobil (< 768px) | Nav linkleri gizlenir, hamburger menü aktifleşir |
| Küçük Mobil (< 480px) | Tek sütun grid, küçük font boyutları |

---

## 🍔 Hamburger Menü

Mobil cihazlarda (`< 768px`) üst sağ köşede beliren hamburger ikon:

- **Animasyonlu**: 3 çizgi → X animasyonu (CSS transform)
- **Slide-in**: Menü yukarıdan kayarak açılır (`translateY`)
- **Kapatma yöntemleri**: Buton, dışarı tıklama, link tıklama

---

## 🎨 Tasarım Sistemi

```css
--black:   #0a0a0a    /* Ana arka plan */
--dark:    #111111    /* Section arka planı */
--card:    #181818    /* Kart arka planı */
--red:     #e63c2f    /* Ana vurgu rengi */
--white:   #f5f0eb    /* Ana yazı rengi */
--gray:    #888888    /* İkincil yazı */

/* Fontlar */
Bebas Neue  → Başlıklar, logolar
Barlow Condensed → Etiketler, menü linkleri  
Barlow      → Gövde metni
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
8. **İletişim Formu** — Gönderi simülasyonu + görsel geri bildirim

---

## 🚀 Kullanım

Sadece dosyaları bir klasöre çıkar ve `index.html` dosyasını tarayıcıda aç. Sunucu gerekmez — tüm özellikler statik olarak çalışır.

```bash
# Basit Python sunucusu ile test et
python -m http.server 8000
# → http://localhost:8000
```

---

## 📄 Lisans

Bu proje eğitim amaçlı oluşturulmuştur. Ticari kullanım için izin gereklidir.
