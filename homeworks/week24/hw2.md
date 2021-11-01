## Redux middleware 是什麼？
middleware 就如同 express 的 middleware 概念，
使用第三方的（或自己寫）的中間件，去達成在指定時間點做出不同的處理。
在 react 與 redux 之間，經常使用 middleware 來處理 logger、非同步事件。

## CSR 跟 SSR 差在哪邊？為什麼我們需要 SSR？
 CSR (Client Side Rendering)：用戶端請求渲染頁面
 SSR (Server Side Rendering)：伺服器端渲染頁面
 SSR 和 CSR 只有一開始的 Render 不同！server 的 res 會在初始頁面後被載入，接手運作使用者在畫面上的行為。
 SSR 主要是為了解決 CSR SPA 的 SEO 問題，以及減少用戶端的請求次數增加使用體驗。

## React 提供了哪些原生的方法讓你實作 SSR？
SSR 實際 render 頁面的方式是向渲染伺服器請求 HTML，渲染伺服器會將 HTML 以字串的形式回傳，瀏覽器再解析其內容並呈現畫面。而 React 的 ReactDOMServer 提供了 renderToString() 的方法將 component 轉換成 HTML 字串，就可以在第一次 render 時從伺服器端產生 HTML。不過這是這個元素無法作出任何互動，無法添加 addEventListener 來監聽事件。
所以接著再使用 ReactDOM.hydrate() 注水 再把元素加入該有的功能，如此一來 browser 能看到 html 的內容，而 client 也能與網頁正常互動。

## 承上，除了原生的方法，有哪些現成的框架或是工具提供了 SSR 的解決方案？至少寫出兩種

Next.js: 內建 SSR 機制。
prerender.io: 將 Js 檔案 render 的內容存成靜態 HTML，搜尋引擎就可以爬到該 HTML 內容。
