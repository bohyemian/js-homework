function getValueAtObject(obj, key) {
  if (obj instanceof Object && !Array.isArray(obj) && obj !== null) {
    if (Object.hasOwn(obj, key)) {
      return obj[key];
    } else {
      console.error(`객체에 key ${key}가/이 없습니다. 🙅‍♀️`, obj);
      return 'Error !';
    }
  } else {
    if (Array.isArray(obj)) {
      console.error('🙅‍♀️ 배열을 넣으셨네요.');
    } else if (obj === null) {
      console.error(`null은 객체가 아닙니다. 🙅‍♀️`);
    } else {
      console.error(`${typeof obj}은/는 객체가 아닙니다. 🙅‍♀️`);
    }

    return 'Error !';
  }
}

function getNumberAtArray(arr, index) {
  if (Array.isArray(arr)) {
    if (index < 0) {
      console.error(`입력한 index 값: ${index} | 0보다 큰 수를 입력해 주세요.`);
      return 'Error !';
    } else if (index >= arr.length) {
      console.error(`입력한 index 값: ${index} | 배열의 요소는 ${arr.length}개 입니다. 0부터 ${arr.length - 1} 이내의 숫자를 입력해 주세요.`);
      return 'Error !';
    } else {
      return arr[index];
    }
  } else {
    console.error('배열이 아닙니다. 🙅‍♀️');
    return 'Error !';
  }
}

const person = {
  name: 'Alice',
  age: 25,
  city: 'Wonderland',
};
const numbers = [10, 20, 30, 40, 50];

console.log('--------------------------------');
console.log(getValueAtObject(person, 'name')); // 'Alice'
console.log(getValueAtObject(person, 'age')); // 25
console.log(getValueAtObject(person, 'city')); // 'Wonderland'
console.log(getValueAtObject(person, 'country')); // Error !
console.log(getValueAtObject(numbers, 'country')); // Error !
console.log(getValueAtObject('안녕하세요', 'country')); // Error !
console.log(getValueAtObject(12345, 'country')); // Error !
console.log(getValueAtObject(12345n, 'country')); // Error !
console.log(getValueAtObject(true, 'country')); // Error !
console.log(getValueAtObject(undefined, 'country')); // Error !
console.log(getValueAtObject(null, 'country')); // Error !

console.log('--------------------------------');
console.log(getNumberAtArray(numbers, 2)); // 30
console.log(getNumberAtArray(numbers, 4)); // 50
console.log(getNumberAtArray(numbers, 5)); // Error!
console.log(getNumberAtArray(numbers, -1)); // Error!
console.log(getNumberAtArray(person, 2)); // Error !
