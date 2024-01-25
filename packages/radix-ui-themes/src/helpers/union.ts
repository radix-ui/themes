// Creates a union type of string literals with strings, but retains intellisense for the the literals.
// Union<string, 'foo' | 'bar'> => string | 'foo' | 'bar'
export type Union<S, T extends string | number> = T | Omit<S, T>;
