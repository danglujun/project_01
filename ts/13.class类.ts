/* class Person {
  age: number
  gender = '男'
}
const p = new Person()
p.age
p.gender */

// 构造函数
/* class Person {
  age: number
  gender: string
  constructor(age: number, gender: string) {
    this.age = age
    this.gender = gender
  }
}
const p = new Person(18, '男') */

// 实例方法
/* class Point {
  x = 1
  y = 2
  scale(n: number) {
    this.x *= n
    this.y *= n
  }
}
const p = new Point()
p.scale(10)
console.log(p.x, p.y);
 */

// extends继承父类
/* class Animal {
  move() {
    console.log('走两步');
  }
}
class Dog extends Animal {
  name = '二哈'
  bark() {
    console.log('汪汪');
  }
}
const p = new Dog()
p.move()
p.bark()
console.log(p.name); */

// 实现接口
/* interface Singale {
  sing(): void
  name: string
}
class Person implements Singale {
  name = 'jack'
  sing(): void {
    console.log('你是我的小丫小苹果');
  }
} */

// 类成员的可见性
// 1.public 公有的，任何地方都可以访问，public是默认值，可以省略
/* class Animal {
  public move() {
    console.log('走两步');
  }
}
class Dog extends Animal {
  name = '二哈'
  public bark() {
    console.log('汪汪');
  }
}
const p = new Dog()
p.move()
p.bark()
console.log(p.name); */

// 2.protected 受保护的，只能在类及子类中访问，对实例不可见
/* class Animal {
  protected move() {
    console.log('走两步');
  }
}
class Dog extends Animal {
  name = '二哈'
  public bark() {
    console.log('汪汪');
  }
}
const p = new Dog()
// p.move()
p.bark()
console.log(p.name); */

// 3.private 私有的，对子类和实例都不可见
class Animal {
  private move() {
    console.log('走两步');
  }
}
class Dog extends Animal {
  name = '二哈'
  public bark() {
    console.log('汪汪');
  }
}
const p = new Dog()
// p.move()
p.bark()
console.log(p.name);