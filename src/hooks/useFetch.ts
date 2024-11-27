import { useEffect, useState } from "react";

interface UseFetchLoadingState {
  loading: true;
  data?: never;
  error?: never;
}

interface UseFetchErrorState {
  loading: false;
  error: Error;
  data?: never;
}

interface UseFetchSuccessState<T> {
  loading: false;
  data: T;
  error?: never;
}

type UseFetchState<T> =
  | UseFetchLoadingState
  | UseFetchErrorState
  | UseFetchSuccessState<T>;

export function useFetch<T>(url?: string) {
  const [state, setState] = useState<UseFetchState<T>>({
    loading: true,
  });

  useEffect(() => {
    if (!url) return;

    setState({ loading: true });

    fetch(url)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const json = await res.json();
        setState({ loading: false, data: json.data });
      })
      .catch((error) => {
        setState({ loading: false, error });
      });
  }, [url]);

  return state;
}
