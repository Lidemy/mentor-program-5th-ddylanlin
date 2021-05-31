``` js
function isValid(arr) {
  for(var i=0; i<arr.length; i++) {
    if (arr[i] <= 0) return 'invalid'
  }
  for(var i=2; i<arr.length; i++) {
    if (arr[i] !== arr[i-1] + arr[i-2]) return 'invalid'
  }
  return 'valid'
}

isValid([3, 5, 8, 13, 22, 35])
```

## 執行流程

1.讀到一個函數 isValid()   
2.到最下行擷取數字並啟動函數 isValid()  
</br>
3.執行函數中的第一個 for 迴圈：宣告變數 i 從 0 開始；i 每回加 1；直到 i 小於輸入的陣列長度終止迴圈。  
4.執行第一個 for 迴圈內的判斷式 if：如果陣列中的數值小於等於 0，則回傳字串 'invalid'，並終止函數。  
</br>
5.執行第二個 for 迴圈：宣告變數 i 從 2 開始；i 每回加 1；直到 i 小於輸入的陣列長度終止迴圈。  
6.執行第二個 for 迴圈內的判斷式 if：如果陣列中的 **第 i 個數字不等於前兩個數字相加**，則回傳字串 'invalid'，並終止函數。  
</br>
（依題目數值執行細節：  
6-1. i = 2，arr[2] == arr[1] + arr[0]，繼續執行迴圈  
6-2. i = 3，arr[3] == arr[2] + arr[1]，繼續執行迴圈  
6-3. i = 4，arr[4] !== arr[3] + arr[2]，回傳 'invalid'，並終止函數）  
</br>
7.若以上條件都未滿足（沒有回傳'invalid'），則表示陣列檢查完畢，為**費氏數列**，回傳字串 'valid'。  
