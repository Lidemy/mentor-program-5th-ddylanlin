// 隱藏文字
document.querySelector('.sectionList').addEventListener('click', (e) => {
  if (e.target.classList.contains('checkbox')) {
    e.target.parentElement.childNodes[1].classList.toggle('activeCheck')
    e.target.parentElement.childNodes[3].classList.toggle('activeText')
    e.target.parentElement.childNodes[5].classList.toggle('activeIcon')
    e.target.parentElement.childNodes[7].classList.toggle('activeIcon')

    console.log(e.target.innerText)
    if (e.target.innerText === '') {
      e.target.innerText = 'V'
    } else {
      if (e.target.innerText === 'V') {
        e.target.innerText = ''
      } else {
        e.target.innerText = 'V'
      }
    }
  }
  if (e.target.classList.contains('row')) {
    // console.log(e.target.childNodes)
    e.target.childNodes[1].classList.toggle('activeCheck')
    e.target.childNodes[3].classList.toggle('activeText')
    e.target.childNodes[5].classList.toggle('activeIcon')
    e.target.childNodes[7].classList.toggle('activeIcon')

    console.log(e.target.children[0].innerText)
    if (e.target.children[0].innerText === '') {
      e.target.children[0].innerText = 'V'
    } else {
      if (e.target.children[0].innerText === 'V') {
        e.target.children[0].innerText = ''
      } else {
        e.target.children[0].innerText = 'V'
      }
    }
  }

  if (e.target.classList.contains('checkText')) {
    console.log(e.target.parentElement.childNodes)
    e.target.parentElement.childNodes[1].classList.toggle('activeCheck')
    e.target.parentElement.childNodes[3].classList.toggle('activeText')
    e.target.parentElement.childNodes[5].classList.toggle('activeIcon')
    e.target.parentElement.childNodes[7].classList.toggle('activeIcon')

    if (e.target.parentElement.children[0].innerText === '') {
      e.target.parentElement.children[0].innerText = 'V'
    } else {
      if (e.target.parentElement.children[0].innerText === 'V') {
        e.target.parentElement.children[0].innerText = ''
      } else {
        e.target.parentElement.children[0].innerText = 'V'
      }
    }
  }
})

// 刪除
document.querySelector('.sectionList').addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-delete')) {
    document.querySelector('.sectionList').removeChild(e.target.closest('.row'))
  }
})

// input新增
document.querySelector('#send').addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    const elements = document.createElement('div')
    elements.classList.add('row')
    elements.innerHTML = `
    <p class="checkbox"></p>
    <p class='checkText'>${e.target.value}</p>
    <p class="btn-edit">edit</p>
    <p class="btn-delete">X</p>
    `
    const reforeNode = document.querySelector('.row')

    document.querySelector('.sectionList').insertBefore(elements, reforeNode)

    e.target.value = ''
  }
})
