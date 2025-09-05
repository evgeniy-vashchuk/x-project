import Choices from 'choices.js';

const initSelect = () => {
  const selects = document.querySelectorAll('.js-choice');

  if (selects.length) {
    selects.forEach(element => {
      const optionsCount = element.querySelectorAll('option').length;
      const classList = [...element.classList]
        .filter(className => !['js-choice', 'form-select'].includes(className))
        .map(className => ({
          'form-select-sm': 'sm',
          'form-select-lg': 'lg',
        }[className] || className));

      const getBool = (attr, def) => {
        const attrValue = element.getAttribute(attr);

        return attrValue !== null ? attrValue === 'true' : def;
      };

      const searchEnabled = getBool('search-enabled', true);
      const removeItemButton = getBool('remove-item-button', false);

      const choices = new Choices(element, {
        itemSelectText: '',
        searchEnabled: searchEnabled && optionsCount > 10,
        searchPlaceholderValue: 'Search',
        removeItemButton,

        // @ts-ignore
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
          const { currentTarget } = e;

          if (currentTarget instanceof HTMLElement) {
            isDropdownFlipped = currentTarget.closest('.choices').classList.contains('is-flipped');
          }
        });

        choices.passedElement.element.addEventListener('hideDropdown', function(e) {
          const { currentTarget } = e;
          const mainElement = currentTarget instanceof HTMLElement ? currentTarget.closest('.choices') : null;

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

export default initSelect;
