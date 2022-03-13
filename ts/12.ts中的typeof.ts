console.log(typeof 'Hello TS'); // string

let p = { x: 1, y: 2 }
function formatPoint(point: typeof p) { }
formatPoint({ x: 2, y: 4 })

let num: typeof p.x