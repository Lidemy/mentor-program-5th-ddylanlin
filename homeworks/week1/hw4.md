## 跟你朋友介紹 Git

簡而言之 Git 就是一套**版本控制**的系統，最初開發是為了更方便地在程式設計中的協同作業（或是不同開發版本的控制）。  
  
不過以蔡哥的需求 Git 也是非常適合做笑話的集錦跟整理，例如你今天第一次講了 A 笑話，之後想想覺得哪裡可以修改的更好笑，於是就有了 A1 笑話，每次都針對笑話修改一點（不同版本），使用 Git 可以完整地紀錄每一個笑話的每一個版本，甚至可以將兩個笑話合併成一個超好笑的笑話呢！  
以蔡哥的笑話需求，就是邏輯的整理根目錄、子目錄及項目，讓你以後一目瞭然，不再整理到頭痛！  
  
### 基礎使用

首先要初始模組化一個版本控制，就要先輸入 `git init`，  
在將笑話（檔案）加到暫存區 `git add "笑話"`，  
最後在將笑話丟進版本控制中 `git commit -m"笑話"`，  
同時都可以透過 `git status` 及 `git log` 查詢版本的狀態跟紀錄，  
這就是最基礎的 local 版本控制。  

如果要研究開發新笑話，更是可以用到**支鏈**的概念 `git branch 新笑話`，  
創造一個支鏈(新笑話)，不斷地修改，最後成熟時再將新笑話合併到你的主要笑話庫中！  
  
如果你以後有個「蔡哥笑話團隊」，那更是需要使用到 GitHub，  
團隊中成員協同合作，將自己的笑話丟到討論群組中（GitHub）：Push  
或是將群組中的笑話存到自己的筆記本來修改：Pull  
當遇到同個笑話有不同見解時（Conflict）再實際的討論就好，其他時間團隊可以更有效率的開發各式各樣新笑話呢！  

