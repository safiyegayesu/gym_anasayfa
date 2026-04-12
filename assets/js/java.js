/* ── IRONPEAK GYM — java.js ── */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll Progress Bar ── */
  const progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const pct = (window.scrollY / total) * 100;
      progressBar.style.width = pct + '%';
    });
  }

  /* ── Navbar Scroll Effect ── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  /* ── Hamburger Menu ── */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── Active Nav Link ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href.includes(currentPage) || (currentPage === 'index.html' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });

  /* ── Exercise Filter ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const exerciseCards = document.querySelectorAll('.exercise-card');

  if (filterBtns.length && exerciseCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        exerciseCards.forEach(card => {
          if (filter === 'all' || card.dataset.muscle === filter) {
            card.classList.remove('hidden');
            card.style.animation = 'none';
            card.offsetHeight; // reflow
            card.style.animation = 'fadeUp 0.4s ease forwards';
          } else {
            card.classList.add('hidden');
          }
        });

        // Update body SVG highlight
        updateBodyHighlight(filter);
      });
    });
  }

  /* ── Body SVG Highlight ── */
  function updateBodyHighlight(filter) {
    const bodyParts = document.querySelectorAll('.body-part');
    bodyParts.forEach(part => {
      part.classList.remove('active');
      if (filter === 'all') return;
      if (part.dataset.muscle === filter) {
        part.classList.add('active');
      }
    });
  }

  // Body part click → filter sync
  document.querySelectorAll('.body-part').forEach(part => {
    part.addEventListener('click', () => {
      const muscle = part.dataset.muscle;
      const matchBtn = document.querySelector(`.filter-btn[data-filter="${muscle}"]`);
      if (matchBtn) matchBtn.click();
    });
  });

  /* ── Exercise Modal ── */
  const exerciseData = {
    'bench-press': {
      name: 'Bench Press',
      muscle: 'Göğüs',
      desc: 'Bench press, üst vücut kuvveti için temel harekettir. Pectoralis major, anterior deltoid ve triceps kaslarını hedef alır.',
      steps: [
        'Bench üzerine sırt üstü yatın, gözleriniz barın altında olsun.',
        'Barı omuz genişliğinden biraz daha geniş tutun.',
        'Barı kaldırın ve göğsünüzün üst kısmına indirin.',
        'Dirseğinizi hafif içe alarak barı kontrollü indirin.',
        'Göğsünüze değdikten sonra güçlü bir şekilde itin.',
        'Hareketi tüm tekrarlarda tutarlı yapın.'
      ],
      primary: ['Pectoralis Major'],
      secondary: ['Anterior Deltoid', 'Triceps', 'Serratus Anterior']
    },
    'squat': {
      name: 'Squat',
      muscle: 'Bacak',
      desc: 'Squat, alt vücudun "kral hareketi"dir. Quadriceps, hamstring ve gluteus kaslarını çalıştırır.',
      steps: [
        'Barı trapez kasının üzerine, omuzlarınıza yerleştirin.',
        'Ayaklarınızı omuz genişliğinde açın, parmaklar dışa baksın.',
        'Göğsünüzü dik tutarak kalçanızı geriye-aşağı itin.',
        'Dizleriniz parmak uçlarının hizasında ilerlesin.',
        'Uyluk yere paralel olana kadar inin (veya daha derin).',
        'Topuklardan güç alarak başlangıç pozisyonuna dönün.'
      ],
      primary: ['Quadriceps', 'Gluteus Maximus'],
      secondary: ['Hamstrings', 'Adductor Magnus', 'Erector Spinae']
    },
    'deadlift': {
      name: 'Deadlift',
      muscle: 'Sırt',
      desc: 'Deadlift, tüm vücudu çalıştıran kompleks bir harekettir. Posterior zinciri tamamen aktive eder.',
      steps: [
        'Bar ayak orta üzerinde durmalı, bacak kalçadan biraz daha dar.',
        'Barı overhand veya mixed grip ile tutun.',
        'Kalçayı aşağı alın, göğsü kaldırın, sırt düz olsun.',
        'Nefes alıp core\'u sabitleyin (Valsalva).',
        'Topuktan basarak barı bacak boyunca kaydırın.',
        'Kalça ve dizleri aynı anda açarak ayağa kalkın.',
        'Zirvede kalçayı kilitleyin, sonra kontrollü indirin.'
      ],
      primary: ['Erector Spinae', 'Gluteus Maximus', 'Hamstrings'],
      secondary: ['Trapezius', 'Rhomboids', 'Forearms', 'Core']
    },
    'pull-up': {
      name: 'Pull-Up',
      muscle: 'Sırt',
      desc: 'Pull-up, üst sırt ve biceps gelişimi için vazgeçilmez bir hareket. V şekilli sırt için mükemmel.',
      steps: [
        'Barı omuz genişliğinden geniş, overhand grip ile tutun.',
        'Kollarınızı tamamen uzatın, sarkın.',
        'Omuz bıçaklarını aşağı-içe sıkıştırın.',
        'Göğsünüzü bara doğru çekerek yükseltin.',
        'Çene barda veya üstünde olana kadar devam edin.',
        'Kontrollü bir şekilde başlangıç pozisyonuna dönün.'
      ],
      primary: ['Latissimus Dorsi'],
      secondary: ['Biceps Brachii', 'Rear Deltoid', 'Rhomboids', 'Teres Major']
    },
    'overhead-press': {
      name: 'Overhead Press',
      muscle: 'Omuz',
      desc: 'OHP, omuz gelişimi ve üst vücut kuvveti için en temel hareketlerden biridir.',
      steps: [
        'Barı boyun/üst göğüs hizasında tutun, grip biraz daha geniş.',
        'Ayaklarınızı omuz genişliğinde açın.',
        'Core\'u sabitleyin, vücut düz bir çizgi olsun.',
        'Barı doğrusal yolda yukarı itin.',
        'Kolu uzatırken başı hafif geri alın, sonra öne alın.',
        'Kontrollü bir şekilde boyun önüne indirin.'
      ],
      primary: ['Anterior Deltoid', 'Medial Deltoid'],
      secondary: ['Triceps', 'Upper Trapezius', 'Core', 'Serratus Anterior']
    },
    'barbell-curl': {
      name: 'Barbell Curl',
      muscle: 'Biceps',
      desc: 'Barbell curl, biceps kütlesini ve kuvvetini artırmak için klasik ve etkili bir harekettir.',
      steps: [
        'Barı shoulder-width underhand grip ile tutun.',
        'Dirsekler gövdeye sabitlenmiş, vücut dik durmalı.',
        'Barı yalnızca önkol ile kıvırın (elbow flexion).',
        'Üstte bicepsi tam sıkıştırın.',
        'Kontrollü şekilde tam uzatmaya indirin (tam ROM).',
        'Hareketi boyunca dirsekleri stabil tutun.'
      ],
      primary: ['Biceps Brachii'],
      secondary: ['Brachialis', 'Brachioradialis', 'Forearm Flexors']
    },
    'tricep-dip': {
      name: 'Tricep Dip',
      muscle: 'Triceps',
      desc: 'Dip hareketi triceps hacmi için en güçlü egzersizlerden biridir. Aynı zamanda göğsü de çalıştırır.',
      steps: [
        'Paralel barlara overhand grip ile tutunun.',
        'Kolları uzatın ve kendinizi kaldırın.',
        'Hafifçe öne eğilin (triceps odaklı için dik durun).',
        'Dirsekler 90° olana kadar kontrollü inin.',
        'Tricepsleri kullanarak başlangıç pozisyonuna dönün.',
        'Ağırlık ekleyerek progresyon sağlayın.'
      ],
      primary: ['Triceps Brachii'],
      secondary: ['Anterior Deltoid', 'Pectoralis Major', 'Rhomboids']
    },
    'leg-press': {
      name: 'Leg Press',
      muscle: 'Bacak',
      desc: 'Leg press, quadriceps ve gluteus kaslarını izole etmek için idealdir. Omurgayı korur.',
      steps: [
        'Platforma omuz genişliğinde, düz ayak basın.',
        'Sırtı ve beli koltuktan kaldırmayın.',
        'Güvenlik kilidini serbest bırakın.',
        'Diz 90°\'den derin olana kadar platform indirin.',
        'Topukları iterek başlangıca dönün.',
        'Dizleri tam kilitlemeden tekrar edin.'
      ],
      primary: ['Quadriceps'],
      secondary: ['Gluteus Maximus', 'Hamstrings', 'Calves']
    },
    'lat-pulldown': {
      name: 'Lat Pulldown',
      muscle: 'Sırt',
      desc: 'Lat pulldown, pull-up yapamayanlara veya ek hacim eklemek isteyenlere mükemmel bir alternatiftir.',
      steps: [
        'Grip barlarda geniş overhand grip ile tutun.',
        'Hafifçe arkaya yaslanın, göğsü öne verin.',
        'Bar boyun önüne doğru çekin.',
        'Çekerken dirsekleri aşağı-arkaya doğru getirin.',
        'Latları zirvede sıkıştırın.',
        'Kontrollü şekilde tam uzatmaya bırakın.'
      ],
      primary: ['Latissimus Dorsi'],
      secondary: ['Biceps', 'Rear Deltoid', 'Teres Major', 'Rhomboids']
    },
    'plank': {
      name: 'Plank',
      muscle: 'Core',
      desc: 'Plank, core stabilitesi için temel izometrik egzersizdir. Tüm merkez kaslarını aktive eder.',
      steps: [
        'Önkol ve ayak parmakları üzerinde pozisyon alın.',
        'Vücut baştan topuğa düz bir çizgi oluşturmalı.',
        'Kalçayı ne kaldırın ne de indirin.',
        'Göbeği omurgaya doğru çekin (hollowing).',
        'Boyun nötral, bakış aşağıya olsun.',
        'Hedef süreyi tutun, nefes almayı bırakmayın.'
      ],
      primary: ['Transverse Abdominis', 'Rectus Abdominis'],
      secondary: ['Obliques', 'Erector Spinae', 'Glutes', 'Shoulders']
    },
    'calf-raise': {
      name: 'Calf Raise',
      muscle: 'Bacak',
      desc: 'Calf raise, genellikle ihmal edilen gastrocnemius ve soleus kaslarını çalıştıran temel harekettir.',
      steps: [
        'Platform kenarına ön ayak basın, topuklar serbest.',
        'Ağırlığı (barbell, dumbbell veya makine) sabitleyin.',
        'Topukları mümkün olduğunca aşağı indirin.',
        'Parmak uçlarına yükselin, kasları tam sıkıştırın.',
        'Zirvede 1-2 saniye tutun.',
        'Kontrollü şekilde başa dönün.'
      ],
      primary: ['Gastrocnemius', 'Soleus'],
      secondary: ['Tibialis Posterior', 'Peroneals']
    },
    'face-pull': {
      name: 'Face Pull',
      muscle: 'Omuz',
      desc: 'Face pull, posterior deltoid ve rotator cuff sağlığı için kritik bir yardımcı harekettir.',
      steps: [
        'Kablo makinasını göz hizasına ayarlayın (rope attachment).',
        'Rope\'u her iki elle tutun, avuç içleri aşağıya baksın.',
        'Geri doğru çekin, dirsekler omuz hizasına çıksın.',
        'Hareketi tamamlarken dirsekleri dışa-yukarı açın.',
        'Arka deltoid ve rotator cuff\'u sıkıştırın.',
        'Kontrollü şekilde başa dönün.'
      ],
      primary: ['Posterior Deltoid', 'Rotator Cuff'],
      secondary: ['Rhomboids', 'Middle Trapezius', 'Teres Minor']
    }
  };

  // Open modal
  document.querySelectorAll('.exercise-card').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.key;
      const data = exerciseData[key];
      if (!data) return;

      const overlay = document.getElementById('exerciseModal');
      if (!overlay) return;

      overlay.querySelector('.modal-muscle').textContent = data.muscle;
      overlay.querySelector('.modal-title').textContent = data.name;
      overlay.querySelector('.modal-desc').textContent = data.desc;

      const stepsEl = overlay.querySelector('.modal-steps');
      stepsEl.innerHTML = data.steps.map(s => `<li>${s}</li>`).join('');

      const tagsEl = overlay.querySelector('.modal-tags');
      tagsEl.innerHTML = [
        ...data.primary.map(m => `<span class="muscle-tag primary">${m}</span>`),
        ...data.secondary.map(m => `<span class="muscle-tag">${m}</span>`)
      ].join('');

      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  const modalOverlay = document.getElementById('exerciseModal');
  if (modalOverlay) {
    modalOverlay.querySelector('.modal-close').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  function closeModal() {
    const overlay = document.getElementById('exerciseModal');
    if (overlay) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  /* ── Scroll-triggered Animations ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.exercise-card, .tip-card, .split-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s, box-shadow 0.3s';
    observer.observe(el);
  });

  /* ── Contact Form ── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = '✓ GÖNDERİLDİ';
      btn.style.background = '#1a6b3a';
      btn.style.borderColor = '#1a6b3a';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.style.borderColor = '';
        contactForm.reset();
      }, 3000);
    });
  }

});
