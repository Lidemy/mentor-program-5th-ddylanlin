## 為什麼我們需要 Redux？
隨著專案規模越來越大，SPA 的要求越來越複雜，管理這個不斷變化的 state 也就越來越困難，
失去對 state 何時、為何、如何的控制權，不透明且充滿不確定性，就很難去 debug 或優化功能。
Redux 藉由強加某些限制在更新發生的方式和時機上，試圖讓 state 的變化更有可預測性。

## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？
三大元件：
action: 描述發生的事件類別(type)，以及所承載的資訊(payload)。
reducer: 一個函式，負責將給定的 state 根據給定的 action 做變化而得到新的 state。
store: 整個 Redux 運作的核心，負責儲存整個 state tree，每個專案只會有一個 store。

三大原則：
唯一資訊來源：整個專案的 state，被儲存在一個樹狀物件放在唯一的 store 裡面。
State 是唯讀的：改變 state 的唯一的方式是發出一個 action，也就是一個描述發生什麼事的物件。
變更被寫成 pure function：要指定 state tree 如何藉由 action 來轉變，你必須撰寫 pure reducer。

資料流程：
1. 事件發生： 例如使用者點擊某元件 onclick
2. 發送 action： Action Creator 向 Store 發送 action
3. 更改 state： Store 調用 Reducer ，給予 state 和 action 而得到新的 state。
4. 發佈通知： 需要用到 state 的元件會向 store 訂閱通知，一但 state 有變化，即會收到通知，可重新取得所需 state，重新渲染元件。


## 該怎麼把 React 跟 Redux 串起來？

