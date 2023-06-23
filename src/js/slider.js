import Swiper, { Pagination } from 'swiper';

Swiper.use({ Pagination });

const swiper = new Swiper('.swiper', {
  slidesPerView: 1.5,
  centeredSlides: true,
  loop: true,
  lazyLoading: true,
  keyboard: {
    enabled: true,
  },
  autoplay: {
    delay: 1000,
  },
  //   spaceBetween: 16,

  // If we need pagination
  pagination: {
    el: '.swiper .swiper-pagination',
    clickable: true,
  },
});

const swiperEl = document.querySelector('.swiper').swiper;

// Now you can use all slider methods like
swiperEl.slideNext();
