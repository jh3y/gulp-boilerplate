var myScripts = (function () {
'use strict';

var greet = function greet(txt) {
  return "Hi " + txt + "!";
};

var sum = function sum(a, b) {
  return a + b;
};

var index = {
  greet: greet,
  sum: sum
};

return index;

}());
