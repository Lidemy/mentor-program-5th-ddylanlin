
function capitalize(str) {
  let n = str

  if (str[0] >= 'a' && str[0] <= 'z') { // 判斷輸入字串首字母是否為小寫
    n = str[0].toUpperCase() // 將n改為大寫首字母

    for (let i = 1; i < str.length; i++) { // 依序將首字母後加上原字串的字母
      n += str[i]
    }
    return n
  } else { // 若否 直接回傳原字串
    return str
  }
}

console.log(capitalize('nick'))
console.log(capitalize('Nick'))
console.log(capitalize(',hello'))
