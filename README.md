# console-df
nodejs console.{log,info,error,warn,trace} with dateformat

Console{log,error,info,warn,trace} prefixed with date [dateformat](https://github.com/felixge/node-dateformat).

### Install
```sh
 npm i console-df
```

### Usage
```js
var rollback = require('console-df')('dd/m/yyyy');
console.log('Prefixed date in my logs'); // => 12/3/2015 Prefixed date in my logs
rollback();
console.log('No more prefixed logs'); // => No more prefixed logs
```
