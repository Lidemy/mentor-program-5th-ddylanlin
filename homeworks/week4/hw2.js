const request = require('request')
const process = require('process')

const action = process.argv[2]
const input = process.argv[3]
const renewInput = process.argv[4]
const urls = 'https://lidemy-book-store.herokuapp.com/books'

switch (action) {
  case 'list':
    request(
      {
        url: `${urls}?_limit=30` // 設定30為測試用
      },

      (error, response, body) => {
        const json = JSON.parse(body)

        for (let i = 0; i < json.length; i++) {
          console.log(`${i + 1} ${json[i].name} id:${json[i].id}`)
        }
      })

    break

  case 'read':
    request(
      {
        url: `${urls}/${input}`
      },
      (error, response, body) => {
        const json = JSON.parse(body)

        if (response.statusCode >= 200 && response.statusCode < 300) {
          console.log(json.name)
        } else if (response.statusCode >= 400 && response.statusCode < 500) {
          console.log(`Can't find ID:${input} (statusCode:${response.statusCode})`)
        }
      })
    break

  case 'delete':
    request.delete(
      {
        url: `${urls}/${input}`
      },

      (error, response, body) => {
        // const json = JSON.parse(body)
        if (response.statusCode >= 200 && response.statusCode < 300) {
          console.log(`Deleted (statusCode:${response.statusCode})`)
        } else if (response.statusCode >= 400 && response.statusCode < 500) {
          console.log(`Can't find ID:${input} (statusCode:${response.statusCode})`)
        }
      })

    break

  case 'create':
    request.post(
      {
        url: urls,
        form: {
          name: input,
          id: 20
        }
      },
      (error, response, body) => {
        const json = JSON.parse(body)
        if (response.statusCode >= 200 && response.statusCode < 300) {
          console.log(`Created Book:"${json.name}" (statusCode:${response.statusCode})`)
        } else {
          console.log(`Fail (statusCode:${response.statusCode})`)
        }
      })
    break

  case 'update':
    request.patch(
      {
        url: `${urls}/${input}`,
        form: {
          name: renewInput
        }
      },
      (error, response, body) => {
        // const json = JSON.parse(body)
        if (response.statusCode >= 200 && response.statusCode < 300) {
          console.log(`Updated id:${input} Name --> ${renewInput} (statusCode:${response.statusCode})`)
        } else {
          console.log(`Fail (statusCode:${response.statusCode})`)
        }
      })
    break

  default:
    console.log('Invalid command. Please try list, read, delete,create and update')
}
