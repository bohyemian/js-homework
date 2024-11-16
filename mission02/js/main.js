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
    const { value, type } = target;
    const input = inputForm[type];

    input.value = value;
    input.isValid = input.validation(input.value);

    if (input.isValid) {
      target.classList.remove('is--invalid');
    }
  }

  function getValid() {
    const { isValid: emailValid } = inputForm.email;
    const { isValid: pwValid } = inputForm.password;

    return { emailValid, pwValid };
  }

  function acountValueMath(callback) {
    setTimeout(() => {
      return callback(inputForm.email.value === user.id && inputForm.password.value === user.pw);
    }, parseInt(Math.random() * 1000));
  }

  return { validation, getValid, acountValueMath };
}

function formValidation(e) {
  const { emailValid, pwValid } = getValid();

  e.preventDefault();

  if (!emailValid) {
    inputEmail.classList.add('is--invalid');
  }
  if (!pwValid) {
    inputPassword.classList.add('is--invalid');
  }

  if (emailValid && pwValid) {
    acountValueMath(success);
  }
}

function success(result) {
  if (result) {
    window.location.href = 'welcome.html';
  } else {
    alert('아이디와 비밀번호를 확인해주세요.');
  }
}

const inputEmail = getNode('#userEmail');
const inputPassword = getNode('#userPassword');
const submitBtn = getNode('button.btn-login[type=submit]');
const { getValid, validation, acountValueMath } = setInputValidation();

inputEmail.addEventListener('input', validation);
inputPassword.addEventListener('input', validation);
submitBtn.addEventListener('click', formValidation);
