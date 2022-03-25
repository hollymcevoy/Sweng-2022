# on-error-resume-next

Run a function, synchronously or asynchronously, and ignore errors.

[![npm version](https://badge.fury.io/js/on-error-resume-next.svg)](https://badge.fury.io/js/on-error-resume-next) [![Build Status](https://travis-ci.org/compulim/on-error-resume-next.svg?branch=master)](https://travis-ci.org/compulim/on-error-resume-next)

The name come from [Visual Basic](https://docs.microsoft.com/en-us/dotnet/visual-basic/language-reference/statements/on-error-statement). The original `On Error Resume Next` statement is considered a bad error handling practice.

Although the perception of the feature is negative, when scoped and used responsibly, it can become a very helpful utility function.

# Usage

`onErrorResumeNext` will return the result if it is a success. For example,

```js
import onErrorResumeNext from 'on-error-resume-next';

const text = '{"hello":"World!"}';
const parsed = onErrorResumeNext(() => JSON.parse(text));

expect(parsed).toEqual({ hello: 'World!' });
```

Otherwise, it will return `undefined`,

```js
const parsed = onErrorResumeNext(() => JSON.parse('<xml />'));

expect(parsed).toBeUndefined();
```

> When using `onErrorResumeNext`, please be responsible and fully understand the impact of ignoring errors.

## Asynchronous using async/await

`onErrorResumeNext` will capture both exceptions (synchronous) and rejections (asynchronous). It is recommended to pair up with `await` keyword to handle both cases in the same way.

```js
const res = await onErrorResumeNext(() => fetch('/health'));

expect(res).toBeUndefined();
```

> The code is for elaboration only, the better expectation should be `expect(res).resolves.toBeUndefined()`.

# Contributions

Like us? [Star](https://github.com/compulim/on-error-resume-next/stargazers) us.

Want to make it better? [File](https://github.com/compulim/on-error-resume-next/issues) us an issue.

Don't like something you see? [Submit](https://github.com/compulim/on-error-resume-next/pulls) a pull request.
