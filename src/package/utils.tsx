import { Options } from "./types";

export function makeOptions(initialOptions: Options, overrideOptions: Options) {
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

export function makeCancelable(promise: any) {
  let hasCanceled = false;

  const wrappedPromise = (...args: any) =>
    new Promise((resolve, reject) => {
      promise(...args)
        .then((val: any) =>
          hasCanceled ? reject({ isCanceled: true }) : resolve(val)
        )
        .catch((error: any) =>
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
