const user = {
  id: 'asd@naver.com',
  pw: 'spdlqj123!@',
};

/*

1. email 정규표현식을 사용한 validation
2. pw 정규표현식을 사용한 validation
3. 상태 변수 관리
4. 로그인 버튼을 클릭시 조건처리

*/

function emailReg(text) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(text).toLowerCase());
}

function pwReg(text) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text).toLowerCase());
}

function getNode(node) {
  if (typeof node === 'string') node = document.querySelector(node);
  if (node.nodeType === 1) {
    return node;
  } else {
    throw new TypeError(`${node}는 문자열이 아니거나 node가 아닙니다.`);
  }
}

function setInputValidation() {
  let value;
  let isValid = false;

  function getCallback(input) {
    switch (input) {
      case 'email':
        return emailReg;
      case 'password':
        return pwReg;
    }
  }

  function checkValid(callback) {
    return callback(value);
  }

  function validation(e) {
    value = e.target.value;
    isValid = checkValid(getCallback(e.target.type));

    if (isValid) {
      e.target.classList.remove('is--invalid');
    }
  }

  function getValid() {
    return isValid;
  }

  return { validation, getValid };
}

function submitForm(e) {
  if (!getEmailValid() || !getPwValid()) {
    if (!getEmailValid()) {
      inputEmail.classList.add('is--invalid');
    }

    if (!getPwValid()) {
      inputPassword.classList.add('is--invalid');
    }
  }
}

const inputEmail = getNode('#userEmail');
const inputPassword = getNode('#userPassword');
const submitBtn = getNode('button.btn-login[type=submit]');
const { getValid: getEmailValid, validation: getEmailValue } = setInputValidation();
const { getValid: getPwValid, validation: getPwValue } = setInputValidation();

inputEmail.addEventListener('input', getEmailValue);
inputPassword.addEventListener('input', getPwValue);
submitBtn.addEventListener('click', submitForm);
