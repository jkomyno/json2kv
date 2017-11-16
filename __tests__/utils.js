jest.unmock('../src/utils');
import datum from './mockData';
import {
  isObject,
  traverseObj,
  getKeyList,
  getExceptionKV,
} from '../src/utils';
import json2KV from '../src';

describe('isObject', () => {
  it('should return false if it is not an object', () => {
    expect(isObject("Something")).toBe(false);
    expect(isObject([1,2,3])).toBe(false);
    expect(isObject(new Promise((res, rej) => res()))).toBe(false);
  });

  it('should return true only if it is an object', () => {
    expect(isObject({})).toBe(true);
  });
});

describe('traverseObj', () => {
  it('should traverse an object via the provided path and return its subvalue', () => {
    const obj1 = {
      somebody: {
        once: {
          told: "me"
        },
      },
    };
    const obj1Path = 'somebody.once';
    expect(traverseObj(obj1, obj1Path)).toEqual({
      told: "me"
    });

    const obj2 = {
      the: {
        world: {
          is: {
            gonna: {
              roll: "me"
            },
          },
        },
      },
    };
    const obj2Path = 'the.world.is';
    expect(traverseObj(obj2, obj2Path)).toEqual({
      gonna: {
        roll: "me",
      },
    });

    expect(traverseObj(obj2, obj1Path)).toEqual(null);
  });
});

describe('getKeyList', () => {
  it(`Returns an array containing the first-child properties of 'datum', which
      are object themselves and which have 'prop' as first-child property.`, () => {
    const expected = [
      'Battery',
      'location',
      'DO',
      'Humidity',
      'PH',
      'temperature',
      'waterTemperature'
    ];
    expect(getKeyList(datum, 'value')).toEqual(expected);
  });

  it(`If 'exceptions' is set, it also prevents the properties defined as keys in the map
      to appear in the returned array`, () => {
    const expectedWithExceptions = [
      'Battery',
      'DO',
      'Humidity',
      'PH',
      'temperature',
      'waterTemperature'
    ];
    const exceptions = new Map([['location', 'value.coordinates']]);
    expect(getKeyList(datum, 'value', exceptions)).toEqual(expectedWithExceptions);
  });
});

describe('getExceptionKV', () => {
  it(`Returns a key-value object, whose keys are the keys of 'exceptions', and whose
      values are the result of the traversal of 'datum'`, () => {
    const expected = {
      'location': 'Some location value',
    };
    const exceptions = new Map([['location', 'value.coordinates']]);
    expect(getExceptionKV(datum, exceptions)).toEqual(expected);
  });
});

describe('json2KV', () => {
  it('', () => {
    const expected = {
      'Battery': '4.08',
      'DO': '5.71',
      'Humidity': '57.30',
      'PH': '14.00',
      'location': 'Some location value',
      'temperature': '41.00',
      'waterTemperature': '29.69',
    };
    const prop = 'value';
    const exceptions = new Map([['location', 'value.coordinates']]);
    expect(json2KV(datum, prop, exceptions)).toEqual(expected);
  });
});
