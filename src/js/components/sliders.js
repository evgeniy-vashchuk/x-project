import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import { breakpoints, gridGutterWidth } from '@utils/constants';

const initSliders = () => {
  const sliderElement = document.querySelector('.js-slider-feeds');
  const sliderPrevElement = sliderElement.closest('.swiper-holder').querySelector('.swiper-button-prev');
  const sliderNextElement = sliderElement.closest('.swiper-holder').querySelector('.swiper-button-next');
  const sliderPaginationElement = sliderElement.closest('.swiper-holder').querySelector('.swiper-pagination');

  const slider = new Swiper(sliderElement, {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: gridGutterWidth,
    speed: 500,
    createElements: true,

    navigation: {
      addIcons: false,
      enabled: true,
      nextEl: sliderNextElement || null,
      prevEl: sliderPrevElement || null,
    },

    pagination: {
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 4,
      enabled: true,
      el: sliderPaginationElement || null,
    },

    breakpoints: {
      0: {
        navigation: { enabled: false },
      },
      [breakpoints.md]: {
        navigation: { enabled: true },
      },
    },
  });
};

export default initSliders;
