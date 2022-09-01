import { useEffect, useState } from "react";
type HTTP = {
  url: string;
  type?: string;
  body?: any;
};
const useHttp = (arg: HTTP) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState({});
  const sendRequest = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(arg.url, {
        method: arg.type ? arg.type : "GET",
        body: arg.body ? JSON.stringify(arg.body) : undefined,
        headers: arg.body
          ? {
              "Content-Type": "application/json",
            }
          : {},
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();

      setValue(data);
    } catch (e: any) {
      setError(e);
    }

    setLoading(false);
  };

  return {
    sendRequest,
    value,
    loading,
    error,
  };
};

export default useHttp;
