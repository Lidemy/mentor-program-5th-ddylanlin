/* eslint-disable no-unused-vars */
function solve(lines) {
  const arr = lines[0].split('') // .map(Number)
  // console.log(arr)
  const a = arr
  const b = reverseA(arr)

  //  console.log(arr)
  //  console.log(reverseA(arr))
  //  console.log(a,b)

  for (let i = 0; i < arr.length; i++) {
    if (a[i] !== b[i]) {
      return console.log('False')
    }
  }
  return console.log('True')
}

// 陣列內容反轉
function reverseA(arr) {
  const temp = []
  for (let i = arr.length - 1; i >= 0; i--) {
    temp.push(arr[i])
  }
  return temp
}

// solve(['ac'])
