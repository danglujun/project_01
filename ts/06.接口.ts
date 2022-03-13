// interface IPerson {
//   name: string
//   age: number
//   sayHi(): void
//   greet(name: string): void
// }

// interface只能给对象指定类型；type可以给任意类型指定（要有=号，相当于赋值）
type IPerson = {
  name: string
  age: number
  sayHi(): void
  greet(name: string): void
}

let person: IPerson = {
  name: 'jack',
  age: 20,
  sayHi() { },
  greet(name) { }
}
let person1: IPerson = {
  name: 'jack',
  age: 18,
  sayHi() { },
  greet(name) { }
}

// 接口继承
interface Point2D { x: number; y: number }
// interface Point3D { x: number; y: number; z: number }
interface Point3D extends Point2D { z: number }