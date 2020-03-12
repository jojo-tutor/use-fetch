export interface FetchResult {
  data: any;
  loading: boolean;
  status: number | null;
  error: any;
}

export interface Options {
  lazy?: boolean;
  instance?: any;
  onSuccess?: Function;
  onError?: Function;
  method?: "GET" | "PUT" | "POST" | "DELETE";
  body?: any;
}
