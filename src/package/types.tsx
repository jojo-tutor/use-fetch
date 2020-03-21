export interface FetchResult {
  data: any;
  loading: boolean;
  status: number | null;
  error: any;
}
export interface FetchOptions {
  lazy?: boolean;
  instance?: any;
  onSuccess?: Function;
  onError?: Function;
  method?: "GET" | "POST" | "DELETE" | "PATCH" | "PUT" | "HEAD" | "OPTIONS" | "CONNECT";
  headers?: any;
  body?: any;
  mode?: "cors" | "no-cors" | "same-origin";
  credentials?: "omit" | "same-origin" | "include";
  cache?: "default" | "no-store" | "reload" | "no-cache" | "force-cache" | "only-if-cached";
  redirect?: "follow" | "error" | "manual";
  referrer?: string;
  referrerPolicy?: "referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "unsafe-url";
  integrity?: any;
}

declare enum ResponseType {
  Basic,
  Cors,
  Default,
  Error,
  Opaque
}

interface Headers {
  append(name: string, value: string):void;
  delete(name: string):void;
  get(name: string): string;
  getAll(name: string): Array<string>;
  has(name: string): boolean;
  set(name: string, value: string): void;
}

interface Body {
  bodyUsed: boolean;
  arrayBuffer(): Promise<ArrayBuffer>;
  blob(): Promise<Blob>;
  formData(): Promise<FormData>;
  json(): Promise<JSON>;
  text(): Promise<string>;
}

interface Response extends Body {
  error(): Response;
  redirect(url: string, status?: number): Response;
  type: ResponseType;
  url: string;
  status: number;
  ok: boolean;
  statusText: string;
  headers: Headers;
  clone(): Response;
}
