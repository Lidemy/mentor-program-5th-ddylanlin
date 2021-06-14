// 方法二 分別設兩個request的function，用function裡面帶function的方式（callback?）取得值作業
function getGames(callback) {
  const request = new XMLHttpRequest()
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      const json = JSON.parse(request.response)

      // get top5 into Array
      const topArr = []
      for (let i = 0; i < json.top.length; i++) {
        topArr.push(json.top[i].game.name)
      }

      // nav get top5 games
      for (let i = 0; i < 5; i++) {
        document.querySelector(`nav :nth-child(${i + 1})`).innerText = topArr[i]
      }

      callback(topArr[0]) // 回傳函數執行：預設首頁為 top1

      // nav 點擊對應按鈕
      document.querySelector('nav').addEventListener('click', (e) => {
        console.log(e.target)
        for (let i = 0; i < 5; i++) {
          if (e.target === document.querySelector(`nav :nth-child(${i + 1})`)) {
            callback(topArr[i])
          } // 回傳函數執行
        }
      })
    } else {
      console.log('error')
      console.log(request.status)
    }
  }
  request.onerror = () => {
    console.log('error')
  }
  request.open('GET', 'https://api.twitch.tv/kraken/games/top?limit=5', true)
  request.setRequestHeader('Client-Id', 'gkt742ko5m6tz9fg4ybc0c2bj7hvlr')
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
  request.send()
}

// 實況頁面
function getStreams(game) {
  const request = new XMLHttpRequest()
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      const json = JSON.parse(request.response)

      document.querySelector('.page-title').innerText = game // 改標題
      document.querySelector('.section-block').innerText = '' // 每換一頁先清空頁面

      // 頁面資料抓取更新
      for (let i = 0; i < 20; i++) {
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `
          <a href="${json.streams[i].channel.url}">
          <img src="${json.streams[i].preview.medium}" class="cover"></img>
          <div class="caption">
            <img src="${json.streams[i].channel.logo}" class="logo"></img>
            <div class="content">
              <p>${json.streams[i].channel.status}</p>
              <p>${json.streams[i].channel.display_name}</p>
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

      // 創造閱讀更多的按鈕
      const btn = document.createElement('button')
      document.querySelector('.section-block').appendChild(btn)

      // 超過20後的按鈕功能
      document.querySelector('main').addEventListener('click', (e) => {
        if (e.target === document.querySelector('button')) {
          for (let i = 20; i < json.streams.length; i++) {
            const div = document.createElement('div')
            div.classList.add('card')
            div.innerHTML = `
              <a href="${json.streams[i].channel.url}">
              <img src="${json.streams[i].preview.medium}" class="cover"></img>
              <div class="caption">
                <img src="${json.streams[i].channel.logo}" class="logo"></img>
                <div class="content">
                  <p>${json.streams[i].channel.status}</p>
                  <p>${json.streams[i].channel.display_name}</p>
                </div>
              </div>
              </a>
              `
            document.querySelector('.section-block').appendChild(div)
          }
          e.target.remove()
        }
      })
    } else {
      console.log('error')
      console.log(request.status)
    }
  }
  request.onerror = () => {
    console.log('error')
  }
  request.open('GET', `https://api.twitch.tv/kraken/streams/?game=${game}`, true)
  request.setRequestHeader('Client-Id', 'gkt742ko5m6tz9fg4ybc0c2bj7hvlr')
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
  request.send()
}

getGames(getStreams)

// // （記錄用）方法一 在取得TOP5的request function裡面，包另一個request Streams的function
// const reqTopGames = new XMLHttpRequest()
// reqTopGames.onload = function () {
//   if (reqTopGames.status >= 200 && reqTopGames.status < 400) {
//     const topGames = JSON.parse(reqTopGames.response)

//     // get top5 into Array
//     const topArr = []
//     for (let i = 0; i < topGames.top.length; i++) {
//       topArr.push(topGames.top[i].game.name)
//     }

//     // nav get top5
//     for (let i = 0; i < 5; i++) {
//       document.querySelector(`nav :nth-child(${i + 1})`).innerText = topArr[i]
//     }

//     getInfo(topArr[0]) //預設載入頁面為 No1

//     // 監聽按鈕對應遊戲
//     document.querySelector('nav').addEventListener('click', (e) => {
//       console.log(e.target)
//       for (let i = 0; i < 5; i++) {
//         if (e.target === document.querySelector(`nav :nth-child(${i + 1})`))
//           getInfo(topArr[i])
//       }
//     })

//         function getInfo(game) {
//           const request = new XMLHttpRequest()
//           request.onload = function () {
//             if (request.status >= 200 && request.status < 400) {
//               const json = JSON.parse(request.response)

//               document.querySelector(`.page-title`).innerText = game // 改標題
//               document.querySelector('.section-block').innerText = '' // 先清空頁面
//               // 頁面資料抓取更新
//               for (let i = 0; i < 20; i++) {
//                 const div = document.createElement('div')
//                 div.classList.add('card')
//                 div.innerHTML = `
//                 <a href="${json.streams[i].channel.url}">
//                 <img src="${json.streams[i].preview.medium}" class="cover"></img>
//                 <div class="caption">
//                   <img src="${json.streams[i].channel.logo}" class="logo"></img>
//                   <div class="content">
//                     <p>${json.streams[i].channel.status}</p>
//                     <p>${json.streams[i].channel.display_name}</p>
//                   </div>
//                 </div>
//                 </a>
//                 `
//                 document.querySelector('.section-block').appendChild(div)
//               }

//             } else {
//               console.log('error')
//               console.log(request.status);
//             }
//           }
//           request.onerror = function () {
//             console.log('error')
//           }
//           request.open('GET', `https://api.twitch.tv/kraken/streams/?game=${game}`, true)
//           request.setRequestHeader('Client-Id', 'gkt742ko5m6tz9fg4ybc0c2bj7hvlr')
//           request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
//           request.send()
//         }

//   } else {
//     console.log('error')
//     console.log(reqTopGames.status);
//   }
// }
// reqTopGames.onerror = function () {
//   console.log('error')
// }
// reqTopGames.open('GET', `https://api.twitch.tv/kraken/games/top?limit=5`, true)
// reqTopGames.setRequestHeader('Client-Id', 'gkt742ko5m6tz9fg4ybc0c2bj7hvlr')
// reqTopGames.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
// reqTopGames.send()
