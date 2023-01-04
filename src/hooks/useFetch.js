// import { useEffect, useState } from "react";
// import axios from "axios";

// const useFetch = (url) => {
//   const [list, setList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);

//   const reFetch = () => {
//     setLoading(true);
//     axios.get("http://localhost:3636/api" + url, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + "123",
//         'Accept': 'application/json'
//       },
//     })
//       .then(response => setList(response.data))
//       .catch(error =>
//         setError(error))
//     setLoading(false);
//   };

//   const fetchData = () => {
//     setLoading(true);
//     axios.get("http://localhost:3636/api" + url, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + "123",
//         'Accept': 'application/json'
//       },
//     })
//       .then(response => setList(response.data))
//       .catch(error =>
//         setError(error)
//       );

//     setLoading(false);
//   };
//   fetchData();

//   console.warn(list)
//   return { list, loading, error, reFetch };
// };

// export default useFetch;
import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;