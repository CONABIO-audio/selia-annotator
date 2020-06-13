import { useState, useEffect } from 'react';


const API_FETCH_DELAY = 1000;
const MAX_API_FETCH_TRIES = 5;

const SELECT = 'select';
const CREATE = 'create';
const EDIT = 'edit';
const DELETE = 'delete';
const STATES = { SELECT, CREATE, EDIT, DELETE };


function useAPIRequest(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [failed, setFailed] = useState(false);
  const [tries, setTries] = useState(0);

  function fetchData() {
    fetch(url)
      .then((result) => result.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setTimeout(() => setTries(tries + 1), API_FETCH_DELAY);
      });
  }

  useEffect(() => {
    if (tries < MAX_API_FETCH_TRIES) {
      fetchData();
    } else {
      setFailed(true);
    }

    return () => {
      setLoading(true);
    }
  }, [tries, url]);

  return { data, loading, error, failed };
}


export {
  useAPIRequest,
  STATES,
};
