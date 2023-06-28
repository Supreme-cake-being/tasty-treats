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

    const slideMarkup = `<div class="swiper-slide" pagination="true">
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
          />
    
        <div class="info-container">
        <h2 class="recipe-name">${name}</h2>
        <p class="area-name">${area}</p>
        </div>
        </div>
        

      <div>
          <img src="${previewUrl}" alt="Recipe" class="recipe_closeup" />
          </div>
          </div>
      
    
    </div>`;

    let swiperWrapEl = document.querySelector('.swiper-wrapper');
    swiperWrapEl.insertAdjacentHTML('afterbegin', slideMarkup);
  }

  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    lazyLoading: true,
    spaceBetween: 16,
    keyboard: {
      enabled: true,
    },
    modules: [Navigation, Pagination],

    // If we need pagination
    pagination: {
      // enabled: true,
      el: '.swiper .swiper-pagination',
      type: 'bullets',
      clickable: true,
      bulletActiveClass: 'active',
    },
  });
});
