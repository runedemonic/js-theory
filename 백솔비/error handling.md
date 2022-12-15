## 'try..catch'와 에러 핸들링

에러는 실수, 예상치 못한 사용자 입력, 잘못된 서버 응답 등 수천만 가지 이유로 생각남

에러가 발생하면 스크립트는 중단되고, 콘솔에 에러 출력

그러나 try...catch 문법을 사용하면 스크립트 중단을 방지하고 에러를 이용해 합당한 일을 할 수 있음

### ‘try…catch’ 문법

```js
try {
  // 코드
} catch (err) {
  // 에러 핸들링
}
```

### ‘try…catch’ 동작 알고리즘

1. 먼저 try {...} 안의 코드 실행
2. 에러가 없다면, try 안의 마지막 줄까지 실행
3. 에러가 있다면 try 안 코드 실행 중단, catch 블록으로 흐름 넘어감

### 동작 예외

- 오직 런타임 에러에만 동작 (문법적으로 잘못된 경우 try...catch 동작하지 않음)
- 동기적으로 동작 (setTimeout과 같은 코드에서 발생한 예외는 잡아낼 수 없음)

### 에러 객체

에러가 발생하면 에러 상세 내용이 담긴 객체 생성함.

그 후, catch 블록에 이 객체를 인수로 전달

- message : 사람이 읽을 수 있는 형태의 에러 메시지
- name : 에러 이름을 담은 문자열 (에러 생성자 이름)
- stack : 에러가 발생한 순간의 스택을 나타냄

### ‘throw’ 연산자

throw 연산자는 에러를 생성

어떤 것이든 에러 객체로 사용할 수 있지만, 내장 에러와의 호환을 위해 되도록 name과 message 프로퍼티 사용을 권장

```js
throw <error object>
```

### 에러 다시 던지기

1. catch가 모든 에러를 받음
2. catch(err){} 블록 안에서 에러 객체인 err 분석
3. 에러 처리 방법을 알지 못하면 throw err

```js
function readData() {
  let json = '{ "age": 30 }';

  try {
    // ...
    blabla(); // 에러!
  } catch (e) {
    // ...
    if (!(e instanceof SyntaxError)) {
      throw e; // 알 수 없는 에러 다시 던지기
    }
  }
}

try {
  readData();
} catch (e) {
  alert('External catch got: ' + e); // 예상치 못한 에러를 잡음
}
```

readData는 SyntaxError만 처리, 함수 바깥의 try...catch에서 예상치 못한 에러를 처리

### try…catch…finally

finally 절은 무언가를 실행하고, 실행 결과에 상관없이 실행을 완료하고 싶을 경우 사용

finally안의 코드는 다음과 같은 상황에서 실행

- 에러 없는 경우: try 실행이 끝난 후
- 에러 있는 경우: catch 실행이 끝난 후

```js
try {
  //코드를 실행
} catch (e) {
  //에러 핸들링
} finally {
  //항상 실행
}
```

## 커스텀 에러와 에러 확장

커스텀 클래스는 error나 다른 내장 에러 클래스를 상속받아 만들 수 있음

### 에러 확장하기

사용자의 이름과 나이를 받는 json이 있다고 가정하자

```js
let json = `{ "name": "John", "age": 30 }`;
```

만약 잘못된 형식의 json이 들어오면 SyntaxError가 발생
그러나 인수로 받은 데이터가 json 형태이지만 필수적으로 필요한 name이나 age가 누락 됐을 수 있음
이 경우는 SyntaxError가 아니기 때문에 이에 맞는 커스텀 에러를 만들어야 함
위 에러를 잡는 ValidationError를 만들어보자

```js
// 자바스크립트 자체 내장 에러 클래스 Error의 '슈도 코드'
class Error {
  constructor(message) {
    this.message = message;
    this.name = "Error"; // name은 내장 에러 클래스마다 다름
    this.stack = <call stack>;
  }
}
```

내장 클래스 Error를 상속받아 ValidationError 클래스를 만들자

```js
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

function test() {
  throw new ValidationError('에러 발생!');
}

try {
  test();
} catch (err) {
  alert(err.message); // 에러 발생!
  alert(err.name); // ValidationError
  alert(err.stack); // 각 행 번호가 있는 중첩된 호출들의 목록
}
```

그런데 에러 유형 확인은 err.name보다는 instanceof를 사용하길 권장
instanceof은 새로운 상속 클래스에서 동작하기 때문

### 예외 감싸기

> 예외 처리 기술

예외 감싸기를 적용한 함수에서는 모든 에러를 종류별로 처리하지 않음

모든 에러를 포함할 수 있는 추상 에러를 하나 만들고, 에러 발생 시 추상 에러를 던짐
