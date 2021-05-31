/* eslint-disable no-unused-vars */
// 判斷質數
function solve(lines) {
  const temp = []
  for (let i = 1; i < lines.length; i++) {
    temp.push(lines[i])
  }
  // console.log(temp)
  for (let j = 0; j < temp.length; j++) {
    if (temp[j] === 1) {
      console.log('Composite')
    } else if (isPrime(temp[j])) {
      console.log('Prime')
    } else {
      console.log('Composite')
    }
  }

  //  console.log(temp[0])
  //  console.log(isPrime(1))
  //  console.log(isPrime(temp[0]))

  function isPrime(n) {
    if (n === 1) return true
    for (let k = 2; k < n; k++) {
      if (n % k === 0) {
        return false
      }
    }
    return true
  }
}
