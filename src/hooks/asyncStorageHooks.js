import {useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export function useAsyncStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(async () => {
    try {
      // Get from local storage by key
      const item = await AsyncStorage.getItem(key);
      console.log('😈', item);
      // Parse stored json or if none return initialValue
      return JSON.parse(item) ?? initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
