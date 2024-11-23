import { addClass, getNode, getNodes, removeClass, setAttr } from './../../lib/index.js';
import { data } from './data.js';

/*
1. 클릭 이벤트 활성화
2. nav 클릭시 배경 색상 변경
3. 이미지 변경
4. 텍스트 변경
5. 함수 분리
*/

/* global AudioPlayer */

const nav = document.querySelector('.nav');
const status = 200;

new Promise((resolve, reject) => {
  if (status >= 200 && status < 400) {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  } else {
    reject({ message: '데이터 통신이 원활하지 않습니다.' });
  }
})
  .then((res) => {
    nav.data = res;
  })
  .catch((err) => {
    throw new Error(err.message);
  });

function createAudio() {
  const characterImg = getNodes('.nav li img');

  if (!characterImg.length) return;

  return new Promise((resolve) => {
    const audio = [...characterImg].map((character) => {
      const name = character.src.split('/').at(-1).split('.')[0];
      const url = `./assets/audio/${name}.m4a`;

      return new AudioPlayer(url);
    });

    resolve(audio);
  });
}

function setTextContent(target, txt) {
  if (typeof target === 'string') target = getNode(target);

  if (typeof txt === 'string') {
    target.textContent = txt;
  }
}

function handleVisualChange(e) {
  const nickName = getNode('.nickName');
  const visual = getNode('.visual img');
  const nav = this;
  const navLi = nav.querySelectorAll('li');
  const targetLi = e.target.closest('li');

  if (!targetLi) return;

  // const targetImg = e.target.nodeName === 'IMG' ? e.target : getNode('img', e.target);
  const targetImg = e.target.nodeName === 'IMG' ? e.target : e.target.querySelector('img');
  const index = targetLi.dataset.index - 1;

  navLi.forEach((li) => removeClass(li, 'is-active'));
  addClass(targetLi, 'is-active');
  setAttr(visual, 'src', targetImg.src);
  setAttr(visual, 'alt', targetImg.alt);

  if (nav.data) {
    const body = getNode('body');
    const { color, name, alt } = nav.data[index];

    setTextContent(nickName, name);
    setAttr(visual, 'alt', alt);
    setAttr(body, 'style', `background-image: linear-gradient(to bottom, ${color[0]}, ${color[1]})`);
  }

  if (nav.audioList) {
    const audio = nav.audioList[index];
    nav.audioList.forEach((audio) => audio.stop());
    audio.play();
  }
}

createAudio().then((res) => {
  nav.audioList = res;
});

nav.addEventListener('click', handleVisualChange);
