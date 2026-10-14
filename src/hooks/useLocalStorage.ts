import { parseISO } from "date-fns/fp";
import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => { // using function form of useState to lazily initialize the state from localStorage, so we only read from localStorage once when the component mounts
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item, dateReviver) as T) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue))
  }, [key, storedValue]); // whenever the key or storedValue changes, we update localStorage

  return [storedValue, setStoredValue] as const;
}

// This function is used to revive date strings back into Date objects when parsing JSON from localStorage. It checks if the value is a string that matches the ISO date format and uses parseISO to convert it back to a Date object.
function dateReviver(_key: string, value: unknown) {
  const dateFormat = /^\d{4}-\d{2}-\d{2}T/
  if (typeof value === "string" && dateFormat.test(value)) {
    return parseISO(value);
  }
  return value;
}