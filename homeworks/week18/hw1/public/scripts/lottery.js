const background = document.querySelector('.event-bg')
const isMethod = document.querySelector('.eventMethod-block')
const isAnnounce = document.querySelector('.announce-block')

async function lotteryData() {
  try {
    const response = await fetch('/lottery/api')
    // https://lit-stream-79960.herokuapp.com/lottery
    if (!response.ok) {
      console.log(response.status)
      alert(`系統不穩定，請再試一次！statusCode: ${response.status}`)
    }
    return await response.json()
  } catch (err) {
    console.log('error', err)
    alert('系統不穩定！（heroku request失敗）')
  }
}

async function renderResult() {
  const result = await lotteryData()
  document.querySelector('.lottery-result').innerText = result.prize
  document.querySelector('.announce-desc').innerText = result.desc
  isMethod.classList.add('hide')
  isAnnounce.classList.remove('hide')
  background.style.backgroundImage = `url(${result.imageURL})`
}

document.querySelector('.eventMethod-block').addEventListener('click', (e) => {
  if (e.target.classList.contains('eventMethod-btn')) {
    renderResult()
  }
})

document.querySelector('.announce-block').addEventListener('submit', (e) => {
  if (e.target.classList.contains('announce-btn')) {
    isAnnounce.classList.add('hide')
    background.classList.add('event-bg')
  }
})
