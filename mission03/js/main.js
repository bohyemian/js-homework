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

const nav = getNode('.nav');
const btnAudio = getNode('.btn-audio-paly');
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

function setNameText(target, txt) {
  if (typeof target === 'string') target = getNode(target);

  if (typeof txt === 'string') {
    target.textContent = txt;
  }
}

function setImage(target, url, alt) {
  if (url !== 'undefiend') setAttr(target, 'src', url);
  if (alt !== 'undefiend') setAttr(target, 'alt', alt);
}

function setBgColor(target, ...color) {
  if (!color.length) return;
  if (typeof target === 'string') target = getNode(target);

  [color] = color;

  if (typeof color === 'string') {
    setAttr(target, 'style', `background-color: ${color}`);
  } else if (color.length >= 2) {
    setAttr(target, 'style', `background-image: linear-gradient(to bottom, ${color[0]}, ${color[1]})`);
  }
}

function handleVisualChange(e) {
  const nickName = getNode('.nickName');
  const btnSound = getNode('.btn-audio-paly');
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

  if (nav.data) {
    const body = getNode('body');
    const { color, name, alt } = nav.data[index];

    setNameText(nickName, name);
    setAttr(btnSound, 'data-active', index);
    setImage(visual, `./assets/${name}.jpeg`, alt);
    setBgColor(body, color);

    return;
  }

  setNameText(nickName, String(targetImg.src.split('/').at(-1).split('.')[0]).toUpperCase());
  setImage(visual, targetImg.src, targetImg.alt);
}

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

function handleSoundPlay(e) {
  const index = +e.currentTarget.dataset.active || 0;
  const { audioList } = nav;

  if (audioList) {
    audioList.forEach((audio) => audio.stop());
    audioList[index].play();
  }
}

createAudio().then((res) => (nav.audioList = res));

btnAudio.addEventListener('click', handleSoundPlay);
nav.addEventListener('click', handleVisualChange);
