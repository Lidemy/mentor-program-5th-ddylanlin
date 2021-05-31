/* eslint-disable no-unused-vars */
// 水仙花數
function solve(lines) {
  const temp = lines[0].split(' ')

  const min = Number(temp[0])
  const max = Number(temp[1])
  // console.log(min)

  for (let j = min; j <= max; j++) {
    if (narNumber(j) === true) {
      console.log(j)
    }
  }
}

function narNumber(n) {
  const arr = n.toString().split('')
  // console.log(arr)

  const digi = arr.length
  //  console.log(digi)

  // console.log(Math.pow(arr[2], digi))
  let result = 0
  for (let i = 0; i < digi; i++) {
    result += Math.pow(arr[i], digi)
  }
  // console.log(result)
  if (result === n) {
    return true
  } else {
    return false
  }
}
