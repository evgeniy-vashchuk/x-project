import { createPopper } from '@popperjs/core';
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
        addItemText: 'Press Enter to add <strong>"value"</strong>',
      },
    };

    selects.forEach(select => {
      const optionsCount = select.options ? Array.from(select.options).filter(option => option.value !== '').length : 0;
      const classList = [...select.classList]
        .filter(className => !className.startsWith('js-') && !['form-select'].includes(className) && !['form-control'].includes(className))
        .map(className => ({
          'form-select-sm': 'sm',
          'form-control-sm': 'sm',
          'form-select-lg': 'lg',
          'form-control-lg': 'lg',
        }[className] || className));

      const getBool = (attr, def) => {
        const attrValue = select.getAttribute(attr);

        return attrValue !== null ? attrValue === 'true' : def;
      };

      const searchEnabled = getBool('search-enabled', true);
      const removeItemButton = getBool('remove-item-button', false);
      const fixedPosition = select.classList.contains('js-fixed-position');

      const choices = new Choices(select, {
        itemSelectText: '',
        searchEnabled: searchEnabled && optionsCount > 10,
        placeholderValue: select.tagName === 'INPUT' ? select.getAttribute('placeholder') : '',
        searchPlaceholderValue: locales[currentLocale].search,
        noResultsText: locales[currentLocale].noResults,
        noChoicesText: locales[currentLocale].noChoices,
        loadingText: locales[currentLocale].loading,
        addItemText: (value, rawValue) => {
          return locales[currentLocale].addItemText.replace('value', value);
        },
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

      select.choices = choices;

      if (fixedPosition) {
        let popperInstance = null;

        function openHandler(choices) {
          const dropdown = choices.dropdown.element;
          const reference = choices.containerInner.element;
          const isDropdownFlipped = choices.containerOuter.element.classList.value.includes('is-flipped');
          const offsetProp = isDropdownFlipped ? 'marginBottom' : 'marginTop';
          const offset = parseFloat(getComputedStyle(dropdown)[offsetProp] || 0);

          popperInstance = createPopper(reference, dropdown, {
            placement: isDropdownFlipped ? 'top-start' : 'bottom-start',
            strategy: 'fixed',
            modifiers: [
              { name: 'computeStyles', options: { gpuAcceleration: false } },
              { name: 'offset', options: { offset: [0, offset] } },
            ],
          });

          dropdown.style.width = `${reference.offsetWidth}px`;
        }

        function closeHandler(choices) {
          if (popperInstance) {
            popperInstance.destroy();
            popperInstance = null;
          }
        }

        let isOpen = false;

        select.addEventListener('showDropdown', function(event) {
          if (isOpen) return;

          isOpen = true;

          openHandler(choices);
        });

        select.addEventListener('hideDropdown', function(event) {
          isOpen = false;

          closeHandler(choices);
        });
      }

      let isDropdownFlipped = false;

      select.addEventListener('showDropdown', function(event) {
        isDropdownFlipped = event.target.closest('.choices').classList.value.includes('is-flipped');

        if (isDropdownFlipped) {
          event.target.closest('.choices').classList.remove('is-open');

          setTimeout(() => {
            event.target.closest('.choices').classList.add('is-open');
          }, 0);
        }
      });
    });
  }
};

export default initSelect;
