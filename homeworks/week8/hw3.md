## 什麼是 Ajax？
（Asynchronous JavaScript and XML）非同步與伺服器交換資料的 JavaScript 方式。
Ajex 可以只向伺服器傳送、取回必要的資料，並用 JavaScript 處理伺服器的回應，不用重新整理頁面浪費不必要的空間時間。

## 用 Ajax 與我們用表單送出資料的差別在哪？
表單送出類似於提交的功能，用表單傳送取得資料後每次都會換新的一頁，
有些狀況若只想要部分畫面有改變（其他功能操作）的話就需要用的 Ajex。
如果要在 Ajax 提交成功後重新整理頁面，可以呼叫 window 物件的 location 屬性的 load() 方法重新載入當前文件。
如這次作業 1 重新整理抽獎，我將按鈕附屬於 form，但老師的解法是在 HTML 裡加 `onclick="javascript:window.location.reload()"`

## JSONP 是什麼？
（JSON with Padding），可以利用某些標籤不受同源政策的影響進而去改變（取得）其他網域的資料，例如 img、script，網頁可以得到動態產生的資料。

## 要如何存取跨網域的 API？
基於同源政策（Same Origin Policy），若要取得跨網域的資料，需要透過 **跨來源資源共用 CORS**（Cross-Origin Resource Sharing），
使用額外的 header （access control allow origin）來取得其他網域的資料權限。

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
第四周串接時主要是透過 Node.js，
而這周的串接則是透過瀏覽器，瀏覽器基於安全考量會去做某種程度上的限制（或增加額外資訊）。

