// NiceIntersection<S, T> type is equivalent to a plain intersection type S & T
// except it makes the result look like {foo: ..., bar?: ...} instead of {foo: ...} & {bar?: ...}.

type NiceIntersection<S, T> = {
  [K in keyof (S & T)]: (S & T)[K];
};

export type { NiceIntersection };
