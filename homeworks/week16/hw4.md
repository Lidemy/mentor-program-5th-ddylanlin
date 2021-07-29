## hw4：What is this?
```js
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // 2
obj2.hello() // 2
hello() // undefined
```

this 與 Function 呼叫的方式有關

#### obj.inner.hello()

此時的 this 指向上一層 inner，inner 裡的 value 就會是 **2**

#### obj2.hello()
因為 `const obj2 = obj.inner` 所以類似於 `obj.inner.hello()`：
```js
inner{
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
```
此時的 this 指向上一層 inner，inner 裡的 value 就會是 **2**


#### hello()
因為 `const hello = obj.inner.hello` ，所以 hello 被賦予 inner 裡的 Function，類似於：
```js
function() {
  console.log(this.value)
}
```
純粹執行一個 Function，在非物件導向中 this 就會是 undefined
