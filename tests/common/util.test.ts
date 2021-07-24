import {
    doesMatchRegex,
    equals,
    hasLength,
    isEmpty,
    isNil,
    isPlainObject,
} from '../../src/common/util';

describe('Util Test Suite', () => {
    describe('isEmpty Test Suite', () => {
        test('When the string is empty it should return true', () => {
            expect(isEmpty('')).toBeTruthy();
        });

        test('When the list is not empty it should return false', () => {
            expect(isEmpty(['a'])).toBeFalsy();
        });
    });

    describe('hasLength Test Suite', () => {
        test('When the string and list have a length of 1 it should return true', () => {
            expect(hasLength('a', 1)).toBeTruthy();
            expect(hasLength(['a'], 1)).toBeTruthy();
        });
    });

    describe('isNil Test Suite', () => {
        test('When the object is null it should return true', () => {
            expect(isNil(null)).toBeTruthy();
        });

        test('When the object is undefined it should return true', () => {
            expect(isNil(undefined)).toBeTruthy();
        });
    });

    describe('equals Test Suite', () => {
        test('When the values are the same it should return true', () => {
            expect(equals('a', 'a')).toBeTruthy();
        });
    });

    describe('doesMatchRegex Test Suite', () => {
        test('When the string matches the regex it should return true', () => {
            expect(doesMatchRegex('a', new RegExp('a'))).toBeTruthy();
        });
    });

    describe('isPlainObject Test Suite', () => {
        test('When object is nil should return false', () => {
            expect(isPlainObject(null)).toBeFalsy();
        });

        test('When object is an array it should return false', () => {
            expect(isPlainObject([])).toBeFalsy();
        });

        test('When object is a string it should return false', () => {
            expect(isPlainObject('')).toBeFalsy();
        });

        test('When object is a plain object it should return false', () => {
            expect(isPlainObject({})).toBeTruthy();
        });
    });
});
