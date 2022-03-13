// enum Direction { Up, Down, Left, Right }

// 数字枚举，值自增长
// enum Direction { Up = 10, Down, Left, Right }
// enum Direction { Up = 2, Down = 4, Left = 6, Right = 8 }

// 字符串枚举，无自增长行为，每个成员必须有初始值
enum Direction { Up = 'UP', Down = 'DOWN', Left = 'LEFT', Right = 'RIGHT' }

function changeDirection(direction: Direction) { }
changeDirection(Direction.Up)