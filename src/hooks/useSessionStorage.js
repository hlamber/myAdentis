import { useEffect, useState } from 'react'

function getStorageValue(key, defaultValue) {
  // getting stored value
  if (typeof window !== "undefined") {
    const saved = sessionStorage.getItem(key);
    const initial = saved !== null ? saved : defaultValue;
    return initial;
  }
}

/** 
 * Create a new data entry in session storage
 * @param {string} key - key of the entry
 * @param defaultValue - default value of the entry
 * @returns {Array} custom state hook
*/
const useSessionStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useSessionStorage;