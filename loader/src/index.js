class Person {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

const joey = new Person("Joey");
console.log(joey.getName());
