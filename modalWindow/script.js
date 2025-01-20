'use strict';

const show = document.querySelectorAll('.show-modal');
const modal = document.querySelector('.modal');
const close = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');

const showModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const hideModal  = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

show.forEach(element => {
  element.addEventListener('click', () => {
    if (modal.classList.contains('hidden')) {
        showModal();
    }
  });
});
close.addEventListener('click', hideModal);
overlay.addEventListener('click', hideModal);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    hideModal();
  }
});
