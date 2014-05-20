var List = require('list');
var inherit = require('inherit');
var definer = require('definer');
var listProto = List.prototype;
var writableDescriptor = { writable: true };

module.exports = UniqueList;

function UniqueList(array, compareFunction) {
	if (!(this instanceof UniqueList)) return new UniqueList(array, compareFunction);
	if (typeof array === 'function') {
		compareFunction = array;
		array = null;
	}
	definer(this).define('compare', compareFunction || defaultCompareFunction, writableDescriptor);
	List.call(this, array);
}

inherit(UniqueList, List);

definer(UniqueList.prototype)
	.type('m')

	.m('constructor', UniqueList)
	.m('indexOf', indexOf)
	.m('push', push)
	.m('unshift', unshift);

function defaultCompareFunction(a, b) {
	return a === b;
}

function indexOf(item) {
	for (var i = 0, l = this.length; i < l; i++)
		if (this.compare(item, this[i])) return i;
	return -1;
}

function push() {
	var args = arguments;
	for (var i = 0, l = args.length; i < l; i++)
		if (!~this.indexOf(args[i])) listProto.push.call(this, args[i]);
	return this.length;
}

function unshift() {
	var args = arguments;
	var i = args.length;
	while (i--)
		if (!~this.indexOf(args[i])) listProto.unshift.call(this, args[i]);
	return this.length;
}