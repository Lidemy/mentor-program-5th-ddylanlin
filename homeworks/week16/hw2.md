## hw2：Event Loop + Scope
```js
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

### 執行結果：
（第0秒）i: 0  
（第0秒）i: 1
（第0秒）i: 2
（第0秒）i: 3
（第0秒）i: 4

（第0秒） 5
（第1秒） 5
（第2秒） 5
（第3秒） 5
（第4秒） 5


#### console.log('i: ' + i) 執行流程
每跑一遍迴圈依序列印 i 值 （輸出時間第 0 秒）


#### console.log(i) 執行流程
第一圈（**i = 0**）跑到 `setTimeout()` 時，會是
```js
setTimeout(() => {
    console.log(i)
  }, 0 * 1000)
```
丟到 **WebApi** 裡執行 **0** 秒，在放到 **Callback Queue** 中等待 **Call Stack** 為空時再丟出去。 

---

第二圈（**i = 1**）跑到 `setTimeout()` 時，會是
```js
setTimeout(() => {
    console.log(i)
  }, 1 * 1000)
```
丟到 **WebApi** 裡執行 **1** 秒，在放到 **Callback Queue** 中等待 **Call Stack** 為空時再丟出去。 

---
依此列推，從頭到尾分別有五個 `setTimeout()` 分別等待 0~4 秒要將 `console.log(i)` 丟回 **Call Stack** 中
<br>

當到 **i=5** 時，for 迴圈結束，**Call Stack** 為空 （輸出時間第0秒）

將等待 0 秒的 `console.log(i)` 放回 **Call Stack**，此時 i=5，輸出 5（輸出時間第 0 秒）
再將等待 1 秒的 `console.log(i)` 放回 **Call Stack**，此時 i=5，輸出 5（輸出時間第 1 秒）
再將等待 2 秒的 `console.log(i)` 放回 **Call Stack**，此時 i=5，輸出 5（輸出時間第 2 秒）
再將等待 3 秒的 `console.log(i)` 放回 **Call Stack**，此時 i=5，輸出 5（輸出時間第 3 秒）
再將等待 4 秒的 `console.log(i)` 放回 **Call Stack**，此時 i=5，輸出 5（輸出時間第 4 秒）

