import { useEffect, useReducer, useState } from "react";

export const useFetch = (initUrl, initData) => {
  const [url, setUrl] = useState(initUrl);
  const [state, dispatch] = useReducer(fetchReducer, {
    isLoading: false,
    isError: false,
    data: initData,
  });

  useEffect(() => {
    if (!url) return;

    let aborted = false;
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const response = await fetch(url, { signal });
        if (!aborted) {
          const data = await response.json();
          dispatch({ type: "FETCH_OK", payload: data });
        }
      } catch (error) {
        if (!aborted) {
          dispatch({ type: "FETCH_ERROR" });
        }
      }
    };

    fetchData();

    return () => {
      aborted = true;
    };
  }, [url]);

  return [state, setUrl];
};

const fetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, isError: false };
    case "FETCH_OK":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_ERROR":
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error();
  }
};
