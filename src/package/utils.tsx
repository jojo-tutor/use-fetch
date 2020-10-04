import { IFetchOptions, IFetchResponse, ICalcelablePromise } from './types'

function formatOptions({ body, headers }: IFetchOptions) {
  return {
    body: body ? JSON.stringify(body) : undefined,
    headers: { 'Content-Type': 'application/json', ...headers },
  }
}

const defaultOptions = {
  responseToCamelCase: true
}

export function makeOptions(
  initialOptions: IFetchOptions,
  overrideOptions?: IFetchOptions,
): IFetchOptions {
  const mergedOptions = {
    ...defaultOptions,
    ...initialOptions,
    ...overrideOptions,
  }

  return {
    ...mergedOptions,
    ...formatOptions(mergedOptions),
  }
}

export function makeCancelable(promise: any): ICalcelablePromise {
  let hasCanceled = false

  const wrappedPromise = (...args: any): Promise<IFetchResponse> =>
    new Promise((resolve, reject) => {
      promise(...args)
        .then((val: any) =>
          hasCanceled ? reject({ isCanceled: true }) : resolve(val))
        .catch((error: any) =>
          hasCanceled ? reject({ isCanceled: true }) : reject(error))
    })

  return {
    getPromise: wrappedPromise,
    cancel() {
      hasCanceled = true
    },
    isCanceled() {
      return hasCanceled
    },
  }
}
