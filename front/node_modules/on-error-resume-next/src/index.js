export default function onErrorResumeNext(fn, context = null) {
  try {
    const result = fn.call(context);

    if (typeof result.then === 'function') {
      return new Promise(resolve => {
        result.then(resolve, () => resolve());
      });
    } else {
      return result;
    }
  } catch (err) {}
}
