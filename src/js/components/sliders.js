import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import { breakpoints, gridGutterWidth } from '@utils/constants';

const initSliders = () => {
  const slider = new Swiper('.js-slider', {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: gridGutterWidth,
    speed: 500,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      addIcons: false,
      enabled: true,
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 4,
      enabled: true,
    },

    breakpoints: {
      [breakpoints.sm]: {
        pagination: { enabled: false },
      },
    },
  });
};

export default initSliders;
