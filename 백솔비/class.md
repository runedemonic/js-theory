## 클래스와 기본 문법

### 클래스란?

객체 지향 프로그래밍에서 사용

특정 객체를 생성할 때 변수와 메소드를 정의하는 틀

클래스를 사용하면 객체 지향 프로그래밍에서 사용하는 다양한 기능 사용 가능

- 기본 문법

```js
class Test {
  constructor() {}

  method() {}
}
```

New Test()를 호출하면 객체 생성

constructor는 객체의 기본 상태를 설정해줌

new에 의해 자동 호출, 따라서 객체 초기화 가능

### 클래스 표현식

> 다른 표현식 내부에서 정의, 전달, 반환, 할당 가능

```js
let User = class {
  sayHi(){
    alert(‘hi’)
  };
};
```

클래스 표현식에도 이름을 붙일 수 있음

다만, 이 이름은 클래스 내부에서만 사용 가능

```js
let User = class MyName {
  sayHi() {
    alert(MyName);
  }
};
```

### 클래스 필드

어떤 종류의 프로퍼티도 클래스 추가 가능

클래스를 정의할 때 <프로퍼티 이름> = <값> 을 써주면 클래스 필드 만들 수 있음

클래스 필드는 개별 객체에만 설정

```js
class User {
  name = '홍길동';
}

let user = new User();
```

### 클래스 필드로 바인딩 된 메서드 만들기

JavaScript에서 this는 동적으로 결정

객체 메서드를 여기저기 전달해 전혀 다른 컨텍스트에서 호출하면 this가 원하는 대로 나오지 않음

this의 컨텍스트를 알 수 없게 되는 문제를 '잃어버린 this'라고 함

메서드를 객체에 바인딩하면 해결할 수 있음

## 클래스 상속

### 클래스 상속

클래스 상속을 통해 클래스를 다른 클래스로 확장 가능

```js
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    alert(`${this.name} 은/는 속도 ${this.speed}로 달립니다.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} 이/가 멈췄습니다.`);
  }
}

let animal = new Animal(“동물”);
```

토끼는 동물이므로 위 class에 해당하는 일반적인 행동을 수행 가능함

따라서 위 class를 상속하여 클래스 확장할 수 있음

```js
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} 이/가 숨었습니다!`);
  }
}

let rabbit = new Rabbit('흰 토끼');

rabbit.run(5); // 흰 토끼 은/는 속도 5로 달립니다.
rabbit.hide(); // 흰 토끼 이/가 숨었습니다!
```

### 메서드 오버라이딩

rabbit에서 메서드를 자체 정의하면, 상속받은 메서드가 아닌 자체 메서드 사용

```js
class Rabbit extends Animal {
  stop() {
    // rabbit.stop()을 호출할 때
    // Animal의 stop()이 아닌, 이 메서드가 사용
  }
}
```

전체를 교체하지 않고 부모 메서드를 토대로 일부만 변경하고 싶은 경우가 생긴다.

이때 커스텀 메서드를 만들어 작업한다.

이 과정 전 후에 부모 메서드를 호출하고 싶을 때가 있는데 super를 사용한다.

super.method()는 부모 클래스에 정의된 메서드를 호출

super()는 부모 생성자 호출(자식 생성자 내부에만 사용 가능)

### 생성자 오버라이딩

클래스가 다른 클래스를 상속 받았는데 constructor가 없는 경우 비어있는 constructor가 만들어짐

상속 클래스의 생성자에선 반드시 super를 호출해야 함

super()는 this를 사용하기 전에 반드시 호출

원래는 일반 클래스가 new와 함께 실행되면 빈 객체가 만들어지고 this에 이 객체를 할당함

반면에 상속 클래스의 생성자 함수가 실행되면, 빈 객체를 만들고 this에 이 객체를 할당하는 일을 부모 클래스의 생성자가 처리해주길 기대함

따라서 상속 클래스의 생성자에선 super를 호출해 부모 생성자를 실행해주어야 함

## 정적 메서드와 정적 프로퍼티

### 정적 메서드와 정적 프로퍼티

클래스 함수 자체에 메서드를 설정할 수 있는데 이를 정적 메서드라 부름

클래스 안에서 static 키워드를 붙여 만들 수 있음

```js
class User {
  static staticMethod() {
    alert(this === User);
  }
}

User.staticMethod(); // true
```

정적 메서드는 특정 클래스 인스턴스가 아닌 클래스 ‘전체’에 필요한 기능을 만들 때 사용 가능

상속 가능

## private, protected 프로퍼티와 메서드

객체 지향 프로그래밍에서는 '내부 인터페이스와 외부 인터페이스'를 구분 지을 수 있어야 함

### 실생활 예제

커피 머신을 예로 들었을 때, 커피 머신의 내부를 알지 못해도 사용하는데 무리 없음

모든 세부 요소들이 기계 내부에 잘 정리되어 있고 숨겨져 있기 때문

만약 보호 커버를 제거한다면 사용법이 복잡하고 위험한 상황이 생길 수 있음

프로그래밍에서는 보호 커버 대신 특별한 문법과 컨벤션 사용으로 안쪽 내부 사항을 숨김

### 내부 인터페이스와 외부 인터페이스

- 내부 인터페이스 : 동일한 클래스 내의 다른 메서드에선 접근 가능. 클래스 밖에선 접근 할 수 없는 프로퍼티와 메서드
- 외부 인터페이스 : 클래스 밖에서도 접근 가능한 프로퍼티와 메서드

<br />

- public: 어디서든지 접근 가능하며 외부 인터페이스 구성
- private: 클래스 내부에서만 접근 가능. 내부 인터페이스 구성

### private 프로퍼티

private 필드는 클래스 외부나 자손 클래스에서 접근할 수 없음

private 프로퍼티와 메서드는 #으로 시작

#이 붙으면 클래스 안에서만 접근

## 'instanceof'로 클래스 확인하기

### instanceof 연산자

```js
obj instanceof Class;
```

obj가 Class에 속하거나 상속받으면 true 반환

```js
class Rabbit {}
let rabbit = new Rabbit();

alert(rabbit instanceof Rabbit);
```

클래스가 아닌 생성자 함수에도 사용 가능

```js
function Rabbit() {}

alert(new Rabbit() instanceof Rabbit);
```

```js
let arr = [1, 2, 3];
alert(arr instanceof Array);
alert(arr instanceof Object);
```

내장 클래스에도 사용 가능
