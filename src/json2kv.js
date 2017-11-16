// @flow
import {
  getKeyList,
  getExceptionKV,
  reduceKV,
} from './utils';
import type {
  keyValueT,
  json2kvT,
} from './types';

const json2kv: json2kvT = (datum, prop, exceptions) => {
  const keyList: Array<string> = getKeyList(datum, prop, exceptions);
  const exceptionsKV: keyValueT = getExceptionKV(datum, exceptions);

  return keyList.reduce(reduceKV(datum, prop), exceptionsKV);
};

export default json2kv;
