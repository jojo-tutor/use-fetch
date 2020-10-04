export interface IResponse {
  data: any | null;
  error: any | null;
  loading: boolean;
}
export interface IFetchResult {
  data: any
  loading: boolean
  error: any
}

export interface IFetchOptions {
  // custom
  url?: string

  // fetch
  lazy?: boolean
  instance?: any
  onSuccess?: any
  onError?: any
  method?:
  | 'GET'
  | 'POST'
  | 'DELETE'
  | 'PATCH'
  | 'PUT'
  | 'HEAD'
  | 'OPTIONS'
  | 'CONNECT'
  headers?: any
  body?: any
  mode?: 'cors' | 'no-cors' | 'same-origin'
  credentials?: 'omit' | 'same-origin' | 'include'
  cache?:
  | 'default'
  | 'no-store'
  | 'reload'
  | 'no-cache'
  | 'force-cache'
  | 'only-if-cached'
  redirect?: 'follow' | 'error' | 'manual'
  referrer?: string
  referrerPolicy?:
  | 'referrer'
  | 'no-referrer-when-downgrade'
  | 'origin'
  | 'origin-when-cross-origin'
  | 'unsafe-url'
  integrity?: any
}

export interface ICalcelablePromise {
  getPromise: (...args: any[]) => Promise<IFetchResponse>
  cancel: () => void
  isCanceled: () => boolean
}

export declare enum IResponseType {
  Basic,
  Cors,
  Default,
  Error,
  Opaque,
}

export interface IHeaders {
  append(name: string, value: string): void
  delete(name: string): void
  get(name: string): string
  getAll(name: string): Array<string>
  has(name: string): boolean
  set(name: string, value: string): void
}

export interface IBody {
  bodyUsed: boolean
  arrayBuffer(): Promise<ArrayBuffer>
  blob(): Promise<Blob>
  formData(): Promise<FormData>
  json(): Promise<JSON>
  text(): Promise<string>
}

export interface IFetchResponse extends IBody {
  error(): IFetchResponse
  redirect(url: string, status?: number): IFetchResponse
  type: ResponseType
  url: string
  status: number
  ok: boolean
  statusText: string
  headers: Headers
  clone(): IFetchResponse
}
