fetch('https://api.twitch.tv/kraken/games/top?limit=5', {
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-ID': 'gkt742ko5m6tz9fg4ybc0c2bj7hvlr'
  }
})
  .then((res) => { //eslint-disable-line
    return res.json()
  })
  .then((data) => {
    // get top5 into Array
    const topArr = []
    for (let i = 0; i < data.top.length; i++) {
      topArr.push(data.top[i].game.name)
    }

    // nav get top5 games
    for (let i = 0; i < 5; i++) {
      document.querySelector(`nav :nth-child(${i + 1})`).innerText = topArr[i]
    }

    getStreams(topArr[0]) // 回傳函數執行：預設首頁為 top1

    // nav 點擊對應按鈕
    document.querySelector('nav').addEventListener('click', (e) => {
      console.log(e.target)
      for (let i = 0; i < 5; i++) {
        if (e.target === document.querySelector(`nav :nth-child(${i + 1})`)) {
          getStreams(topArr[i])
        } // 回傳函數執行
      }
    })
  })
  .catch((error) => {
    console.log(error.message)
  })

function getStreams(game) {
  return fetch(`https://api.twitch.tv/kraken/streams/?game=${game}`, {
    headers: {
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': 'gkt742ko5m6tz9fg4ybc0c2bj7hvlr'
    }
  })
    .then((res) => { //eslint-disable-line
      return res.json()
    })
    .then((data) => {
      document.querySelector('.page-title').innerText = game // 改標題
      document.querySelector('.section-block').innerText = '' // 每換一頁先清空頁面

      // 頁面資料抓取更新
      for (let i = 0; i < 20; i++) {
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `
          <a href="${data.streams[i].channel.url}">
          <img src="${data.streams[i].preview.medium}" class="cover"></img>
          <div class="caption">
            <img src="${data.streams[i].channel.logo}" class="logo"></img>
            <div class="content">
              <p>${data.streams[i].channel.status}</p>
              <p>${data.streams[i].channel.display_name}</p>
            </div>
          </div>
          </a>
          `

        document.querySelector('.section-block').appendChild(div)
      }

      // 創造透明假區排版
      const fake = document.createElement('div')
      fake.classList.add('fake')
      document.querySelector('.section-block').appendChild(fake)
    })
    .catch((error) => {
      console.log(error.message)
    })
}
