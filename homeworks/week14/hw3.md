## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
DNS（Domain Name Server）網域名稱系統，將機器理解的192.0.0.0等等的IP位址（IPv4與IPv6）轉譯為人好讀好記的特定英文組合，執行時使用者只要輸入特定的英文組合即可透過瀏覽器及伺服器轉譯成機器看懂的IP位址進而訪問。

一般DNS因為應付眾多的使用者，DNS重載通常會非常擁塞而降低速度
而Google 的 Public DNS 利用全球範圍的伺服器來達到效能與速度的改善及提高安全標準（減少層層的造訪）
對我們來說有使用體驗上的一大優點，同時也有資料蒐集的隱私顧慮

## 什麼是資料庫的 lock？為什麼我們需要 lock？
交易資料鎖定，當多筆資料同時讀取的時候，彼此會產生影響
例如A與B同時搶最後一張的票券，同時處理時可能會造成超賣的後果
透過lock（鎖定）可以讓先擷取（先進入頁面的）執行擷取，同時暫時關掉所有其他擷取請求（或可以說標記這個功能正在被讀取中）直到這次擷取完成
可以避免多方同時購物交易讀取資料等等所衍伸的競爭問題，但同時也要考慮有可會造成效能上的損耗。

## NoSQL 跟 SQL 的差別在哪裡？
關聯式資料庫與非關聯式資料庫（Not Only SQL）
NoSQL可以處理大量非結構化的資料，並且靈活運用
但也因為非結構化，缺少 SQL 的 ACID 標準，會讓維護上更加不容易


## 資料庫的 ACID 是什麼？
關聯式資料庫所具備的四項特性

Atomicity（原子性）：交易中的所有指令按照順序及步驟執行，若其中出錯則回到最原先的狀態，來確保每次的擷取結果都是正確的（只有成立與不成立）。
*例如我要進行刷卡扣款，到最後一步時伺服器當機，此時交易狀態會回到我未結帳的狀態重新來過，而不會因為當機重來後重複扣款。*

Consistency (一致性）：資料的完整性受到一定的規範，在交易時不會被破壞影響。

Isolation (隔離性）：多筆擷取（交易）同時進行，未完成的交易資料並不會被其他交易使用，直到此交易完成。

Durability（持續性）：寫入資料後，數據是永久存在的，不會因故障而改變。
