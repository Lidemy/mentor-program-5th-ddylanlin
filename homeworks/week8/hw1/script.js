
const background = document.querySelector('.event-bg')
const isMethod = document.querySelector('.eventMethod-block')
const isAnnounce = document.querySelector('.announce-block')

document.querySelector('.eventMethod-block').addEventListener('click', (e) => {
  const request = new XMLHttpRequest()
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      const response = request.responseText
      const json = JSON.parse(response)
      const result = json.prize
      console.log(result)
      if (e.target.classList.contains('eventMethod-btn')) {
        result ? choose(result) : alert('系統不穩定，請重新整理再試一次！（切換錯誤）')
      }
    } else {
      console.log(request.status)
      alert(`系統不穩定，請重新整理再試一次！statusCode: ${request.status}`)
    }
  }
  request.onerror = () => {
    console.log('error')
    alert('系統不穩定，請重新整理再試一次！（onload失敗）')
  }

  request.open('GET', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery', true)
  request.send()

  // 切換頁面
  function choose(result) {
    isMethod.classList.add('hide')
    isAnnounce.classList.remove('hide')
    document.querySelector(`.${result}`).classList.remove('hide')
    background.classList.remove('event-bg')
    background.classList.add(`${result}-bg`)
  }
})

document.querySelector('.announce-block').addEventListener('submit', (e) => {
  if (e.target.classList.contains('announce-btn')) {
    isAnnounce.classList.add('hide')
    isMethod.previousElementSibling.classList.remove('hide')
    background.classList.add('event-bg')
  }
})
