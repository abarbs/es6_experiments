"use strict";

import mod, * as others from 'mod';
import another from 'another';

class MyClass {
  constructor(name) {
    this.name = name;
  }

  tellMeYourName() {
    return this.name;
  }
}

function* f(x) {
  var i = 0;
  while (i + x < 10+x) {
    yield i++ + x;
  }
}

let m = new MyClass('fred');
document.getElementById('target').textContent = mod();

for (let i of f(10)) {
  console.log(i);
}

console.log(`foo says: "${others.foo()}"`);
console.log(`another says: "${another()}`);

