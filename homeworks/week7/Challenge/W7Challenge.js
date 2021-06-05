// 現在用的方法是針對按鈕做偵測並下反應
// （這邊的反應是另設一個 `display:none`的 class 去 Toggle）
// 再用 function 的方式記錄當前的 silde

// 最基本版的功能都做出來了，但是我目前做不到「滑動的效果」

// 我猜是要用到 animation 去做特效（或者是我整個方向錯誤旭要重新思考 HTML 跟 JS）。

// 但是我來回試幾個 animation 方法幾個位置還是沒辦法完成，
// 這題卡太久了，暫時先放著

let current = 2
document.querySelector('.carousel').addEventListener('click', (e) => {
  const prevbtnClass = document.querySelector('.prev-btn').classList
  const nextbtnClass = document.querySelector('.next-btn').classList
  const s1Class = document.querySelector('.s1').classList
  const s2Class = document.querySelector('.s2').classList
  const s3Class = document.querySelector('.s3').classList

  // 判斷當前頁面做反應
  function hideArrow(index) {
    if (index === 1) {
      nextbtnClass.remove('hide')
      prevbtnClass.add('hide')
      s1Class.add('stopS')
      s2Class.remove('stopS')
      s3Class.remove('stopS')
    }
    if (index === 3) {
      nextbtnClass.add('hide')
      prevbtnClass.remove('hide')
      s1Class.remove('stopS')
      s2Class.remove('stopS')
      s3Class.add('stopS')
    }
    if (index === 2) {
      nextbtnClass.remove('hide')
      prevbtnClass.remove('hide')
      s1Class.remove('stopS')
      s2Class.add('stopS')
      s3Class.remove('stopS')
    }
  }

  // 以函式方式記錄當前位置 改變並回傳
  function next(index) {
    current = index + 1
    hideArrow(current)
    return current
  }

  function prev(index) {
    current = index - 1
    hideArrow(current)
    return current
  }

  // 如果按到下一頁按鈕
  if (e.target.classList.contains('next-btn')) {
    document.querySelector(`.silde${current}`).classList.toggle('hide')
    document.querySelector(`.silde${current + 1}`).classList.toggle('hide')
    next(current)
  }

  // 如果按到上一頁按鈕
  if (e.target.classList.contains('prev-btn')) {
    document.querySelector(`.silde${current - 1}`).classList.toggle('hide')
    document.querySelector(`.silde${current}`).classList.toggle('hide')
    prev(current)
  }

  // 針對下方選擇鈕做反應
  for (let i = 1; i <= 3; i++) {
    if (e.target.classList.contains(`s${i}`)) {
      document.querySelector(`.silde${i}`).classList.toggle('hide')
      document.querySelector(`.silde${current}`).classList.toggle('hide')
      current = i
      hideArrow(current)
    }
  }
})
