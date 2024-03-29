import { getLocalstorage, setLocalStorage } from 'views/utils';

export const localStorageEffect =
  (key) =>
  ({ setSelf, onSet, trigger }) => {
    const savedValue = getLocalstorage(key);

    if (savedValue) {
      setSelf(savedValue);
    }

    onSet((newValue, _, isReset) => {
      isReset ? localStorage.removeItem(key) : setLocalStorage(key, newValue);
    });
  };
