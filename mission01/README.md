# javascript 첫번째 과제

## 문제 1

객체에서 특정 키의 값을 안전하게 가져오는 함수를 작성하세요.

객체와 키를 인수로 받아, 객체에 해당 키가 존재하면 그 키에 해당하는 값을 반환하고, 존재하지 않으면 에러를 발생시키는 함수를 작성하세요.

```javascript
function getValueAtObject(obj, key) {
  if (obj instanceof Object && !Array.isArray(obj)) {
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

## 문제 2

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
