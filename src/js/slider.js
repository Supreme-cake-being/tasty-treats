import Swiper, { Navigation, Pagination } from 'swiper';
import axios from 'axios';

// Swiper.use({ Navigation, Pagination });

const swiper = new Swiper('.swiper', {
  slidesPerView: 1.25,
  initialSlide: 1,
  centeredSlides: true,
  // loop: true,
  // lazyLoading: true,
  // keyboard: {
  //   enabled: true,
  // },
  modules: [Navigation, Pagination],
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  spaceBetween: 16,

  // If we need pagination
  pagination: {
    el: '.swiper .swiper-pagination',
    type: 'bullets',
    clickable: true,
    bulletActiveClass: true,
  },
});

// const swiperEl = document.querySelector('.swiper').swiper;

// Now you can use all slider methods like
// swiper.slideNext();

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
let response = axios.get(`${BASE_URL}/events`);
console.log(response);
