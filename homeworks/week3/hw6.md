在之前的教學單元都有練習過這幾題  

## hw1：好多星星
```
function solve(lines) {

  n = lines
  for (var i = 1; i <= n ; i++){
    var star = ''
    for(var j = 1; j <= i ; j++){

      star += '*'

    }
console.log(star)
  }

}
```
基礎的星星打印，第一次了解到 for 迴圈的使用（及雙層迴圈）。

## hw2：水仙花數

```
function solve(lines){

    var temp = lines[0].split(' ')
    var min = Number(temp[0])
    var max = Number(temp[1])

    for (var j = min; j <= max ;j++){
      if (narNumber(j) === true){
        console.log(j)
    }
    }
}


function narNumber(n) {

  var arr = n.toString().split('')
  var digi = arr.length

  var result = 0
  for (let i = 0 ; i < digi ; i++){
    result += Math.pow(arr[i], digi)
  }
   if (result === n ) {
     return true
   }  else{
     return false
   }
}
```
學會跟熟悉把字串各個 index 的元素拆解開來運算再合併。
學會 `Math.pow()` 語法。

## hw3：判斷質數
```
function solve(lines) {
  var temp = []
  for (let i = 1; i < lines.length ;i++){
     temp.push(lines[i])
   }

  for (var j = 0; j < temp.length ;j++){
    if ( temp[j]  == 1){
      console.log('Composite')
    }else if (isPrime(temp[j])){
       console.log('Prime')
     }else {
       console.log('Composite')
     }
  }


 function isPrime(n){
    if (n === 1) return true
    for (let k = 2 ;k < n ;k++){
      if (n % k === 0){
        return false
      }
    }
    return true
  }
}
```
學習更頻繁的使用 function，讓程式的架構更清楚也更具有可讀性。
## hw4：判斷迴文
```
function solve(lines) {

  var arr = lines[0].split('') //.map(Number)
  //console.log(arr)
  var a = arr
  var b = reverseA(arr)


  for (let i = 0 ; i < arr.length ;i++){
    if (a[i] !== b[i]){
      return console.log('False')
      }
    }
    return console.log('True')
    }

function reverseA(arr){                     ////陣列內容反轉

    let temp = []
    for(let i = arr.length-1 ;i >= 0 ; i--){
      temp.push(arr[i])
    }
    return temp
}
```
先輸出新陣列（反轉），再與原陣列做比較。
## hw5：聯誼順序比大小
```
function solve(lines) {

  for(var i = 1 ; i < lines.length ; i++){

    var [a,b,c]=lines[i].split(' ')
    console.log(finalCompare(a,b,Number(c)))
  }
}

function finalCompare(a,b,c){

      let result = ''

      switch(c){
        case 1:
        result = (a.length === b.length) ? numberCompare(a,b,c) : a.length > b.length ? 'A' : 'B'
        break

        case -1:
        result = (a.length === b.length) ? numberCompare(a,b,c) : a.length > b.length ? 'B' : 'A'
        break

      }
      return result
    }


function numberCompare(a,b,c){

        if(a === b) return 'DRAW'
        let result = ''

        switch(c){
          case 1:
          result =( a > b ) ? 'A' : 'B'
          break

          case -1:
          result =( a > b ) ? 'B' : 'A'
          break

          default:
          result =( a > b ) ? 'A' : 'B'
        }
      return result
    }
```
記得這題當初卡超久！
上 Slack 看了其他人的程式碼，
覺得自己儘管解題邏輯上沒大方向的錯誤，
但是熟識語法的熟悉程度太低。

這題主要學習並更熟識 **switch** 用法及 **三元判斷**
`( a > b ) ? 'A' : 'B'`
