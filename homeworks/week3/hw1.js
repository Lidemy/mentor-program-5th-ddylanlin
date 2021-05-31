/* eslint-disable no-unused-vars */
// 好多星星
function solve(lines) {
  const n = lines
  for (let i = 1; i <= n; i++) {
    let star = ''
    for (let j = 1; j <= i; j++) {
      star += '*'
    }
    console.log(star)
  }
}
