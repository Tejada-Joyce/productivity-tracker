import { useEffect, useState } from "react";

const convertToJson = async (res) => {
  if (res.ok) {
    return res.json();
  } else {
    // eslint-disable-next-line no-throw-literal
    throw { name: "servicesError", message: await res.json() };
  }
};

const useFetch = (url) => {
  const [dataReceived, setDataReceived] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch(url).then(convertToJson);
        // console.log(data);
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
