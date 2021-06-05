// 把每個各別項目分三項去可製化CSS：checkbox、text、刪除鍵
// 一個點擊反應要同時控制這三項，暫時想不出其他比較不囉嗦的解法（單點擊父層無法完全改變子層效果）

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// 刪除
document.querySelector('.section-list').addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-delete')) {
    document.querySelector('.section-list').removeChild(e.target.closest('.row'))
  }
})

// input新增
document.querySelector('#send').addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    const safeValue = escapeHtml(e.target.value) // 判斷escapeHtml function
    const elements = document.createElement('div')
    elements.classList.add('row')
    elements.innerHTML = `
    <p class="checkbox"></p>
    <p class='check-text'>${safeValue}</p>
    <p class="btn-edit">edit</p>
    <p class="btn-delete">X</p>
    `
    const reforeNode = document.querySelector('.row')

    document.querySelector('.section-list').insertBefore(elements, reforeNode)

    e.target.value = ''
  }
})

// 檢查並開關checkbox裡是否有V
function checkboxToggleV(target) {
  if (target.innerText === '') {
    return (target.innerText = 'V')
  } else if (target.innerText === 'V') {
    return (target.innerText = '')
  }
}

// 開關各個 active calss
function activeToggle(targetNode) {
  targetNode.childNodes[1].classList.toggle('active-check')
  targetNode.childNodes[3].classList.toggle('active-text')
  targetNode.childNodes[5].classList.toggle('active-icon')
  targetNode.childNodes[7].classList.toggle('active-icon')
}

// 隱藏文字
document.querySelector('.section-list').addEventListener('click', (e) => {
  if (e.target.classList.contains('checkbox')) {
    activeToggle(e.target.parentElement)
    checkboxToggleV(e.target)
  }

  if (e.target.classList.contains('row')) {
    activeToggle(e.target)
    checkboxToggleV(e.target.children[0])
  }

  if (e.target.classList.contains('check-text')) {
    activeToggle(e.target.parentElement)
    checkboxToggleV(e.target.parentElement.children[0])
  }
})
