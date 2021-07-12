## Webpack 是做什麼用的？可以不用它嗎？
可以將模組化的JS檔打包成單一優化過的JS檔，而經過Webpack的編譯可以很大程度的相容瀏覽器及第三方插件的相互支援。
其中有包含各種loader功能，babel語法轉換、SASS/SCSS轉換、壓縮等等。

可以不用Webpack，但若要在瀏覽器達到 import export 模組化的功能需要自己手動寫碼加入 CommonJS（或其他）標準，甚至要考慮相容性及第三方支援的問題。

## gulp 跟 webpack 有什麼不一樣？
gulp是任務管理，依據設定的指令自動化的執行任務，
例如過去若要將新語法的JS檔轉成相容各執行平台的舊內容檔案，需要手動開啟babel執行指令去轉譯，但可以透過 gulp 的集中管理設定，自動地將新語法的JS自動轉成語法較舊的新檔案。各式各樣的任務都可以設定（也可以自己寫任務function）

webpack比較偏向檔案的打包及編譯，
例如多個模組化的JS檔案可以經過webpack打包成一份JS，這份檔案經過編譯及優化，可以相容各瀏覽器、第三方模組、及容量的有效壓縮。
除了JS檔外，也針對CSS、圖片等等的檔案去做打包資源的轉換與處理。


## CSS Selector 權重的計算方式為何？
**!important** > inline style > ID > Class > Element

!important = 1,0,0,0,0
inline style = 0,1,0,0,0
ID = 0,0,1,0,0
Class = 0,0,0,1,0
Element = 0,0,0,0,1
