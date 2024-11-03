# javascript 첫번째 과제

## 문제 1. `getValueAtObject(obj, key)`

객체에서 특정 키의 값을 안전하게 가져오는 함수를 작성하세요.

객체와 키를 인수로 받아, 객체에 해당 키가 존재하면 그 키에 해당하는 값을 반환하고, 존재하지 않으면 에러를 발생시키는 함수를 작성하세요.

```javascript
function getValueAtObject(obj, key) {
  if (obj instanceof Object && !Array.isArray(obj) && obj !== null) {
    if (Object.hasOwn(obj, key)) {
      return obj[key];
    } else {
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
```

객체의 키 값이 있는지 boolean 값을 return 해주는 메서드 [hasOwnProperty()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)를 찾아보니 `hasOwn()` 메서드의 사용을 권장했다.

찾아보니 hasOwnProperty는 생성한 객체의 메서드로 오버라이딩 할 수 있어서 hasOwnProperty 메서드가 제대로 동작하지 않을 수 있다는 것을 알게 되었다.

객체가 아닌 경우와 객체에 key가 없는 경우 에러를 반환하기 위해 먼저 obj가 객체일 때와 아닐 때를 조건문으로 분기했다.

`typeof` 연산자로는 `array`와 `null`도 object로 나오기 때문에 `isArray`와 `obj !== null` 조건으로 걸러냈다.

obj가 객체라면 `hasOwn()` 메서드의 인자로 객체와 key를 넣어 boolean 값을 반환하는 조건으로 true일 경우 obj[key]의 `value`를 반환하고 false인 경우 `'Error !'`를 반환하도록 했다.

obj가 객체가 아닌 경우는 else문으로 분기하여 'Error !'를 반환하도록 처리했다.
`typeof` 연산 시 `object`로 나오는 `array`와 `null`은 따로 조건문으로 분기하여 obj의 타입을 알려주었고 나머지 자료형들은 `typeof` 연산자로 자료형을 반환하였다.

## 문제 2. `getNumberAtArray(arr, index)`

배열에서 특정 인덱스의 값을 안전하게 가져오는 함수를 작성하세요.

배열과 인덱스를 인수로 받아, 인덱스가 배열의 유효한 범위 내에 있으면 그 인덱스에 해당하는 값을 반환하고, 유효하지 않은 인덱스일 경우 에러 메시지를 반환하는 함수를 작성하세요.

```javascript
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
```
