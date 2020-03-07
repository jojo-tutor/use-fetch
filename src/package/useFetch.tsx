import { useEffect, useState, useRef, useCallback } from "react";
import { makeCancelable, makeOptions } from "./utils";

const defaultOptions = {
  lazy: false
};

/**
 * @typedef {Object} Response
 * @property {any} data
 * @property {Boolean} loading
 */

/**
 *
 * @param {String} url
 * @param {Object} options
 * @param {Boolean} options.lazy
 * @param {any} options.instance - fetch instance
 * @param {Function} options.onSuccess
 * @param {Function} options.onError
 *
 * @returns {Response}
 */
function useFetch(url, options = defaultOptions) {
  const { lazy, instance, onSuccess, onError, ...initialOptions } = options;

  /** @type {any} */
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const fetchInstance = instance || fetch;
  const request = useRef(makeCancelable(fetchInstance));

  const handleLoading = loading => {
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

  const handleStatus = status => {
    if (request.current.isCanceled()) return;
    setStatus(status);
  };

  const fetchData = useCallback(
    async overrideOptions => {
      handleLoading(true);

      try {
        const res = await request.current.getPromise(
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
