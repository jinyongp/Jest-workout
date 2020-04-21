# Jest Workout <!-- omit in toc -->

> [Jest 시작하기](https://mulder21c.github.io/jest/docs/en/next/getting-started)

## 목차 <!-- omit in toc -->

- [Getting started](#getting-started)
  - [yarn을 통해 Jest 설치하기](#yarn%ec%9d%84-%ed%86%b5%ed%95%b4-jest-%ec%84%a4%ec%b9%98%ed%95%98%ea%b8%b0)
  - [yarn 설정](#yarn-%ec%84%a4%ec%a0%95)
  - [추가 설정](#%ec%b6%94%ea%b0%80-%ec%84%a4%ec%a0%95)
- [Matcher 사용하기](#matcher-%ec%82%ac%ec%9a%a9%ed%95%98%ea%b8%b0)
  - [일반 Matcher](#%ec%9d%bc%eb%b0%98-matcher)
  - [Boolean](#boolean)
  - [숫자](#%ec%88%ab%ec%9e%90)
  - [문자열](#%eb%ac%b8%ec%9e%90%ec%97%b4)
  - [배열과 iterable](#%eb%b0%b0%ec%97%b4%ea%b3%bc-iterable)
  - [예외](#%ec%98%88%ec%99%b8)
- [비동기 코드 테스트](#%eb%b9%84%eb%8f%99%ea%b8%b0-%ec%bd%94%eb%93%9c-%ed%85%8c%ec%8a%a4%ed%8a%b8)
  - [Callbacks](#callbacks)
  - [Promises](#promises)
  - [`.resolves`/`.reject`](#resolvesreject)
  - [Async/Await](#asyncawait)

---

## Getting started

### yarn을 통해 Jest 설치하기

```bash
yarn add --dev jest
```

### yarn 설정

```bash
yarn init -y
```

`package.json`에 다음 내용을 추가

```json
{
  "name": "my-jest",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "devDependencies": {
    "jest": "^25.4.0"
  },
  "scripts": {
    "test": "jest --verbose"
  }
}
```

`yarn test` 명령어로 테스트를 수행한다.

### 추가 설정

`Babel`을 이용하고 싶다면 yarn을 통해 필수 의존성을 설치해야 한다.

```bash
yarn add --dev babel-jest @babel/core @babel/preset-env
```

프로젝트 루트에 `babel.config.js`을 생성하여 현재 노드 버전에 맞는 `Babel`을 설정한다.

```js
module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};
```

Jest용 Intellisense를 사용할 수 있다.

```bash
yarn add --dev @types/jest
```

## Matcher 사용하기

### 일반 Matcher

정확한 일치를 통해 값을 비교한다.

```js
test('2 + 2 = 4', () => {
  expect(2 + 2).toBe(4);
});
```

`toBe(4)`가 Matcher가 된다. `toBe`는 정확한 등가를 검사하기 위해 `Object.is`를 사용한다. 객체의 값을 비교하려면 `toEqual`을 사용해야 한다.

```js
it('object assignment', () => {
  const data = { one: 1 };
  data.two = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});
```

`toEqual`은 객체나 배열의 모든 필드를 재귀적으로 비교한다.

`not`을 통해 "다름"을 비교할 수도 있다.

```js
it('Adding positive numbers is not zero.', () => {
  for (let i = 1; i < 10; ++i) {
    for (let j = 1; j < 10; ++j) {
      expect(i + j).not.toBe(0);
    }
  }
});
```

### Boolean

`undefined`, `null`, `false`를 구별해야 할 필요가 있지만, 동일하게 다루고 싶을 때도 있다. `truthy`와 `falsy`를 이용할 수 있다.

- `toBeNull`은 `null`에만 일치한다.
- `toBeUndefined`는 `undefined`에만 일치한다.
- `toBeDefined`는 `toBeUndefined`의 반대이다.
- `toBeTruthy`는 `if` 구문이 `true`로 취급하는 모든 것과 일치한다.
- `toBeFalsy`는 `if` 구문이 `false`로 취급하는 모든 것과 일차한다.

### 숫자

```js
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  expect(value).toBe(4);
  expect(value).toEqual(4);
});
```

부동 소수점 등가의 경우, 테스트가 반올림 오류에 따라 달라질 수 있으므로 이를 원치 않으면 `toEqual` 대신 `toBeCloseTo`를 사용해야 한다.

```js
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  // expect(value).toBe(0.3); // 에러 발생
  expect(value).toBeCloseTo(0.3);
});
```

### 문자열

`toMatch`로 정규식과 비교하여 문자열을 검사할 수 있다.

```js
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in christopher', () => {
  expect('Christopher').toMatch(/stop/);
});
```

### 배열과 iterable

`toContain`을 사용하여 배열이나 iterable이 특정 항목을 포함하는지 여부를 확인할 수 있다.

```js
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'beer',
];
test('the shopping list has beer oin it', () => {
  expect(shoppingList).toContain('beer');
  expect(new Set(shoppingList)).toContain('beer');
});
```

### 예외

특정 함수가 호출될 때 오류를 발생시키는지를 테스트하려면 `toThrow`를 사용한다.

```js
function compileAndroidCore() {
  throw new Error('You are using the wrong JDK.');
}

test('compiling android goes as expected', () => {
  expect(compileAndroidCore).toThrow();
  expect(compileAndroidCore).toThrow(Error);

  // 정확한 오류 메시지나 정규식을 사용할 수 있다.
  expect(compileAndroidCore).toThrow('You are using the wrong JDK.');
  expect(compileAndroidCore).toThrow(/JDK/);
});
```

## 비동기 코드 테스트

비동기로 실행되는 코드가 있는 경우, Jest는 다른 테스트로 옮겨가기 전에, 테스트 중인 코드가 언제 완료되었는지 확인할 필요가 있다. Jest에는 이를 다루기 위한 몇 가지 방법이 있다.

### Callbacks

콜백은 가장 일반적인 비동기 패턴이다. 예를 들어, 일부 데이터를 가져오는 `fetchData(callback)` 함수가 있고 그것이 완료되고, `callback(data)`를 호출한다고 가정한다. 반환된 데이터가 문자열 `peanut butter`인지 테스트 하려고 한다.

```js
function callback(data) { // Timeout
  expect(data).toBe('peanut butter');
}
fetchData(callback);
```

비동기 콜백이 5000ms 내에 호출되지 않았다고 에러가 발생한다. 콜백을 호출하기도 전에 테스트가 종료되기 때문이다. 이를 해결하기 위해 `test`의 대체 형식이 있다. `done`이라는 단일 인자를 사용하면, Jest는 테스트가 끝나기 전에 `done` 콜백이 호출될 때까지 기다린다.

```js
function callback(data) {
  try {
    expect(data).toBe('peanut butter');
    done();
  } catch (error) {
    done(error);
  }
}
fetchData(callback);
```

`done()`이 호출되지 않으면, 테스트는 시간 초과 오류로 실패한다. `expect` 구문이 실패하는 경우, 오류가 발생해서 `done()`이 호출되지 않는다. 대신, `try`, `catch` 블럭으로 감싸서 `done(error)`으로 에러를 전달해야 한다.

### Promises

코드가 프로미스를 사용하는 경우, 비동기 테스트를 처리하는 것보다 간단한 방법이 있다. 테스트로부터 프로미스를 반환시키면, Jest는 그 프로미스가 `resolve`되기를 기다린다. `reject`되면 테스트는 자동으로 실패한다.

예를 들어, 콜백을 사용하는 대신 `fetchData`가 문자열 `peanut butter`를 `resolve`하기로 한 프로미스를 반환한다고 가정한다. 다음을 이용해 테스트할 수 있다.

```js
test('the data is peanut butter', () => {
  return promises.fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});
```

프로미스가 `reject`될 것이라고 예상된다면, `expect.assertions`로 발생 횟수를 지정하고,  `.catch` 메서드를 통해 테스트해야 한다.

```js
test('the fetch fails with an error', () => {
  expect.assertions(1);
  return promises.fetchData().catch(e => expect(e).toMatch('error'));
});
```

### `.resolves`/`.reject`

`expect` 구문에 `.resolve` matcher를 사용하면, Jest는 그 프로미스가 `resolve`되기를 기다릴 것이다. 프로미스가 `reject`된다면 테스트는 실패한다.

```js
test('the data is peanut butter', () => {
  return expect(promises.fetchData()).resolves.toBe('peanut butter');
});
```

프로미스가 `reject`될 것이라고 예상된다면, `.reject` matcher를 사용해야 한다. 프로미스가 `resolve`된다면 테스트는 실패한다.

```js
test('the fetch fails with an error', () => {
  return expect(promises.fetchData()).rejects.toMatch('error');
});
```

### Async/Await

프로미스를 다루는 다른 대안으로 `async`와 `await`를 사용할 수 있다. `test`에 전달된 함수 앞에 `async` 키워드를 사용한다.

```js
test('the data is peanut butter', async () => {
  const data = await promises.fetchData();
  expect(data).toBe('peanut butter');
});
```

```js
test.('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await promises.fetchData();
  }
  catch (e) {
    expect(e).toMatch('error');
  }
});
```

`async`와 `await`를 `.resolves`와 `.rejects`와 함께 조합할 수 있다.

```js
test('the data is peanut butter', async () => {
  await expect(promises.fetchData()).resolves.toBe('peanut butter');
});
```

```js
test('the fetch fails with an error', async () => {
  await expect(promises.fetchData()).rejects.toBe('error');
});
```