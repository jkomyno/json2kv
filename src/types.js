// @flow

export type keyValueT = {
  [string]: string
};

export type exceptionsMapT = Map<string, string>;
export type json2kvT = (datum: {}, prop: string, exceptions: exceptionsMapT) => any;
/**
 * utils
 */
export type isObjectT = (obj: any) => boolean;
export type traverseObjT = (obj: {}, path: string) => {} | any;
export type getKeyListT = (datum: {}, prop: string, exceptions: exceptionsMapT) =>
  Array<string>;
export type getExceptionObjT = (datum: {}, exceptions: exceptionsMapT) =>
  keyValueT;
export type reduceKVT = (datum: {}, prop: string) =>
  (acc: {}, key: string) => keyValueT;
