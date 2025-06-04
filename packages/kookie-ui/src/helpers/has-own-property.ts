/** A util to check whether the object has a key, while inferring the correct key type */
function hasOwnProperty<K extends string | number | symbol>(
  obj: Record<K, unknown>,
  key: string | number | symbol
): key is K {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export { hasOwnProperty };
