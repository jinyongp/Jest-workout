const { callbacks, promises } = require('../src/script');

describe('Using Matcher', () => {
  describe('Matcher test', () => {
    it('two plus two is four', () => {
      expect(2 + 2).toBe(4);
    });

    it('object assignment', () => {
      const data = { one: 1 };
      data.two = 2;
      expect(data).toEqual({ one: 1, two: 2 });
    });

    it('adding positive numbers is not zero', () => {
      for (let i = 1; i < 10; ++i) {
        for (let j = 1; j < 10; ++j) {
          expect(i + j).not.toBe(0);
        }
      }
    });
  });

  describe('Boolean', () => {
    test('null', () => {
      const n = null;
      expect(n).toBeNull();
      expect(n).toBeDefined();
      expect(n).not.toBeUndefined();
      expect(n).not.toBeTruthy();
      expect(n).toBeFalsy();
    });
    test('zero', () => {
      const z = 0;
      expect(z).not.toBeNull();
      expect(z).toBeDefined();
      expect(z).not.toBeUndefined();
      expect(z).not.toBeTruthy();
      expect(z).toBeFalsy();
    });
  });

  describe('Number', () => {
    test('two plus two', () => {
      const value = 2 + 2;
      expect(value).toBeGreaterThan(3);
      expect(value).toBeGreaterThanOrEqual(3.5);
      expect(value).toBeLessThan(5);
      expect(value).toBeLessThanOrEqual(4.5);

      expect(value).toBe(4);
      expect(value).toEqual(4);
    });

    test('adding floating point numbers', () => {
      const value = 0.1 + 0.2;
      // expect(value).toBe(0.3); // 에러 발생
      expect(value).toBeCloseTo(0.3);
    });
  });

  describe('String', () => {
    test('there is no I in team', () => {
      expect('team').not.toMatch(/I/);
    });

    test('but there is a "stop" in christopher', () => {
      expect('Christopher').toMatch(/stop/);
    });
  });


  describe('Array and Iterable', () => {
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
  });

  describe('Exception', () => {
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
  });
});

describe('Testing Asynchronous Code', () => {
  describe('Callbacks', () => {
    test('the data is peanut butter', done => {
      // function callback(data) { // Timeout
      //   expect(data).toBe('peanut butter');
      // }
      // fetchData(callback);
      function callback(data) {
        try {
          expect(data).toBe('peanut butter');
          done();
        } catch (error) {
          done(error);
        }
      }
      callbacks.fetchData(callback);
    });
  });

  describe('Promises', () => {
    test('the data is peanut butter', () => {
      return promises.fetchData().then(data => {
        expect(data).toBe('peanut butter');
      });
    });

    test.skip('the fetch fails with an error', () => {
      expect.assertions(1);
      return promises.fetchData().catch(e => expect(e).toMatch('error'));
    });
  });

  describe('.resolves / .reject', () => {
    test('the data is peanut butter', () => {
      return expect(promises.fetchData()).resolves.toBe('peanut butter');
    });

    test.skip('the fetch fails with an error', () => {
      return expect(promises.fetchData()).rejects.toMatch('error');
    });
  });

  describe('Async/Await', () => {
    test('the data is peanut butter', async () => {
      const data = await promises.fetchData();
      expect(data).toBe('peanut butter');
    });

    test.skip('the fetch fails with an error', async () => {
      expect.assertions(1);
      try {
        await promises.fetchData();
      }
      catch (e) {
        expect(e).toMatch('error');
      }
    });

    test('the data is peanut butter', async () => {
      await expect(promises.fetchData()).resolves.toBe('peanut butter');
    });

    test.skip('the fetch fails with an error', async () => {
      await expect(promises.fetchData()).rejects.toBe('error');
    });
  });
});