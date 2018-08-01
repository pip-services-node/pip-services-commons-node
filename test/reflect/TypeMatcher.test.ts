let assert = require('chai').assert;

import { TypeCode } from '../../src/convert/TypeCode';
import { TypeMatcher } from '../../src/reflect/TypeMatcher';

suite('TypeMatcher', ()=> {

   test('Match Integer', () => {
		assert.isTrue(TypeMatcher.matchValuesTypeByName("int", 123));
		assert.isTrue(TypeMatcher.matchValuesTypeByName("Integer", 123));
		assert.isTrue(TypeMatcher.matchValuesType(TypeCode.Long, 123));
   });

   test('Match Boolean', () => {
		assert.isTrue(TypeMatcher.matchValuesTypeByName("bool", true));
		assert.isTrue(TypeMatcher.matchValuesTypeByName("Boolean", true));
		assert.isTrue(TypeMatcher.matchValuesType(TypeCode.Boolean, true));
   });

   test('Match Double', () => {
		assert.isTrue(TypeMatcher.matchValuesTypeByName("double", 123.456));
		assert.isTrue(TypeMatcher.matchValuesTypeByName("Double", 123.456));
		assert.isTrue(TypeMatcher.matchValuesType(TypeCode.Double, 123.456));
   });

   test('Match String', () => {
		assert.isTrue(TypeMatcher.matchValuesTypeByName("string", "ABC"));
		assert.isTrue(TypeMatcher.matchValuesType(TypeCode.String, "ABC"));
   });

   test('Match DateTime', () => {
		assert.isTrue(TypeMatcher.matchValuesTypeByName("date", new Date()));
		assert.isTrue(TypeMatcher.matchValuesTypeByName("DateTime", new Date()));
		assert.isTrue(TypeMatcher.matchValuesType(TypeCode.DateTime, new Date()));
   });

   test('Match Map', () => {
        let map = {};
		assert.isTrue(TypeMatcher.matchValuesTypeByName("map", map));
		assert.isTrue(TypeMatcher.matchValuesTypeByName("dict", map));
		assert.isTrue(TypeMatcher.matchValuesTypeByName("Dictionary", map));
		assert.isTrue(TypeMatcher.matchValuesType(TypeCode.Map, map));
   });

   test('Match Array', () => {
        let array: number[] = [];
		assert.isTrue(TypeMatcher.matchValuesTypeByName("list", array));
		assert.isTrue(TypeMatcher.matchValuesTypeByName("array", array));
		assert.isTrue(TypeMatcher.matchValuesTypeByName("object[]", array));
		assert.isTrue(TypeMatcher.matchValuesType(TypeCode.Array, array));
   });

});
