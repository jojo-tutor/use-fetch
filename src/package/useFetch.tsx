import { useEffect, useState, useRef, useCallback } from "react";
import { makeCancelable, makeOptions } from "./utils";
import { FetchOptions, FetchResult, FetchResponse } from "./types";

function useFetch(
  url: string,
  options: FetchOptions = { lazy: false }
): [FetchResult, Function] {
  const { lazy, instance = fetch, onSuccess, onError, ...initialOptions } = options;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [status, setStatus] = useState<number | null>(null);
  const request = useRef(makeCancelable(instance));

  const handleLoading = async (loading: boolean) => {
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
        const res: FetchResponse = await request.current.getPromise(
          url,
          makeOptions(initialOptions, overrideOptions)
        )
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
