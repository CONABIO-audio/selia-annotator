import { useState, useEffect, useContext } from 'react';
import APIContext from '../contexts/APIContext';


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

  useEffect(() => {
    if (tries < MAX_API_FETCH_TRIES) {
      setLoading(true);
      fetch(url)
        .then((result) => result.json())
        .then((d) => {
          setData(d);
          console.log({
            message: 'Fetching from API',
            url,
          });
          setLoading(false);
        })
        .catch((e) => {
          setError(e.message);
          setTimeout(() => setTries(tries + 1), API_FETCH_DELAY);
        });
    } else {
      setFailed(true);
    }
  }, [tries, url]);

  return { data, loading, error, failed };
}


function useAnnotations() {
  // Prepare annotations
  const { annotations } = useContext(APIContext);
  const [itemAnnotations, setItemAnnotations] = useState({});

  useEffect(() => {
    if (annotations.data !== null) {
      console.log('changing annotations!!');
      const newItemAnnotations = {};
      Object.entries(annotations.data).forEach(([id, annotation]) => {
        newItemAnnotations[id] = annotation.annotation;
      });
      setItemAnnotations(newItemAnnotations);
    }
  }, [annotations.data]);

  return itemAnnotations;
}


function hasAttr(obj, attr) {
  return Object.hasOwnProperty.call(obj, attr);
}


export {
  hasAttr,
  useAPIRequest,
  useAnnotations,
  STATES,
};
