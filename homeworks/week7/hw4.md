## 什麼是 DOM？
文件物件模型（Document Object Model），用樹狀的結構去表示 HTML 跟 CSS 裡面的內容，包括各個標籤、文字、圖片等等。  
而 DOM 就像是溝通的橋樑，是程式設計與瀏覽器之間的通訊協定。  
透過這個已定義的協定，可以透過層層的架構、語法在瀏覽器上執行功能。  

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
基於 DOM 的架構，會先觸發點擊的元素，再依序往回觸發父層 DOM 元素。  
主要有捕獲與冒泡，由最上層（window）依序向下抓取（捕獲）觸發的事件，  
當抓到觸發的事件（Target）時，依序往上傳遞事件（冒泡）。  
而`addEventListener`則為針對冒泡階段做的監聽（預設為false）  

## 什麼是 event delegation，為什麼我們需要它？
Event delegation 事件代理，除了老師在範例中的新增按鍵以外，  
在表單通訊錄的範例中，[我直觀的對刪除按鈕做監測反應](https://github.com/Lidemy/forum/discussions/127)，  
但是程式抓到的只有第一個而已，動態新增按鈕之後刪除按鈕監測的這一行並不會重跑，  
所以之後的按鈕都沒反應，而解決的方法是用 event delegation。  
監測整個指定的區域，若符合條件（包含 delete 元素），則執行。  

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？
**event.preventDefault()** ：阻止預設行為，最簡單的例子就是輸入兩次密碼，  
帳號密碼登入的基本功能都寫好時（submit），可以再下個判斷式，  
若密碼兩次輸入的不同則取消原先功能 event.preventDefault() （無法再submit）。  
**event.stopPropagation()** : 阻止事件傳遞，依照 DOM 的補貨與冒泡架構，  
事件的觸發會層層的傳遞，可以設定在某一層停止傳遞的行為以達到需要的應用。  
