// @flow
import type {
  isObjectT,
  traverseObjT,
  getKeyListT,
  getExceptionObjT,
  reduceKVT,
} from './types';

/**
 * Returns true iff obj is a JS Object.
 * @param {any} obj
 * @return {bool}
 */
export const isObject: isObjectT = obj =>
  obj instanceof Object &&
  obj.constructor === Object;

/**
 * Traverses an object via the provided path, and returns its value.
 * @param {Object} obj
 * @param {string} path
 * @return {any}
 */
export const traverseObj: traverseObjT = (obj, path) => path
  .split('.')
  .reduce((acc, prop) => {
    if (acc) {
      if (acc[prop]) {
        return acc[prop];
      }
    }
    return null;
  }, obj);

/**
 * Returns an array containing the first-child properties of `datum`,
 * which are objects themselves, which have `prop` as first-child property,
 * and which don't appear as keys in the `exceptions` Map.
 * @param {Object} datum
 * @param {string} prop
 * @param {Map} exceptions
 * @return {Array<string>}
 */
export const getKeyList: getKeyListT = (datum, prop, exceptions = new Map()) =>
  Object.keys(datum).filter(key =>
    isObject(datum[key]) &&
    datum[key][prop] &&
    !exceptions.has(key));

/**
 * Returns a key-value object, whose keys are the keys of `exceptions`, and whose
 * values are the result of the traversal of `datum`
 * @param {Object} datum
 * @param {Map<string, string>} exceptions
 * @return {Array<string>}
 */
export const getExceptionKV: getExceptionObjT = (datum, exceptions) =>
  /**
   * Note: exceptions.keys() returns an iteratable, so to be able to call
   * reduce, I need to feed that iterator to Array.from()
   */
  Array.from(exceptions.keys()).reduce((acc, key) => {
    // I have to explicitly cast it to string due to https://github.com/facebook/flow/issues/2751
    acc[key] = traverseObj(datum[key], ((exceptions.get(key): any): string));
    return acc;
  }, {});

/**
 * Curry function that returns a reduce callback. It returns a key-value object.
 * @param {*} datum
 * @param {*} prop
 */
export const reduceKV: reduceKVT = (datum, prop) => (acc, key) => {
  acc[key] = datum[key][prop];
  return acc;
};
