import { useState } from "react";

const useHttp = (url: string, type: string, body: {}) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<{} | null>(null);
  const sendRequest = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(url);
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
