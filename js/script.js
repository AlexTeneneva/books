ready(function(){

  // В этом месте должен быть написан ваш код

//Burger and filter
const burger = document.querySelector('.burger');
const mainNav = document.querySelector('.main-nav');
burger.addEventListener('click', function(){
  mainNav.classList.toggle('main-nav--open')
  burger.classList.toggle('burger--close')
});

const filterBtn = document.querySelector('.filters__trigger');
const filter = document.querySelector('.filters');
filterBtn.addEventListener('click', function() {
  filter.classList.toggle('filters--open')
});


// card render

const fragment = document.createDocumentFragment(); 
const bookCard = document.querySelector('.card'); 

for (i=0; i<9; i++) { 
  const newBook = bookCard.cloneNode(true); 
  newBook.querySelector('.card__title').innerHTML = books[i].name; 
  newBook.querySelector('.card__price').innerHTML = books[i].price + " ₽"; 
  newBook.querySelector('.card__img').src = 'img/' + books[i].uri + '.jpg'; 
  newBook.querySelector('.card__img').alt = books[i].name;
  newBook.querySelector('.card__inner').href = '#' + books[i].uri; 
  newBook.querySelector('.card__inner').dataset.id = books[i].uri; 
  fragment.appendChild(newBook); 
}; 

document.querySelector('.catalog__books-list').appendChild(fragment);


//Modal
    // Версия 1///

  // const closeBtnPopup = document.querySelector(".modal__close");
  // const closePopupAround = document.querySelector(".modal");
  // const page = document.querySelector(".page"); 
  // const cardLink = document.querySelectorAll(".catalog__books-list");
  // const modal = document.getElementById("modal-book-view");

  // for (let i = 0; i < books.length; i++) {
  //   cardLink[i].addEventListener('click', openModal)
  //   break
  // };

  // closePopupAround.addEventListener('click',function(e) {
  //   if (e.target === closePopupAround) {
  //     closeModal();
  //   }
  // });
  // closeBtnPopup.addEventListener('click', closeModal);

  // function openModal() {
  //   page.classList.toggle("js-modal-open");
  //   modal.classList.toggle("modal--open");
    
  //   const modalFragment = document.createDocumentFragment();
  //   const modalCard = document.querySelector('.card').cloneNode(true);

  //   modalCard.querySelector('.product__title').innerHTML = books[i].name;
  //   modalCard.querySelector('.btn--price').innerHTML = books[i].price + " ₽"; 
  //   modalCard.querySelector('.product__img').src = 'img/' + books[i].uri + '.jpg';
  //   modalCard.querySelector('.product__img').alt =  books[i].name;
  //   modalCard.querySelector('.product__author').innerHTML = books[i].author;

  //   document.querySelector('.page__content').appendChild(modalFragment);

  // };

  // function closeModal() {
  //   page.classList.remove("js-modal-open");
  //   modal.classList.remove("modal--open");
  // };
  // });



  // const modalBtn = document.querySelector('.modal__close');
  // // const modal = document.querySelector('.modal');
  // // const HTML = document.querySelector('html');
  // document.querySelector('.catalog__books-list').addEventListener('click', function (e) {
  //   e.preventDefault();
  //   let target = e.target;
  //   while (target !== this) {
  //     if (target.className == 'card__inner'){
        
        // console.log('click on link', target.dataset.id) 
  //       // обойти массив букс в поисках нужной книги по target.dataset.id
  //       // сформировать разметку попапа и показать его
  //       for (let i=0; i < books.length; i++) {
  //         if (books[i].uri == target.dataset.id) {
  //           const modalFragment = document.createDocumentFragment();
  //           const modalTemplate = document.querySelector('#modal__card');
  //           const modalCard = modalTemplate.content.cloneNode(true);

  //           modalCard.querySelector('.product__title').innerHTML = books[i].name;
  //           modalCard.querySelector('.btn--price').innerHTML = books[i].price + " ₽"; 
  //           modalCard.querySelector('.product__img').src = 'img/' + books[i].uri + '.jpg';
  //           modalCard.querySelector('.product__img').alt =  books[i].name;
  //           modalCard.querySelector('.product__author').innerHTML = books[i].author;

  //           document.querySelector('.page__content').appendChild(modalFragment);
  //           document.querySelector('html').classList.add('js-modal-open');
  //           document.querySelector('.modal').classList.add('modal--open');
  //           break;
  //         }

  //       };
  //       return;
  //     }
  //     target = target.parentNode;
  //   }

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


function ready (fn) {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
 });