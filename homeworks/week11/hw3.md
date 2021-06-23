## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫
加密只是將原先文字經過特定程序產生一道**可逆**的密文；
而雜湊則是產生一道**不可逆**的密文，

若將密碼「加密」放進資料庫，系統被駭時這些**可回推**的密碼相對不安全，所通常使用雜湊加鹽。


## `include`、`require`、`include_once`、`require_once` 的差別
include 與 require 的區別：
同樣引入文件的前提下，若此文件不存在 include 仍會繼續執行（警告)，require 則終止程式顯示錯誤訊息。
有加 _once 則是判斷，這項引入請求（include、require）是否被執行過，會從頭查詢一遍列表，若已執行過則不會再執行。雖然效能下降但是能避免重新賦值問題。

## 請說明 SQL Injection 的攻擊原理以及防範方法
注入特意的程式碼去改變原本程式碼的用意，來達到攻擊的效果。
類似 ppt 上留言被截斷卻有著不同結果的效果。
防範：使用 statement、prepare 方式避免連接字串的 query 
```php
$sql = 'SELECT * FROM table WHERE id=?'
$stmt = $conn->prepare($prepare);
$stmt->bind_param('i', $id);
$result = $stmt->execute();
if (!$result){
  die($conn->error);
}
$result = $stmt->get_result();
```

##  請說明 XSS 的攻擊原理以及防範方法
（Cross Site Script）利用瀏覽器輸入的 JS 語法漏洞進而達到其他語法效果的攻擊目的。
防範：客戶端輸入文字後，在輸出前端顯示前都經過 htmlspecialchars() 的函式以確保特殊符號的顯示編碼。

## 請說明 CSRF 的攻擊原理以及防範方法
Cross Site Request Forgery（跨站請求偽造）
攻擊者在網頁偷放置一個目標連結或請求，當使用者無意點擊時發出 request 讓攻擊者達到其他效果的攻擊目的。

防範：最簡單好懂就是現在普遍的第二層驗證方法（圖形驗證、簡訊驗證）
or 幫 Cookie 再加一層驗證

資料來源
 [PHP函數include include_once require和require_once的區別](https://kknews.cc/code/5rxmlb6.html)
 [資訊安全 - 常見攻擊：CSRF CSRF 原理 ( Cross Site Request Forgery )](https://yakimhsu.com/project/project_w12_Info_Security-CSRF.html)
 