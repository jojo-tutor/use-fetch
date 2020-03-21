import { FetchOptions, FetchResponse } from "./types";

export function makeOptions(initialOptions: FetchOptions, overrideOptions: FetchOptions) {
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

  const wrappedPromise = (...args: any): Promise<FetchResponse> =>
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
