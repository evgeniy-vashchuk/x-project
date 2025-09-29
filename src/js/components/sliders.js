import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import { breakpoints, gridGutterWidth } from '@utils/constants';

const initSliders = () => {
  const slider = new Swiper('.js-slider', {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: gridGutterWidth,
    speed: 500,
    createElements: true,

    navigation: {
      addIcons: false,
      enabled: true,
    },

    pagination: {
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 4,
      enabled: true,
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
