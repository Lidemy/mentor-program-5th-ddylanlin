// 因為 Move function declaration to function body root. eslint(no-inner-declarations)
// 所以改動了順序 但更不好閱讀!?
const request = new XMLHttpRequest()
request.onload = () => {
  if (request.status >= 200 && request.status < 400) {
    const response = request.responseText
    const json = JSON.parse(response)
    const result = json.prize
    console.log(result)

    document.querySelector('.announce-block').addEventListener('submit', (e) => {
      if (e.target.classList.contains('announce-btn')) {
        isAnnounce.classList.add('hide')
        isMethod.previousElementSibling.classList.remove('hide')
        background.classList.add('event-bg')
      }
    })

    document.querySelector('.eventMethod-block').addEventListener('click', (e) => {
      if (e.target.classList.contains('eventMethod-btn')) {
        switch (result) {
          case 'FIRST':
            choose(result)
            break
          case 'SECOND':
            choose(result)
            break
          case 'THIRD':
            choose(result)
            break
          case 'NONE':
            choose(result)
            break
          default:
            alert('系統不穩定，請重新整理再試一次！')
        }
      }
    })
  } else {
    console.log(request.status)
    alert('系統不穩定，請重新整理再試一次！')
  }

  const background = document.querySelector('.event-bg')
  const isMethod = document.querySelector('.eventMethod-block')
  const isAnnounce = document.querySelector('.announce-block')

  // 切換頁面
  function choose(result) {
    isMethod.classList.add('hide')
    isAnnounce.classList.remove('hide')
    document.querySelector(`.${result}`).classList.remove('hide')
    background.classList.remove('event-bg')
    background.classList.add(`${result}-bg`)
  }
}
request.onerror = () => {
  console.log('error')
  alert('系統不穩定，請重新整理再試一次！')
}

request.open('GET', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery', true)
request.send()
