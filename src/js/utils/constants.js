export const breakpoints = {
  sm: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-sm'), 10),
  md: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-md'), 10),
  lg: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-lg'), 10),
  xl: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-xl'), 10),
  xxl: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-xxl'), 10),
};

export const gridGutterWidth = getComputedStyle(document.documentElement).getPropertyValue('--bs-grid-gutter-width');
