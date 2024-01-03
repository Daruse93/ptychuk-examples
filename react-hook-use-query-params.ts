import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import _mapValues from 'lodash/mapValues';

function useQueryParams<T extends Record<keyof T, string | number>>(initialValue: T) {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams: T = useMemo(() => {
    const result = { ...initialValue };
    const keys = Object.keys(initialValue) as (keyof T)[];

    keys.forEach((key) => {
      const qsValue = searchParams.get(key.toString());

      if (qsValue) {
        result[key] = qsValue as T[keyof T];
      }
    });

    return result;
  }, [initialValue, searchParams]);

  const setQueryParams = useCallback(
    (nextSearchParams: Partial<T>) => {
      const newSearchParams = new URLSearchParams();

      _mapValues(nextSearchParams, (value, key) => {
        if (value) {
          newSearchParams.set(key, value as never);
        }
      });

      setSearchParams(newSearchParams, { replace: true });
    },
    [setSearchParams],
  );

  const addQueryParams = useCallback(
    (nextSearchParams: Partial<T>) => {
      const newSearchParams = new URLSearchParams(searchParams);

      _mapValues(nextSearchParams, (value, key) => {
        if (value) {
          newSearchParams.set(key, value as never);
        }
      });

      setSearchParams(newSearchParams);
    },
    [searchParams, setSearchParams],
  );

  return { queryParams, setQueryParams, addQueryParams };
}

export default useQueryParams;
