ready(function(){

  // В этом месте должен быть написан ваш код

// let toggler = document.getElementsByClassName('burger');
// toggler.addEventListener('click', mainNavVisibleToggle);
// function mainNavVisibleToggle(e) {
//   e.preventDefault();
//   toggler.classList.toggle('burger--close');
// document.getElementsByClassName('main-nav').classList.toggle('main-nav--open');

const burger = document.querySelector('.burger');
const mainNav = document.querySelector('.main-nav');
burger.addEventListener('click', function(){
  mainNav.classList.toggle('main-nav--open')
  burger.classList.toggle('burger--close')
});

const filter = document.querySelector('.filters');
filter.addEventListener('click', function() {
  filter.classList.toggle('filters--open')
});

const fragment = document.createDocumentFragment(); 
const template = document.querySelector('#book__card'); 

for (i=0; i<10; i++) { 
const newBook = template.content.cloneNode(true); 

newBook.querySelector('.card__title').innerHTML = books[i].name; 
newBook.querySelector('.card__price').innerHTML = books[i].price; 
newBook.querySelector('.card__img').src = 'img/' + books[i].uri + '.jpg'; 
newBook.querySelector('.card__img').alt = books[i].name;

fragment.appendChild(newBook); 
}; 

document.querySelector('.catalog__books-list').appendChild(fragment);


  // ВНИМАНИЕ!
  // Нижеследующий код (кастомный селект и выбор диапазона цены) работает
  // корректно и не вызывает ошибок в консоли браузера только на главной.
  // Одна из ваших задач: сделать так, чтобы на странице корзины в консоли
  // браузера не было ошибок.

  // Кастомные селекты (кроме выбора языка)
  new Choices('.field-select:not(#lang) select.field-select__select', {
    searchEnabled: false,
    shouldSort: false,
  });
  // Кастомный селект выбора языка отдельно
  new Choices('#lang select.field-select__select', {
    searchEnabled: false,
    shouldSort: false,
    callbackOnCreateTemplates: function (template) {
      return {
        item: (classNames, data) => {
          return template(`
            <div class="${classNames.item} ${data.highlighted ? classNames.highlightedState : classNames.itemSelectable}" data-item data-id="${data.id}" data-value="${data.value}" ${data.active ? 'aria-selected="true"' : ''} ${data.disabled ? 'aria-disabled="true"' : ''}>
              ${getLangInSelectIcon(data.value)} ${data.label.substr(0,3)}
            </div>
          `);
        },
        choice: (classNames, data) => {
          return template(`
            <div class="${classNames.item} ${classNames.itemChoice} ${data.disabled ? classNames.itemDisabled : classNames.itemSelectable}" data-select-text="${this.config.itemSelectText}" data-choice ${data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable'} data-id="${data.id}" data-value="${data.value}" ${data.groupId > 0 ? 'role="treeitem"' : 'role="option"'}>
              ${getLangInSelectIcon(data.value)} ${data.label}
            </div>
          `);
        },
      };
    }
  });
  function getLangInSelectIcon(value) {
    if (value == 'ru') return '<span class="field-select__lang-ru"></span>';
    else if (value == 'en') return '<span class="field-select__lang-en"></span>';
    return '<span class="field-select__lang-null"></span>';
  }

  // Выбор диапазона цен
  var slider = document.getElementById('price-range');
  noUiSlider.create(slider, {
    start: [400, 1000],
    connect: true,
    step: 100,
    range: {
      'min': 200,
      'max': 2000
    }
  });

});

function ready (fn) {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
