import LazyLoad from 'vanilla-lazyload';

const initLazyLoad = () => {
  const lazyLoadInstance = new LazyLoad({
    elements_selector: '.js-lazy',
    threshold: 0
  });
};

export default initLazyLoad;
