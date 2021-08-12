## 什麼是反向代理（Reverse proxy）？

一般狀況下，用戶端發送 request 會直接送到伺服器，
後來發展出了介在用戶端與伺服器端的角色：代理伺服器（proxy server）
用戶端發送 request 到 proxy server，proxy server 再傳給伺服器
透過 proxy server 可以以效的管理（隱藏資訊、控制途徑IP、封鎖功能等等）或是 cache

反過來說，用戶端發送的 request 會先到伺服器端的 proxy server，再由伺服器端的 proxy server 發給特定伺服器。
這就是反向代理

最主要原因是只有一個伺服器能占用 port 80 （HTTP）
若透過反向代理則可以把各種請求轉發給內部各個相應功能的伺服器
否則網址看起來可能會很亂
ex. 
aaa.tw:3000 todo list
aaa.tw:3001 留言板
aaa.tw:3002 部落格
透過 Reverse proxy 則可以改為
todos.aaa.tw
comments.aaa.tw
blog.aaa.tw
更加簡潔語意化

## 什麼是 ORM？
Object-Relational Mapping，物件關聯對映
過往與資料庫互動 SQL 語法指令的方式改成用**物件導向**的概念去操作
模組化的方式可以更簡潔、安全的去從資料庫讀取資料（如避免 sql injection 問題）
基於這些原因維護性也較高（重用與可讀性）


## 什麼是 N+1 problem？

今天有兩個 table：users、comments 關聯為userId
假如 user AA 留了五則留言、BB 留了三則留言

此時前端想render出留言的內容和留言的人
在ORM中就會讀取所有（N筆）的留言內容及**該留言的留言者**（再依照 userId 讀取一次 users table）是為 +1

N+1問題在對資料庫進行大量查詢時會有效能問題
但大部分的ORM都有提出N+1問題的解決方法