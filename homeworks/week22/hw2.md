## 請列出 React 內建的所有 hook，並大概講解功能是什麼

#### useState
保留記錄狀態的值，且有 function 能針對此值做改動：[state, setState]
react 裡畫面的渲染全依據 state，更動此值即是改變畫面

#### useState
useState func 會在渲染完畫面後執行，且給第二個參數（ dependencies）能去指定什麼條件下執行與否
```js
useEffect(()=>{
  // do something
},[change])
```
例如只有在變數 `change` 改變時才會從新跑一次 useEffect 裡內容，
也可放入空陣列，代表只執行渲染完後的一次，常用來作為 API 的 fetch

#### useContext
若不用此方法，component 裡有 component 多層巢狀的架構下，參數的傳遞需要一層一層依序用 props 帶入，
但用 useContext 後，只需要在最上層定義及包覆（Context.Provider），即可在以下每一層的 component 裡呼叫使用拿到參數值。

#### useRef
有些參數希望能改變同時不渲染在畫面上，即可使用 useRef，
可以在不 re-render 的狀態下更新值，甚至可以直接抓取 DOM 進而控制
如不需要顯示在頁面上的 id 或計數器等等

#### useCallback
若將 func 放入 useEffect 的 dependencies 中，雖然 func 都是一樣的，但對系統來說每次 render 都會產生新的 instance 每個 func 都不同，此時每次 render 都會再重新跑一次 useEffect，降低效能甚至可能陷入無窮迴圈。

可以使用 useCallback 將此 func 保留下來，不會隨著每次執行產生不同的 instance，再將此 useCallback func 丟到 useEffect 即可解決效能及 loop 問題。

「如果某個函式不需要被覆用，那麼可以直接定義在 useEffect 中，但若該方法會需要被共用，則把該方法提到 useEffect 外面後，記得用 useCallback 進行處理後再放到 useEffect 的 dependencies 中」--PJ

#### useMemo
與 useCallback 類似，useCallback 是用來在 dependencies 沒有改變的情況下，把某個 func 保存下來，useMemo 則是會在 dependencies 沒有改變的情況下，把某個運算的結果保存下來（複雜耗能的運算）。
useMemo 會在 render 期間執行

useCallback(func, deps) 等同於 useMemo(() => func, deps)

#### useReducer
若要處理複雜且多個 state 邏輯，useReducer 會比 useState 更適合。
dispatch 也能解決重複 re-render 的問題，就不用包太多 useCallback 或 useMemo。


## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

#### Mounting 
* constructor：初始化
* static getDerivedStateFromProps：會在每一次 render 之前被呼叫執行
* ~~componentWillMount：只會被執行一次~~
* render：渲染
* componentDidMount：DOM 已完成 ，這時可以 call API 來更新資料，任何需要 DOM 或會 Asynchronous 更新 state 狀態的操作都適合放在此做。

#### Updating 
* ~~componentWillReceiveProps ：props 改變時才觸發~~
* static getDerivedStateFromProps
* shouldComponentUpdate：自己判斷是否要更新，如果回傳false這邊就不在往下執行render
* ~~componentWillUpdate：元件準備 render 之前被執行~~
* render
* getSnapshotBeforeUpdate ：component更新前執行
* componentDidUpdate ：當 props、state 更新 ，就會觸發組件更新 DOM

#### Unmounting 
* componentWillUnmount：component 從 DOM 被移除 ，在這階段可以用來清除

## 請問 class component 與 function component 的差別是什麼？

#### Class component
* 需要用this（透過 cunstructor 初始化 props 並綁定 this 指向）
* 較多的元件生命週期與 batch 能處理較複雜的狀況
* 隨時都可以用 this.props.onChange 拿到最新的屬性

#### Function component
* 不需要用 this（透過閉包的形式來管理狀態）
* 模組化職責上能切割得更乾淨
* 編譯更快
* 沒有繼承（更少程式碼）
* 每一次 render 就是一次 function call，而傳進來的 props 就會是「當時」的 props

Class component 隨時都可以用 this.props.onChange 拿到最新的屬性，以各個階段（DidMount 等生命週期）去思考狀態的改變
Function component 每一次 render 就是一次新的 call，而傳進來的 props 就會是當時的 props，以 Function 角度去思考各自的改變。

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

「資料受不受到 React 所控制」

* uncontrolled：document.querySelector 選到該元素，針對 value 去改值
* controlled：由 react 處理資料狀態。

`<input />` 類的表單元素能使用 controlled or uncontrolled
controlled or uncontrolled 都能達到一樣目的，但是在使用 react 環境時，同時對多個資料 state 處理及控制畫面時，使用 controlled component 會相對容易。
（上傳檔案用的 `<input type="file" />` 有安全性的疑慮無法被 react 控制，只能用 Uncontrolled Components 的方式處理）

