'use strict';

/* global LazyLoad, Swiper */

const breakpointSm = getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-sm').replace(/px/g, '') - 1,
      breakpointMd = getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-md').replace(/px/g, '') - 1,
      breakpointLg = getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-lg').replace(/px/g, '') - 1,
      breakpointXl = getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-xl').replace(/px/g, '') - 1,
      breakpointXxl = getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-xxl').replace(/px/g, '') - 1;

const gridGutterWidth = getComputedStyle(document.documentElement).getPropertyValue('--grid-gutter-width');

// FORMS
function initForms() {
  const select = $('.js-select');

  select.each(function() {
    const selectContainer = $(this).closest('.js-select-container');

    $(this).select2({
      dropdownParent: selectContainer.length ? selectContainer : false,
      width: '100%',
      theme: 'bootstrap',
    });
  });
}

// LAZY LOAD IMAGES
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
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 8,
    },
  });
}

(function($) {
  initForms();
  initLazyLoad();
  initStopAnimationsDuringWindowResizing();
  initSliders();
}(jQuery));
