# 네이버 로그인 페이지 구현

---

아이디와 비밀번호를 정확히 입력했을 때 welcome 페이지로 넘어갈 수 있도록 코드 로직을 작성합니다

---

- [x] 재사용 가능한 함수를 분리하고 함수를 중심으로 설계하는 방법에 대해 학습합니다.

## 코드 설계

요구사항에서 `아이디와 비밀번호를 정확히 입력했을 때`를 구현하는 것에서 시작했다.  
`입력했을 때` 입력한 값과 그 값이 `값의 조건 범위` 안에 드는지 확인한 결과를 담을 변수가 필요하다는 생각을 했다.  
<u>입력할 때마다</u> 변하는 값을 가져오기 위해 input 요소의 `input event`에 함수를 바인딩했다.

EventTarget의 `addEventListener()` 메서드의 두번째 인자 `listener`에 이벤트 객체가 넘어오기 때문에 **이벤트 객체의 타겟의 값**을 가져올 수 있다.

값을 가져와서 변수에 저장하는 것까지는 구현을 했지만 `addEventListener()`는 값을 반환하지 않는다.  
로그인 버튼을 눌렀을 때 저장된 input의 값과 user의 값을 비교해야 하는데,  
 `addEventListener()`에 바인딩 된 함수가 종료되면 함수의 컨텍스트가 사라지기 때문에 내부에 저장된 값을 유지하기 위해 수정이 필요했다.

클로저의 개념을 떠올렸고, 처음엔 이벤트 핸들러에서 함수를 return 시켜봤는데 undefined가 반환되어 MDN 문서를 찾아보니  
`addEventListener()` 메서드는 반환값이 없었다.  
그렇다면 이미 <u>클로저가 형성</u>되어 함수 내부의 값을 알 수 있는 함수가 이벤트 핸들러가 되어야 했다.

### 아이디와 비밀번호 각각의 렉시컬 환경을 구성하기 위한 클로저 형성

```javascript
function setInputValidation() {
  let value;

  function getValue(e) {
    value = e.target.value;
  }

  return getValue;
}
```

