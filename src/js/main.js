import Collapse from 'bootstrap/js/dist/collapse.js';
import Dropdown from 'bootstrap/js/dist/dropdown.js';
import Modal from 'bootstrap/js/dist/modal.js';

export const Bootstrap = {
  Collapse,
  Dropdown,
  Modal,
};

import { initDropdownDefaults } from '@components/dropdown';
import initSelect from '@components/forms/select';
import initLazyLoad from '@components/lazyload';
import initResizeAnimationStopper from '@components/resize-animation-stopper';
import initSliders from '@components/sliders';

document.addEventListener('DOMContentLoaded', () => {
  initSelect();
  initLazyLoad();
  initResizeAnimationStopper();
  initSliders();
  initDropdownDefaults();
});
