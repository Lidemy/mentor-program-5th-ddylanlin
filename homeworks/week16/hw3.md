## hw3：Hoisting
```js
1  var a = 1
2  function fn(){
3   console.log(a)  // undefined
4   var a = 5
5    console.log(a) // 5
6    a++ // a = 6
7    var a
8    fn2()
9    console.log(a) // 20
10    function fn2(){
11      console.log(a) // 6
12      a = 20
13      b = 100
14    }
15  }
16  fn()
17  console.log(a) // 1
18  a = 10
19  console.log(a) // 10
20  onsole.log(b) // 100
```

### 輸出結果
```
undefine
5
6
20
1
10
100
```

JavaScript 會先**編譯**再**執行**，會先建立 Execution Context 
掃過一遍 global ，先將宣告的變數設為 undefine 或 Function，再依序將值放入被宣告的變數中，之後再依次進入各個 Function 做一樣的步驟。

以下省略EC、VO、Scope Chain 編譯建置步驟：

1.程式碼執行`第1行`，global 宣告並給值 `var a = 1`

2.執行至`第16行`，執行 `fn()`

3.進入`Function fn()`，執行`第3行`console.log(a)，此時在 Function 內往上找但沒有找到 a ，再往下找看有沒有宣告變數 a 或 Function a()，在`第3行`找到`var a = 5`，此時將宣告行為往上拉但不給予賦值變成：
```js
function fn(){      
  var a
  console.log(a) 
  a = 5  
```
**所以`第3行`的 console.log(a) 值為 undefined**

4.執行`第4行`，此時 Function 內 a 值為 5

5.執行`第5行`，**此 console.log(a) 值為 5**

6.執行`第6行`，此時 Function 內 a 值變為 6

7.執行`第7行`，再宣告一次 a，但這是沒有作用的一次宣告

8.執行`第8行`，執行 `Function fn2()`，跳至`第10行`進入 Function

9.執行`第11行`console.log(a)，此時在 Function 內往上及往下找看有沒有以北宣告過的變數 a 或 Function a()，皆沒有時，跳出`Function fn2()`往上一層找，找到此時宣告過的 a 值為 6，
**所以`第11行`的 console.log(a) 值為 6**

10.執行`第12行`，將 `Function fn()` 內 a 值改為 20

11.執行`第13行`，欲將 `Function fn()` 內 b 值改為 100，但 `Function fn()` 裡沒有宣告過 b ，所以再往更上一層丟：
欲將 `global` 內 b 值改為 100，但 `global` 裡沒有宣告過 b，但因為這是最外層了，所以自動在 `global` 內宣告 `b = 100`
`Function fn2()`執行完畢

12.執行`第9行`，受`Function fn2()`改變，此時 Function 內 a 值變為 20
**所以`第9行`的 console.log(a) 值為 20**
`Function fn()`執行完畢

13.執行`第17行`，在 `global` 中，先向上再向下尋找是否有宣告過變數 a，找到`第1行`，`var a = 1`
**所以`第17行`的 console.log(a) 值為 1**

14.執行`第18行`，此時 `global` 中 a 值變為 10

15.執行`第19行`，在 `global` 中，先向上再向下尋找是否有宣告過變數 a，
**所以`第19行`的 console.log(a) 值為 10**

16.執行`第20行`，在 `global` 中，先向上再向下尋找是否有宣告過變數 b，
找到步驟11 `Function fn2()` 自動在 `global` 內宣告 `b = 100`
**所以`第20行`的 console.log(b) 值為 100**


