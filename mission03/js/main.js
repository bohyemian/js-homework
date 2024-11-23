import { getNode, getNodes } from './../../lib/index.js';
import { data } from './index.js';

/*
1. 클릭 이벤트 활성화
2. nav 클릭시 배경 색상 변경
3. 이미지 변경
4. 텍스트 변경
5. 함수 분리
*/

const nav = document.querySelector('.nav');
const status = 200;

const getDataArray = new Promise((resolve, reject) => {
  if (status >= 200 && status < 400) {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  } else {
    reject({ message: '데이터 통신이 원활하지 않습니다.' });
  }
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    throw new Error(err.message);
  });

function removeClass(target) {
  target.classList.remove('is-active');
}

function changeHeading(target, txt) {
  if (typeof target === 'string') target = getNode(target);

  target.textcontent = txt;
}

function changeImage(target, url, alt) {
  if (typeof target === 'string') target = getNode(target);

  target.src = url;
  target.alt = alt;
}

function handleVisualChange(e) {
  const nav = e.target.closest('.nav');
  const navLi = nav.querySelectorAll('li');
  const targetLi = e.target.closest('li');

  if (!targetLi) return;

  const targetImg = getNode('img');
  const index = targetLi.dataset.index;

  navLi.forEach(removeClass);
  targetLi.classList.add('is-active');
  changeImage('.visual img', targetImg.src, targetImg.alt);
}

nav.addEventListener('click', handleVisualChange);
