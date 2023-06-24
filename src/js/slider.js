import Swiper, { Navigation, Pagination } from 'swiper';
import { fetchEvents } from './service/API';

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

const swiperEl = document.querySelector('.swiper');

let array = fetchEvents()
  .then(result => {
    console.log(result);
    // let cooksImgArray = [];
    // let eventNameArray = [];
    let eventInfo;
    for (let i = 0; i < result.length; i++) {
      eventInfo = result[i];
      const {
        cook: { imgUrl },
        topic: { name, area, previewUrl },
      } = eventInfo;

      console.log(imgUrl, name, area, previewUrl);
    }

    // cooksImgArray.push(result[i].cook.imgUrl);
    // eventNameArray.push(result[i].topic.name);

    // console.log(cooksImgArray);
    // console.log(eventNameArray);
    // }).catch(error => console.log(error.message));

    function createSlideMarkup(eventInfo) {
      return eventInfo.map((imgUrl, name, area, previewUrl) => {
        return `<div class="swiper-wrapper">
        <div class="swiper-slide swiper-slide_first">
          <img
            src='${imgUrl}'
            alt="Cook name"
            class="cook_image"
          />
        </div>

        <div class="swiper-slide swiper-slide_second">
          <img
            src="../img/pizza picture.png"
            alt="Recipe"
            class="recipe_image"
          />
        <h2>${name}</h2>
        <p>${area}</p>
        </div>

        <div class="swiper-slide swiper-slide_third">
          <img src="${previewUrl}" alt="Recipe" class="recipe_closeup" />
        </div>
      </div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
      <div class="swiper-pagination-bullet"></div>
    </div>`}).join('').catch(error => console.log(error.message));

const slideMarkup = createGalleryMarkup(eventInfo);

      galleryWrapperRef.insertAdjacentHTML('beforeend', slideMarkup);
