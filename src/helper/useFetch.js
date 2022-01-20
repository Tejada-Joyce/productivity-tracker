import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [dataReceived, setDataReceived] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setDataReceived(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchData();
  }, [url]);

  return { dataReceived, error };
};

export default useFetch;
