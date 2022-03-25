import onErrorResumeNext from '.';

test('parse JSON succeeded', () => {
  const actual = onErrorResumeNext(() => JSON.parse('"Hello, World!"'));

  expect(actual).toBe('Hello, World!');
});

test('parse JSON failed', () => {
  const actual = onErrorResumeNext(() => JSON.parse('error'));

  expect(actual).toBeUndefined();
});

test('promise succeeded', async () => {
  const promiseCall = jest.fn();
  const actual = onErrorResumeNext(() => {
    promiseCall();

    return Promise.resolve('Hello, World!');
  });

  expect(promiseCall).toHaveBeenCalledTimes(1);
  expect(actual).resolves.toBe('Hello, World!');
});

test('promise failed', async () => {
  const promiseCall = jest.fn();
  const actual = onErrorResumeNext(() => {
    promiseCall();

    return Promise.reject('Hello, World!');
  });

  expect(promiseCall).toHaveBeenCalledTimes(1);
  expect(actual).resolves.toBeUndefined();
});

test('promise failed synchronously', async () => {
  const promiseCall = jest.fn();
  const actual = onErrorResumeNext(async () => {
    promiseCall();

    throw new Error();
  });

  expect(promiseCall).toHaveBeenCalledTimes(1);
  expect(actual).resolves.toBeUndefined();
});
