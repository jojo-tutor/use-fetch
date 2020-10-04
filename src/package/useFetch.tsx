import { useEffect, useState, useRef, useCallback } from 'react';
import { makeCancelable, makeOptions } from './utils';
import {
  IResponse,
  IFetchOptions,
  IFetchResult,
  IFetchResponse,
} from './types';

type CallbackFunction = (options?: IFetchOptions) => void;

// for now only support json, will need to refactor later for other content types
function useFetch(
  url: string,
  options: IFetchOptions = { lazy: false },
): [IFetchResult, CallbackFunction] {
  const optionRef = useRef(options);
  const [response, setResponse] = useState<IResponse>({
    data: null,
    error: null,
    loading: !optionRef.current.lazy,
  });

  const { instance = fetch, ...initialOptions } = optionRef.current;

  const request = useRef(makeCancelable(instance));

  const handleSuccess = (json: any) => {
    if (request.current.isCanceled()) return;
    if (optionRef.current.onSuccess) optionRef.current.onSuccess(json);
  };

  const handleError = (err: any) => {
    if (request.current.isCanceled()) return;
    if (optionRef.current.onError) optionRef.current.onError(err);
  };

  useEffect(() => {
    if (response.loading) return;
    if (response.data) {
      handleSuccess(response.data);
    } else if (response.error) {
      handleError(response.error);
    }
  }, [response]);

  const fetchData: CallbackFunction = useCallback(async (
    overrideOptions?: IFetchOptions,
  ) => {
    const newOptions = makeOptions(initialOptions, overrideOptions);
    optionRef.current = newOptions;
    setResponse((prev) => ({ ...prev, loading: true }));

    try {
      const response: IFetchResponse = await request.current.getPromise(
        newOptions.url || url,
        newOptions,
      );
      let json = await response.json();
      if (response.ok) {
        setResponse({
          data: json,
          error: null,
          loading: false,
        });
      } else {
        setResponse({
          data: null,
          error: json,
          loading: false,
        });
      }
    } catch (err) {
      setResponse({
        data: null,
        error: err,
        loading: false,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!optionRef.current.lazy) {
      fetchData();
    }

    const { current } = request;

    return () => {
      current.cancel();
    };
  }, [fetchData]);

  return [response, fetchData];
}

export default useFetch;
