import { Bootstrap } from '../main.js';

const initDropdownDefaults = () => {
  const dropdownOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--dropdown-offset'), 10);

  Bootstrap.Dropdown.Default.offset = [0, dropdownOffset];
};

export { initDropdownDefaults };
