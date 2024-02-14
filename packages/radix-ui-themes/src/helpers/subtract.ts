/** Omits keys from the source object that are present in the other objects */
export function subtract<T extends {}, U, V, W>(
  sourceObject: T,
  object1: U,
  object2?: V,
  object3?: W
): Omit<T, keyof U | keyof V | keyof W> {
  const result = { ...sourceObject };

  for (const object of [object1, object2, object3]) {
    for (let key in object as any) {
      if (key in result) {
        delete result[key as unknown as keyof T];
      }
    }
  }

  return result;
}
