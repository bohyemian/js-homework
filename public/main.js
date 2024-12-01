import Swiper from 'swiper';
import 'swiper/css';

const swiper = new Swiper('.swiper', {
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const emoji = document.querySelector('.emoji-tiger');

function handleAddCount() {
  let count = 0;

  return function () {
    this.children[0].style.paddingRight = '20px';

    if (count <= 36) {
      this.children[0].textContent = count++;
    }
  };
}

emoji.addEventListener('click', handleAddCount());
