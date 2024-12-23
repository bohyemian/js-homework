const user = {
  id:'asd@naver.com',
  pw:'spdlqj123!@'
}
const emailInput = document.querySelector('#userEmail');
const pwInput = document.querySelector('#userPassword');
const loginButton = document.querySelector('.btn-login');

let emailPass = false;
let pwPass = false;

// @ 기호 포함, .포함 이후 2글자 이상
function emailReg(text){
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(text).toLowerCase())
}
// 최소 6글자 이상, 0~9숫자 1개 이상 포함, 특수기호 1개 이상 포함
function pwReg(text){
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text).toLowerCase());
}

function handleCheckEmail(){
  const value = this.value;
  
  console.log( value );

  if(emailReg(value)){
    this.classList.remove('is--invalid');
    emailPass = true;
    
  }else{
    this.classList.add('is--invalid');
    emailPass = false;
  }
}

function handleCheckPw(){
  const value = this.value;

  if(pwReg(value)){
    this.classList.remove('is--invalid');
    pwPass = true;
    
  }else{
    this.classList.add('is--invalid');
    pwPass = false;
  }
}

function handleLogin(e){
  e.preventDefault();

  if(emailPass && pwPass){

   try{
    const id = emailInput.value;
    const pw = pwInput.value;
    const getUserId = user.id // 1s
    const getUserPw = user.pw // 1s
  
    if(id === getUserId && pw === getUserPw){
      console.log('로그인 성공!');
      
    }else{
      throw new Error('...')
    }
   }
   catch{
    alert('아이디 또는 비밀번호가 일치하지 않습니다.');
   }
  }
  
  // console.log(id, pw);
}

function debounce(callback, limit = 500){
  let timeout;

  return function (e){
    clearTimeout(timeout);
    
    timeout = setTimeout(()=>{
      callback.call(this,e)
    },limit)
  }
}

emailInput.addEventListener('input',debounce(handleCheckEmail,1000));
pwInput.addEventListener('input',handleCheckPw);
loginButton.addEventListener('click',handleLogin);
