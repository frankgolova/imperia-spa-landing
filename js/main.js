// Основной скрипт сайта
document.addEventListener('DOMContentLoaded', function () {
  // ================== МАСТЕРА (Swiper) ==================
  const mastersSwiperEl = document.querySelector('.masters-swiper');
  if (mastersSwiperEl) {
    new Swiper('.masters-swiper', {
      slidesPerView: 1.2,
      spaceBetween: 16,
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
      },
      pagination: {
        el: '.masters-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.masters-dot-right',
        prevEl: '.masters-dot-left',
      },
      grabCursor: true,
    });
  }

  // ================== ПРОГРАММЫ (Swiper) ==================
  const programsSwiperEl = document.querySelector('.programs-swiper');
  if (programsSwiperEl) {
    new Swiper('.programs-swiper', {
      slidesPerView: 1,
      spaceBetween: 16,
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1200: {
          slidesPerView: 3, // на десктопе 3 карточки, как на макете
          spaceBetween: 32,
        },
      },
      pagination: {
        el: '.program-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.program-arrow-right',
        prevEl: '.program-arrow-left',
      },
      grabCursor: true,
    });
  }

  // ================== ГАЛЕРЕЯ ФОТО ==================
  const gallery = document.querySelector('.section-gallery');
  if (!gallery) return; // если секции нет на странице — просто выходим

  const mainImg = gallery.querySelector('[data-gallery-main]');
  const thumbs = Array.from(gallery.querySelectorAll('[data-gallery-thumb]'));
  const prevBtn = gallery.querySelector('.gallery-nav-prev');
  const nextBtn = gallery.querySelector('.gallery-nav-next');

  if (!mainImg || !thumbs.length) {
    console.warn('Gallery: main image или превью не найдены');
    return;
  }

  // стартовый индекс — ищем активный thumbnail
  let currentIndex = thumbs.findIndex(btn => btn.classList.contains('is-active'));
  if (currentIndex < 0) currentIndex = 0;

  function showImage(index) {
    const total = thumbs.length;
    currentIndex = (index + total) % total; // кручение по кругу

    const activeThumb = thumbs[currentIndex];
    const imgInThumb = activeThumb.querySelector('img');

    const targetSrc = activeThumb.getAttribute('data-target');
    const targetAlt =
      activeThumb.getAttribute('data-alt') ||
      (imgInThumb ? imgInThumb.alt : '');

    if (targetSrc) {
      mainImg.src = targetSrc;
    }
    if (targetAlt) {
      mainImg.alt = targetAlt;
    }

    // подсветка активного превью
    thumbs.forEach(btn =>
      btn.classList.toggle('is-active', btn === activeThumb)
    );
  }

  // клик по превью
  thumbs.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      showImage(index);
    });
  });

  // стрелка «назад»
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showImage(currentIndex - 1);
    });
  }

  // стрелка «вперёд»
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showImage(currentIndex + 1);
    });
  }

  // показать стартовую картинку
  showImage(currentIndex);
});
