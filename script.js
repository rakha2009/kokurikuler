document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------
    // 1. Footer Year Auto-Update
    // --------------------------------------
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // --------------------------------------
    // 2. Audio Controller (Play/Pause)
    // --------------------------------------
    const audio = document.getElementById('background-audio');
    const audioControl = document.getElementById('audio-control');
    const audioIcon = document.getElementById('audio-icon');

    // Mencegah Autoplay, hanya sediakan kontrol
    let isPlaying = false;

    audioControl.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            audioIcon.textContent = '▶️';
            audioControl.title = 'Putar Musik Latar';
        } else {
            audio.play().catch(error => {
                // Tangani error jika browser memblokir play tanpa interaksi user
                console.error("Gagal memutar audio:", error);
                alert("Browser memblokir pemutaran otomatis. Silakan coba lagi.");
            });
            audioIcon.textContent = '⏸️';
            audioControl.title = 'Jeda Musik Latar';
        }
        isPlaying = !isPlaying;
    });

    // --------------------------------------
    // 3. Scroll Animation (Fade-in saat elemen terlihat)
    // --------------------------------------
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-up');

    const observerOptions = {
        root: null, // Viewport
        rootMargin: '0px',
        threshold: 0.1 // Ketika 10% dari elemen terlihat
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Tambahkan class 'visible' untuk menjalankan animasi
                entry.target.classList.add('visible');
                // Hentikan pengawasan setelah animasi dijalankan
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        scrollObserver.observe(element);
    });

    // Panggil segera untuk elemen yang sudah ada di viewport saat load
    setTimeout(() => {
        fadeElements.forEach(element => {
            if (element.getBoundingClientRect().top < window.innerHeight) {
                element.classList.add('visible');
            }
        });
    }, 100);

    // --------------------------------------
    // 4. Parallax Effect (Minimalis)
    // --------------------------------------
    const parallaxElement = document.querySelector('.parallax-bg');

    window.addEventListener('scroll', () => {
        if (parallaxElement) {
            const scrollPosition = window.pageYOffset;
            // Ambil kecepatan dari atribut data-scroll-speed di HTML
            const speed = parseFloat(parallaxElement.getAttribute('data-scroll-speed')) || 0.5;
            
            // Gerakkan background pada sumbu Y
            parallaxElement.style.backgroundPositionY = `${scrollPosition * speed}px`;
        }
    });
});