var assert = require('assert');
var List = require('list');
var UniqueList = require('uniquelist');

/**
 * Creates a function that returns an object property.
 */
function getProp(name) {
	return function (obj) {
		return obj[name];
	};
}

/**
 * Custom compare function.
 */
function compareFunction(a, b) {
	return a.id === b.id;
}

describe('UniqueList([array], [compareFunction])', function () {
	var data = [
		{ id: 'a' },
		{ id: 'a' },
		{ id: 'b' },
		{ id: 'c' },
		{ id: 'c' },
		{ id: 'c' }
	];
	it('should inherit from List', function () {
		var list = new UniqueList();
		assert(list instanceof UniqueList);
		assert(list instanceof List);
	});
	it('should not require a new keyword' , function () {
		assert(UniqueList() instanceof UniqueList);
	});
	it('should have a correct constructor' , function () {
		assert(new UniqueList().constructor === UniqueList);
	});
	it('should uniquefy initial data', function () {
		var list = new UniqueList('aabcc'.split(''));
		assert(list.join() === 'a,b,c');
	});
	it('should uniquefy initial data with custom compare function', function () {
		var list = new UniqueList(data, compareFunction);
		assert(list.map(getProp('id')).join() === 'a,b,c');
	});
	it('should accept custom compare function as 1st argument', function () {
		var list = new UniqueList(compareFunction);
		assert(list.compare === compareFunction);
	});
	it('should accept custom compare function as 2nd argument', function () {
		var list = new UniqueList(data, compareFunction);
		assert(list.map(getProp('id')).join() === 'a,b,c');
		assert(list.compare === compareFunction);
	});
	it('should for...in loop only thorugh items', function () {
		var list = new List('abc'.split(''));
		var keys = [];
		for (var key in list) keys.push(key);
		assert(keys.join() === '0,1,2');
	});
});

describe('#compare(a, b)', function () {
	var compareFunction = new UniqueList().compare;
	it('should compare 2 items', function () {
		assert(compareFunction(1, 1));
		assert(!compareFunction(1, 2));
	});
	it('should use strict equals', function () {
		assert(compareFunction(1, 1));
		assert(!compareFunction(1, true));
		assert(!compareFunction(null, undefined));
	});
});

describe('#indexOf(item)', function () {
	it('should find an item, and return its index', function () {
		var list = new UniqueList('abcdefghijklmnopqrstuvwxyz'.split(''));
		assert(list.indexOf('h') === 7);
		assert(list.indexOf('a') === 0);
		assert(list.indexOf('z') === 25);
	});
	it('should return -1 when item was not found', function () {
		var list = new UniqueList('abcdefghijklmnopqrstuvwxyz'.split(''));
		assert(list.indexOf('xx') === -1);
	});
	it('should use custom compare function', function () {
		var data = [
			{ id: 'a' },
			{ id: 'b' },
			{ id: 'c' },
			{ id: 'd' },
			{ id: 'e' },
			{ id: 'f' }
		];
		var list = new UniqueList(data, compareFunction);
		assert(list.indexOf({ id: 'a' }) === 0);
		assert(list.indexOf({ id: 'c' }) === 2);
		assert(list.indexOf({ id: 'f' }) === 5);
	});
});

describe('#push(item1, ..., itemN)', function () {
	it('should insert a unique item', function () {
		var list = new UniqueList('abc'.split(''));
		var length = list.push('d');
		assert(list.join() === 'a,b,c,d');
		assert(length === 4);
	});
	it('should insert multiple unique items', function () {
		var list = new UniqueList('abc'.split(''));
		var length = list.push('d', 'e', 'f');
		assert(list.join() === 'a,b,c,d,e,f');
		assert(length === 6);
	});
	it('should ignore a duplicate', function () {
		var list = new UniqueList('abc'.split(''));
		var length = list.push('b');
		assert(list.join() === 'a,b,c');
		assert(length === 3);
	});
	it('should ignore multiple duplicates', function () {
		var list = new UniqueList('abc'.split(''));
		var length = list.push('b', 'c', 'c');
		assert(list.join() === 'a,b,c');
		assert(length === 3);
	});
	it('should pick through unique and duplicate items', function () {
		var list = new UniqueList('abc'.split(''));
		var length = list.push('a', 'd', 'd', 'c');
		assert(list.join() === 'a,b,c,d');
		assert(length === 4);
	});
});

describe('#unshift(item1, ..., itemN)', function () {
	it('should insert a unique item', function () {
		var list = new UniqueList('abc'.split(''));
		var length = list.unshift('d');
		assert(list.join() === 'd,a,b,c');
		assert(length === 4);
	});
	it('should insert multiple unique items', function () {
		var list = new UniqueList('abc'.split(''));
		var length = list.unshift('d', 'e', 'f');
		assert(list.join() === 'd,e,f,a,b,c');
		assert(length === 6);
	});
	it('should ignore a duplicate', function () {
		var list = new UniqueList('abc'.split(''));
		var length = list.unshift('b');
		assert(list.join() === 'a,b,c');
		assert(length === 3);
	});
	it('should ignore multiple duplicates', function () {
		var list = new UniqueList('abc'.split(''));
		var length = list.unshift('b', 'c', 'c');
		assert(list.join() === 'a,b,c');
		assert(length === 3);
	});
	it('should pick through unique and duplicate items', function () {
		var list = new UniqueList('abc'.split(''));
		var length = list.unshift('a', 'd', 'd', 'c');
		assert(list.join() === 'd,a,b,c');
		assert(length === 4);
	});
});