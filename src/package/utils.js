export function makeOptions(initialOptions, overrideOptions) {
  const mergedOptions = {
    ...initialOptions,
    ...overrideOptions
  };
  const { body } = mergedOptions;

  return {
    ...mergedOptions,
    body: body ? JSON.stringify(body) : body
  };
}

export function makeCancelable(promise) {
  let hasCanceled = false;

  const wrappedPromise = (...args) =>
    new Promise((resolve, reject) => {
      promise(...args)
        .then(val =>
          hasCanceled ? reject({ isCanceled: true }) : resolve(val)
        )
        .catch(error =>
          hasCanceled ? reject({ isCanceled: true }) : reject(error)
        );
    });

  return {
    getPromise: wrappedPromise,
    cancel() {
      hasCanceled = true;
    },
    isCanceled() {
      return hasCanceled;
    }
  };
}
