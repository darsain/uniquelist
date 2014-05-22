# UniqueList

Extends [List](https://github.com/darsain/list) to create a unique list.

Read about limitations here: [darsain/list#limitations](https://github.com/darsain/list#limitations).

## Install

With [component(1)](https://github.com/component/component):

```bash
component install darsain/uniquelist
```

## Usage

```js
var UniqueList = require('uniquelist');
var list = new UniqueList(['a', 'a', 'b', 'c', 'c']);
list.join(); // a,b,c
list.push('a');
list.join(); // a,b,c
list.unshift('d');
list.join(); // d,a,b,c,
```

With custom compare function:

```js
var data = [
	{ id: 'a' },
	{ id: 'b' },
	{ id: 'b' },
	{ id: 'c' }
];
var compare = function compare(a, b) {
	return a.id === b.id;
};
var list = new UniqueList(data, compare);

console.log(list); // { id: 'a' }, { id: 'b' }, { id: 'c' }
```

## API

### UniqueList([array], [compareFunction])

UniqueList constructor. `new` keyword is optional.

#### [array]

`Object`

Array, or an array-like like object to create a UniqueList from.

Can be `Array`, `List`, `NodeList`, `arguments`, ... everything that looks like `{ 0: 'foo', length: 1 }`.

#### [compareFunction]

`Function`

Function for comparing 2 items. Receives 2 arguments. Has to return `true` when items match, `false` otherwise.

Example:

```js
function compareFunction(a, b) {
	return a.id === b.id;
}
```

#### *Inherits all methods from [List](https://github.com/darsain/list)*

*Below are documented methods that are either new, or vary from their native behavior.*

### #compare(a, b)

Current compare function. Compares 2 items and returns `true` when they match, `false` otherwise.

By default uses strict equals `===` to compare items. You can specify your own compare function by passing it as a 2nd argument to constructor.

### #indexOf(item)

Uses `#compare()` to find an `item` in a list. Returns an item index, or `-1` when not found.

### #push(item1, ..., itemN)

Appends new unique items to a list, ignoring duplicates. Uses `#compare()` for matching items.

### #unshift(item1, ..., itemN)

Prepends new unique items to a list, ignoring duplicates. Uses `#compare()` for matching items.

## Testing

To run tests:

```
component install --dev
component build --dev
```

And open `test/index.html`

## License

MIT