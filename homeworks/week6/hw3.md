## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

#### 1.\<textarea> 多行輸入框
在 input 的表單範圍內，設定行數與列數讓表單放大成為可以輸入多行的文字框。  
`<textarea name="read" cols="10" rows="3" disabled>value</textarea>` （寬為10高為3的輸入表單）
#### 2.\<fieldset> 群組式輸入框
```
<fieldset>
    <legend>Personal details</legend>
    <label>Your name:</label> <input name="yourname">
    <label>Your age:</label> <input type="number" name="yourage">
  </fieldset>
```
![image](https://user-images.githubusercontent.com/82143007/119087140-3c26a580-ba39-11eb-8a54-d39129dc6135.png)

#### 3.\<select> 下拉式選單
```
<select>
    <option>請選擇你最愛的寵物</option>
    <option>Dog</option>
    <option>Cat</option>
    <option>Hamster</option>
    <option>Parrot</option>
    <option>Spider</option>
    <option>Goldfish</option>
</select>
```
表單回傳 value 指定值回伺服器。


## 請問什麼是盒模型（box modal）
在盒子模式中，內容 (content) 是最內層的部分，接下來依序為留白 (padding)、邊框 (border)、以及邊界 (margin)。邊界是用來設定各個元素之間的距離。
而合模型的 box-sizing 主要分兩個：  
預設狀態為 `box-sizing:content-box` 將設定寬度指定給內容，若改變 padding 整體形狀只會往外擴。  
現在大部分方便的用法是使用 `box-sizing:border-box` 將設定寬度指定給邊框，若改變 padding 整體形狀不變，會壓縮到內容。

## 請問 display: inline, block 跟 inline-block 的差別是什麼？
**inline**：物件內容像排隊一樣，在同一列排排站好。（只依據內容，調寬高沒用，上下邊距沒用。）span,a...  
**block**：像一個一個的區，自己獨佔一行。（自己獨佔空間，調整什麼都可以。）div,h1,p...  
**inline-block**：對外像 inline 可併排，對內像 block 可調各種屬性。buttom,input,select...  

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
**static**：預設的狀態。  
**relative**：相對定位（偏移定位），只改變自己的位置不影響其他。  
**absolute**：絕對定位，以某一個參考點做定位(往上找到第一個非 static 做參考點)，同時也會**如浮物般脫離正常排版模組**。  
**fixed**：固定在視窗範圍內的指定位置。  
**sticky**：當指定元素到達指定位置時黏住（從 static 開始到指定位置變 fixed），多用於網頁目錄。

