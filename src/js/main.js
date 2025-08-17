'use strict';

/* global LazyLoad, Swiper, Choices */

const breakpoints = {
  sm: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-sm'), 10),
  md: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-md'), 10),
  lg: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-lg'), 10),
  xl: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-xl'), 10),
  xxl: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-xxl'), 10)
};

const gridGutterWidth = getComputedStyle(document.documentElement).getPropertyValue('--bs-grid-gutter-width');

// FORMS
const initForms = () => {
  const selects = document.querySelectorAll('.js-choice');

  if (selects.length) {
    selects.forEach(element => {
      const optionsCount = element.options.length;
      const classList = [...element.classList]
        .filter(className => !['js-choice', 'form-select'].includes(className))
        .map(className => ({
          'form-select-sm': 'sm',
          'form-select-lg': 'lg',
        }[className] || className));

      const getBool = (attr, def) => {
        return element.dataset[attr] !== undefined ? element.dataset[attr] === 'true' : def;
      };

      const searchEnabled = getBool('searchEnabled', true);
      const removeItemButton = getBool('removeItemButton', false);

      const choices = new Choices(element, {
        itemSelectText: false,
        searchEnabled: searchEnabled && optionsCount > 10,
        searchPlaceholderValue: 'Search',
        removeItemButton,
        classNames: {
          containerOuter: [
            'choices',
            ...classList,
            ...(removeItemButton ? ['with-remove-items-button'] : []),
          ],
        },
      });

      if (classList.some(className => ['with-dropdown-animation-fade', 'with-dropdown-animation-transform'].includes(className))) {
        let isDropdownFlipped = false;

        choices.passedElement.element.addEventListener('showDropdown', function(e) {
          isDropdownFlipped = e.srcElement.closest('.choices').classList.value.includes('is-flipped');
        });

        choices.passedElement.element.addEventListener('hideDropdown', function(e) {
          const mainElement = e.srcElement.closest('.choices');

          if (isDropdownFlipped) {
            mainElement.classList.add('is-flipped');
          }

          const transitionDuration = parseFloat(getComputedStyle(mainElement.querySelector('.choices__list--dropdown')).transitionDuration) * 1000;

          setTimeout(() => {
            isDropdownFlipped = false;
            mainElement.classList.remove('is-flipped');
          }, transitionDuration);
        });
      }
    });
  }
};

// LAZY LOAD
const initLazyLoad = () => {
  const lazyLoadInstance = new LazyLoad({
    elements_selector: '.js-lazy',
    threshold: 0
  });
};

// STOP ANIMATIONS DURING WINDOW RESIZING
const initStopAnimationsDuringWindowResizing = () => {
  let resizeTimer;

  window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      document.body.classList.remove('resize-animation-stopper');
    }, 400);
  });
};

// SLIDERS
const initSliders = () => {
  const slider = new Swiper('.js-slider', {
    slidesPerView: 1,
    spaceBetween: gridGutterWidth,
    speed: 500,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
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

document.addEventListener('DOMContentLoaded', function() {
  initForms();
  initLazyLoad();
  initStopAnimationsDuringWindowResizing();
  initSliders();
});
