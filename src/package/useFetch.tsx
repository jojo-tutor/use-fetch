import { useEffect, useState, useRef, useCallback } from "react";
import { makeCancelable, makeOptions } from "./utils";

interface FetchResult {
  data: any;
  loading: boolean;
  status: number | null;
  error: any;
}

interface Options {
  lazy: boolean;
  instance?: any;
  onSuccess?: Function;
  onError?: Function;
  method?: "GET" | "PUT" | "POST" | "DELETE";
}

const defaultOptions = {
  lazy: false
};

function useFetch(
  url: string,
  options: Options = defaultOptions
): [FetchResult, Function] {
  const { lazy, instance, onSuccess, onError, ...initialOptions } = options;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [status, setStatus] = useState<number | null>(null);
  const fetchInstance = instance || fetch;
  const request = useRef(makeCancelable(fetchInstance));

  const handleLoading = (loading: boolean) => {
    if (request.current.isCanceled()) return;
    setLoading(loading);
  };

  const handleSuccess = useCallback(
    json => {
      if (request.current.isCanceled()) return;
      setData(json);
      if (onSuccess) onSuccess(json);
    },
    [onSuccess]
  );

  const handleError = useCallback(
    err => {
      if (request.current.isCanceled()) return;
      setError(err);
      if (onError) onError(err);
    },
    [onError]
  );

  const handleStatus = (status: number | null) => {
    if (request.current.isCanceled()) return;
    setStatus(status);
  };

  const fetchData = useCallback(
    async (overrideOptions?: any) => {
      handleLoading(true);

      try {
        const res: any = await request.current.getPromise(
          url,
          makeOptions(initialOptions, overrideOptions)
        );
        const json = await res.json();
        if (res.ok) {
          handleSuccess(json);
        } else {
          handleError(json);
        }
        handleStatus(res.status);
      } catch (err) {
        handleError(err);
      }

      handleLoading(false);
    },
    [handleError, handleSuccess, initialOptions, url]
  );

  useEffect(() => {
    if (!lazy) {
      fetchData();
    }

    const { current } = request;

    return () => {
      current.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [{ data, loading, status, error }, fetchData];
}

export default useFetch;