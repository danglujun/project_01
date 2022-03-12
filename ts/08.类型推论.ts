// 利用类型推论省略类型注解
// 1.声明变量并立即初始化值，此时可以省略类型注解
let age = 18
// age = ''

// 如果声明变量但没有立即初始化值，此时还必须手动添加类型注解
let a: number
a = 20
// a=''

// 2.决定函数返回值
function add(num1: number, num2: number) {
  return num1 + num2
}
add(1, 2)

console.log('object');
