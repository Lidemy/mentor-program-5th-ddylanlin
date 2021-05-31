/* eslint-disable no-unused-vars */
function searchArray(arr, n) { // 陣列依序搜尋法
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === n) return i
    // break
  }
  return -1
}

function searchBinary(arr, n) { // 二分搜尋法
  let low = 0
  let top = arr.length - 1

  while (low <= top) {
    const middle = Math.floor((low + top) / 2)
    if (n === arr[middle]) {
      return middle
    } else if (n > arr[middle]) {
      low = middle + 1
    } else if (n < arr[middle]) {
      top = middle - 1
    }
  }

  return -1

  /*  for(var i = 0 ; i <= Math.sqrt(arr.length) ; i++){
      if ( n === arr[(low+top) >> 2]) {
          return (low+top)/2
      }else if( n > arr[(low+top) >> 2]){
          low = (low+top)/2
      }else if( n < arr[(low+top) >> 2]) {
          top = (low+top)/2
      }
    }
     return -1
  */
}

// console.log(searchArray([1, 3, 10, 14, 39], 14)) //=> 3
// console.log(searchArray([1, 3, 10, 14, 39], 299)) //=> -1
console.log(searchBinary([1, 3, 10, 14, 39], 14)) // => 3
console.log(searchBinary([1, 3, 10, 14, 39], 299)) // => -1
