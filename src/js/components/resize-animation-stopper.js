const initResizeAnimationStopper = () => {
  let resizeTimer;
  let lastWidth = window.innerWidth;

  window.addEventListener('resize', () => {
    if (window.innerWidth === lastWidth) {
      return;
    }

    lastWidth = window.innerWidth;

    document.body.classList.add('resize-animation-stopper');

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      document.body.classList.remove('resize-animation-stopper');
    }, 400);
  });
};

export default initResizeAnimationStopper;
