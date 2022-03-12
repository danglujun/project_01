// let person: { name: string; age: number; sayHi(): void; greet(name: string): void } = {
//   name: 'jack',
//   age: 20,
//   sayHi() { },
//   greet(name) { }
// }

// let person: {
//   name: string
//   age: number
//   // sayHi(): void
//   sayHi: () => void
//   greet(name: string): void
// } = {
//   name: 'jack',
//   age: 20,
//   sayHi() { },
//   greet(name) { }
// }

// 可选属性
function myAxios(config: { url: string; method?: string }) { }
myAxios({
  url: ''
})