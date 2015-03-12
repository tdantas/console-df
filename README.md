# console-df
nodejs console.{log,info,error,warn,trace} with dateformat

Console{log,error,info,warn,trace} prefixed with date format [dateformat](https://github.com/felixge/node-dateformat).

# Usage
```js
var rollback = require('./')('dd/m/yyyy');
console.log('Prefixed date in my logs'); // => 12/3/2015 Prefixed date in my logs
rollback();
console.log('No more prefixed logs'); // => No more prefixed logs
```
