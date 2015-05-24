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
document.getElementById('target').textContent = m.tellMeYourName();

for (let i of f(10)) {
  console.log(i);
}
