'use strict';

/* global LazyLoad, Swiper */

const breakpoints = {
  sm: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-sm'), 10),
  md: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-md'), 10),
  lg: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-lg'), 10),
  xl: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-xl'), 10),
  xxl: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-xxl'), 10)
};

const gridGutterWidth = getComputedStyle(document.documentElement).getPropertyValue('--bs-grid-gutter-width');

// FORMS
function initForms() {
  const select = $('.js-select');

  select.each(function() {
    const selectItem = $(this),
          selectLabel = selectItem.siblings('.form-label'),
          selectContainer = selectItem.closest('.js-select-container');

    selectItem.select2({
      dropdownParent: selectContainer.length ? selectContainer : false,
      width: '100%',
      theme: 'bootstrap',
      minimumResultsForSearch: 10,
    });

    selectLabel.on('click', function() {
      selectItem.select2('open');
    });
  });
}

// LAZY LOAD
function initLazyLoad() {
  const lazyLoadInstance = new LazyLoad({
    elements_selector: '.js-lazy',
    threshold: 0
  });
}

// STOP ANIMATIONS DURING WINDOW RESIZING
function initStopAnimationsDuringWindowResizing() {
  let resizeTimer;

  $(window).on('resize', function() {
    $('body').addClass('resize-animation-stopper');

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(function() {
      $('body').removeClass('resize-animation-stopper');
    }, 400);
  });
}

// SLIDERS
function initSliders() {
  const slider = new Swiper('.js-swiper', {
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
  });
}

(function($) {
  initForms();
  initLazyLoad();
  initStopAnimationsDuringWindowResizing();
  initSliders();
}(jQuery));
