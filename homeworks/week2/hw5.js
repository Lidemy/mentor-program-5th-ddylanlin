
function join(arr, str) {
  /* eslint-disable prefer-template */
  let result = arr[0] + '' // 宣告輸出字串初始直為 arr[0]
  // let result = `${arr[0]} `
  for (let i = 1; i < arr.length; i++) {
    result += str + arr[i] // 每回加上str 跟陣列[i]
  }

  console.log(result)
}

join([1, 2, 3], '') // 正確回傳值：123
join(['a', 'b', 'c'], '!') // 正確回傳值：a!b!c
join(['a', 1, 'b', 2, 'c', 3], ',') // 正確回傳值：a,1,b,2,c,3

function repeat(str, n) {
  let temp = ''
  for (let i = 1; i <= n; i++) {
    temp += str
  }
  console.log(temp)
}

repeat('a', 5)
repeat('yoyo', 2)
