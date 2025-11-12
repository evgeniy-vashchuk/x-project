import Choices from 'choices.js';

const initSelect = () => {
  const selects = document.querySelectorAll('.js-choice');

  if (selects.length) {
    const currentLocale = document.documentElement.lang;
    const locales = {
      en: {
        search: 'Search',
        noResults: 'No results found',
        noChoices: 'No choices to choose from',
        loading: 'Loading...',
      },
    };

    selects.forEach(element => {
      const optionsCount = element.querySelectorAll('option').length;
      const placeholder = element.getAttribute('data-placeholder');
      const multiple = element.hasAttribute('multiple');
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

      if (placeholder) {
        element.removeAttribute('data-placeholder');
        element.insertAdjacentHTML('afterbegin', `<option placeholder ${!multiple ? ' selected disabled' : ''}>${placeholder}</option>`);
      }

      const choices = new Choices(element, {
        itemSelectText: '',
        searchEnabled: searchEnabled && optionsCount > 10,
        searchPlaceholderValue: locales[currentLocale].search,
        noResultsText: locales[currentLocale].noResults,
        noChoicesText: locales[currentLocale].noChoices,
        loadingText: locales[currentLocale].loading,
        shouldSort: false,
        removeItemButton,
        classNames: {
          containerOuter: [
            'choices',
            ...classList,
            ...(removeItemButton ? ['with-remove-items-button'] : []),
          ],
        },
      });

      element.choices = choices;

      if (classList.some(className => ['with-dropdown-animation-fade', 'with-dropdown-animation-transform'].includes(className))) {
        let isDropdownFlipped = false;

        choices.passedElement.element.addEventListener('showDropdown', function(e) {
          isDropdownFlipped = e.target.closest('.choices').classList.value.includes('is-flipped');
        });

        choices.passedElement.element.addEventListener('hideDropdown', function(e) {
          const mainElement = e.target.closest('.choices');

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
