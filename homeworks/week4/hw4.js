/* eslint-disable no-unused-vars */
const process = require('process')
const request = require('request')

const url1 = 'https://api.twitch.tv/kraken/games/top'
// const input = process.argv[2]

request({
  url: url1,
  headers: {
    'Client-ID': 'gkt742ko5m6tz9fg4ybc0c2bj7hvlr',
    Accept: 'application/vnd.twitchtv.v5+json'
  }
},
(error, response, body) => {
  const json = JSON.parse(body)
  for (let i = 0; i < json.top.length; i++) {
    console.log(json.top[i].viewers, json.top[i].game.name)
  }
})
