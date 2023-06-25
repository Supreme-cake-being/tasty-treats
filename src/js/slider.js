import Swiper, { Navigation, Pagination } from 'swiper';
import { fetchEvents } from './service/API';

const swiperEl = document.querySelector('.swiper');

fetchEvents().then(events => {
  console.log(events);
  // let cooksImgArray = [];
  // let eventNameArray = [];
  for (let i = 0; i < events.length; i++) {
    // event = events[i];
    // console.log(event);
    // return eventInfo;
    const {
      cook: { imgUrl },
      topic: { name, area, previewUrl },
    } = events[i];
    console.log(imgUrl, name, area, previewUrl);

    const slideMarkup = `<div class="swiper-slide">
    <div class="slide-container">
          <img
            src='${imgUrl}'
            alt="Cook name"
            class="cook_image"
          />
   
        <div class="recipe_image">
          <img
            src="${previewUrl}"
            alt="Recipe"
            class="recipe_image"
          />
        <h2>${name}</h2>
        <p>${area}</p>
        </div>
      
          <img src="../img/card.png" alt="Recipe" class="recipe_closeup" />
          </div>
      
    
    </div>`;

    let swiperWrapEl = document.querySelector('.swiper-wrapper');
    swiperWrapEl.insertAdjacentHTML('afterbegin', slideMarkup);
  }

  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
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
});
