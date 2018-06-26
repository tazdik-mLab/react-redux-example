const appStorage = window.localStorage;

export function setItem(identifier, item) {
  appStorage.setItem(identifier, item);
}

export function getItem(identifier) {
  return appStorage.getItem(identifier) || false;
}

export function removeItem(identifier) {
  appStorage.removeItem(identifier);
}