[코드 히스토리](https://github.com/bohyemian/js-homework/blob/2be872611f0b74d2aa907c933c22b737b7c1a571/mission02/js/main.js)

위와 같은 코드로 클로저를 형성시킨 후 return 된 함수 getValue를 이벤트 핸들러로 실행하였다.

```javascript
const { validation: checkEmailValid, getValue: getEmailValue } = setInputValidation();
const { validation: checkPwValid, getValue: getPwValue } = setInputValidation();

inputEmail.addEventListener('input', getEmailValue);
inputPassword.addEventListener('input', getPwValue);
```

각각의 값을 기억하는 환경은 만들었지만 입력 폼이 아이디와 비밀번호 두개인데도 코드가 길어졌고,  
값의 validation 함수만 다를 뿐 나머지는 **중복**되고 있어서 매번 반환받은 함수의 이름을 다르게 지어야 하는 것이 비효율적이라고 느껴졌다.  
로그인 화면은 입력 폼이 몇개 안되지만 회원가입 화면같이 입력 폼이 훨씬 많아지면 매번 이름을 지어야 하고 코드 작성 시간이 길어질 것이라고 생각되어 수정이 필요해 보였다.

```javascript
function getCallback(input) {
  switch (input) {
    case 'email':
      return emailReg;
    case 'password':
      return pwReg;
  }
}
```

[코드 히스토리](https://github.com/bohyemian/js-homework/commit/fb382a16e074edb68bcad138a19a5731fe7dd4da)

반환하는 함수를 공통으로 사용하기 위해 `setInputValidation()` 함수 내부에 이벤트 핸들러에서 `target의 type`을 인수로 받아 콜백 함수를 반환하도록 수정했는데, 입력받은 값도 각각 저장하기 위해 수정이 필요했다.

```javascript
function setInputValidation() {
  const inputForm = {
    email: {
      value: null,
      isValid: false,
      inputValid: emailReg,
    },
    password: {
      value: null,
      isValid: false,
      inputValid: pwReg,
    },
  };

  function checkValid(inputType) {
    return inputForm[inputType].inputValid(inputForm[inputType].value);
  }

  function validation(e) {
    const input = e.target;
    const { value, type: inputType } = input;

    inputForm[inputType].value = value;
    inputForm[inputType].isValid = checkValid(inputType);

    if (inputForm[inputType].isValid) {
      input.classList.remove('is--invalid');
    }
  }
}
```

input 각각의 값 분리를 위해 `setInputValidation()` 함수 내에 inputForm 객체로 값과 상태를 저장하였다.  
콜백함수(getCallback)를 return 하는 함수 대신 객체 내부에 메서드로 호출할 수 있도록 수정했다.  
이벤트 핸들러의 이름도 getValue(e)에서 validation(e)로 변경했다.  
값이 바뀔 때마다 바뀐 값을 저장하고, 값이 유효한 범위인지 체크 후 `'is--invalid'` 클래스를 제어하여 사용자에게 알려주었다.

`inputForm[inputType]`가 중복되고 있어서 변수에 담으니 코드가 간결하고 가독성이 높아졌다. ✨

```javascript
function setInputValidation() {
  const inputForm = {
    email: {
      value: null,
      isValid: false,
      validation: emailReg,
    },
    password: {
      value: null,
      isValid: false,
      validation: pwReg,
    },
  };

  function validation(e) {
    const target = e.target;
    const { value, type: inputType } = target;
    const input = inputForm[inputType];

    input.value = value;
    input.isValid = input.validation(input.value);

    if (input.isValid) {
      target.classList.remove('is--invalid');
    }
  }
}
```

[코드 히스토리](https://github.com/bohyemian/js-homework/blob/030a046be1930b676cd4576b0e19c857ff752c65/mission02/js/main.js)

### 서버에 요청

> 아이디와 비밀번호를 정확히 입력했을 때 welcome 페이지로 넘어갈 수 있도록 코드 로직을 작성합니다.

이제 요구사항에서 `정확히 입력했을 때` `welcome 페이지로 넘어갈 수 있도록` 부분이 남았다.

로그인 버튼의 이벤트 핸들러로 `formValidation()` 함수가 실행 되도록 했다.  
`setInputValidation()` 함수의 클로저 환경인 `getValid()` 함수를 return 했고,  
`getValid()` 함수는 아이디와 비밀번호의 유효성 검사 결과를 반환하고 있다.  
아이디와 비밀번호 유효성 검사가 각각 true일 때 user의 정보(DB)와 비교하여 일치하면 welcome 페이지로 이동, 그 외의 경우 alert 창을 띄우도록 했다.

로그인 버튼을 누르면 아이디와 비밀번호를 user의 정보와 일치하는지 서버에 요청하는 것을 임의로 `acountValueMath(callback)` 함수로 구현하였다.

```javascript
function acountValueMath(callback) {
  setTimeout(() => {
    return callback(inputForm.email.value === user.id && inputForm.password.value === user.pw);
  }, parseInt(Math.random() * 1000));
}

return { validation, getValid, acountValueMath };
```

클로저 환경으로 보호한 아이디, 비밀번호 값을 내보낼 수 없어서 `acountValueMath(callback)` 함수의 위치를  
`setInputValidation()` 함수 내부에 작성하였다.  
서버와 통신하는 시간을 임의로 구현하기 위해 webAPI setTimeout을 이용해 1초 이내의 시간을 랜덤으로 발생시켰다.  
서버에 요청한 결과를 콜백 함수로 전달하여, 콜백 함수 내부에서 일치 여부에 따라 액션을 분기하였다.

```javascript
function success(result) {
  if (result) {
    window.location.href = 'welcome.html';
  } else {
    alert('아이디와 비밀번호를 확인해주세요.');
  }
}
```

## 마치며..

학습의 목적인 `재사용 가능한 함수 분리`, `함수를 중심으로 설계` 하는 것이 익숙하지 않아서 코드를 어디서부터 시작해야 할지 막막했다.  
클로저도 수업을 들을 때는 ‘생각보다 어렵지 않네’ 라고 생각했는데 막상 코드를 짜려고 보니 막막함이 컸다.  
함수의 이름을 짓는 것도 고민이 많이 되었고, 하나의 함수가 많은 기능을 하지 않아야 하는데 적절하게 쪼개졌는지에 대한 부분도 고민이 더 필요해 보였다.  
함수가 늘어날 때마다 내가 짠 코드임에도 분석하고 함수를 따라가기 바빴지기도 했다. 🥹

입력 폼이 더 많고 중복됐을 때 값을 어떻게 처리할 지에 대한 부분도 수정이 필요해서, 로그인 화면을 위한 하드코딩인 느낌도 들었다.

<img src="https://bohyemian.github.io/js-homework/mission02/README/misson2.jpg">

코드를 작성하기 전에 머리속에 중구난방 떠오르는 것들을 정리해보고 나름대로 설계를 하고 그것을 코드로 옮기는 작업이 도움이 많이 되었다.
계획한 대로 구현이 되었을 때 느꼈던 성취감도 기억에 남는다. 텅텅 빈 백지를 받았을 때의 막막함을 어떻게 채워나가야 하는지 조금은 연습이 된 것 같다.
