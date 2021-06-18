const request = require('request')

const url = 'https://lidemy-book-store.herokuapp.com/books?_limit=10'
request(
  url,
  (error, response, body) => {
    if (error) {
      console.log('err', error)
      return
    }

    const bookArray = JSON.parse(body)

    // console.log(bookArray).

    for (let i = 0; i < bookArray.length; i++) {
      console.log(`${i + 1} ${bookArray[i].name}`)
    }
  }
)
