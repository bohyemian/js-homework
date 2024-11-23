# 포스터 교체🔥

## data 요청

서버에서 통신하여 data를 받아온다고 가정하여, 받아온 결과를 `Promise` 객체에서 resolve의 인수로 넘겨 `.then()` 절에서 받아 처리하였다.  
이벤트 핸들러 내에 data에 접근할 방법을 찾아야 했다. 이벤트 핸들러의 첫번째 인수에는 이벤트 객체가 담겨서 두번째 인수로 넘길까 하다가, 함수를 한번 더 쪼개고 복잡해질 것 같았다.  
**Compound Pattern**에서 객체의 프로퍼티로 등록했던 것이 떠올랐고, 받아온 데이터를 이벤트 핸들러의 대상이 되는 요소에 data 속성으로 넣어 주었다.

```javascript
const nav = getNode('.nav');

then((res) => {
  nav.data = res;
});

nav.addEventListener('click', handleVisualChange);
```

## 이벤트 위임

`nav.nav > ul> li > img` 구조에서 `.nav`를 선택자로 이벤트를 한번 바인딩하여 이벤트 동작의 버블링을 활용한 이벤트 위임을 적용하여 성능 최적화 하였다.

조건문을 사용하여 `nav.data` data 속성이 undefined가 아닌 경우 data의 값을 사용하여 변경할 수 있도록 했고,  
data가 없더라도 클릭 시 이미지와 alt값, 타이틀의 텍스트가 변경될 수 있도록 했다.

## 오디오 재생

`.map()`을 사용하여 AudioPlayer의 인스턴스 목록을 반환하도록 했는데, 콘손로 찍어보니 undefined가 나왔다.
작업을 처리하는데 시간이 소요되는 것 같아서 Promise를 사용하여 처리가 끝나면 결과를 받아, `nav.data` 속성으로 등록한 것처럼 `nav.audioList` 속성으로 넣어 주었다.

```javascript
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

createAudio().then((res) => (nav.audioList = res));
```

이미지를 클릭할 때 `li`의 `data-index` 값을 재생 버튼의 `data-active` 속성으로 주어 재생 버튼 클릭 시,  
`nav.audioList`의 `data-active`번째 오디오 인스턴스가 재생될 수 있도록 했다.

```javascript
function handleSoundPlay(e) {
  const index = +e.currentTarget.dataset.active || 0;
  const { audioList } = nav;

  if (audioList) {
    audioList.forEach((audio) => audio.stop());
    audioList[index].play();
  }
}

btnAudio.addEventListener('click', handleSoundPlay);
```

## 결과

<img src="https://bohyemian.github.io/js-homework/mission03/README/mission03.webp">

## 문제점

- background 색상이 변경될 때 transition 속성이 있음에도 적용이 되지 않았다.
- `handleVisualChange` 함수에서 nav 내의 모든 li를 노드로 선택하기 위해 `getNodes('li', nav)`로 작성했는데 에러가 나서 선택자가 짝짝이가 되었다. 😭

```javascript
const nav = this;
const navLi = nav.querySelectorAll('li');

// const targetImg = e.target.nodeName === 'IMG' ? e.target : getNode('img', e.target);
const targetImg = e.target.nodeName === 'IMG' ? e.target : e.target.querySelector('img');
```

## 마치며

오디오 재생/정지까지 구현하고 싶었는데 이번에도 생각보다 작업시간이 오래 걸렸다. 🥹  
오디오 인스턴스를 만드는 함수도 공통으로 사용할 수 있도록 수정이 필요해 보인다.

이벤트 위임으로 요소를 선택할 때 생각처럼 되지 않는 부분도 있어서 왜 그런지 찾아봐야 될 것 같다.  
이벤트가 바인딩되는 요소에 받아온 데이터와 오디오 인스턴스를 프로퍼티로 등록했는데, 이렇게 해도 괜찮은지..🤔  
다른 방법을 더 찾아봤어야 하는지, 다른 사람들은 어떻게 처리하는지도 찾아봐야겠다.
