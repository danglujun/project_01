// 1.单独指定参数、返回值类型
// function add(num1: number, num2: number): number {
//   return num1 + num2
// }

// const add = (num1: number, num2: number): number => {
//   return num1 + num2
// }

// console.log(add(1, 2));

// 2.同时指定参数、返回值类型，只适用于函数表达式
// const add: (num1: number, num2: number) => number = (num1, num2) => {
//   return num1 + num2
// }
// console.log(add(2, 3));

// 3.函数没有返回值，类型为void
// function greet(name: string): void {
//   console.log('Hello', name);
// }
// greet('jack')

// 4.可选参数
function mySlice(start?: number, end?: number): void {
  console.log('起始索引是：', start, '结束索引是：', end);
}
mySlice()
mySlice(1)
mySlice(1, 3)