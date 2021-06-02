
const process = require('process')
const request = require('request')

const url = 'https://restcountries.eu/rest/v2/name/'
const input = process.argv[2]
request(
  { url: `${url}${input}` },
  (error, response, body) => {
    const json = JSON.parse(body)
    if (response.statusCode >= 200 && response.statusCode < 300) {
      for (let i = 0; i < json.length; i++) {
        console.log('============')
        // console.log(json)
        console.log(`國家:${json[i].name}`)
        console.log(`首都:${json[i].capital}`)
        console.log(`貨幣:${json[i].currencies[0].code}`)
        console.log(`國碼:${json[i].callingCodes[0]}`)
      }
    } else if (response.statusCode >= 400 && response.statusCode < 500) {
      console.log('找不到國家資訊')
    }
  })
