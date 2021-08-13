const db = require('../models')

const { Lottery } = db
let totalProbability = 0

const lotteryController = {

  index: (req, res) => {
    res.render('lottery')
  },

  manage: (req, res) => {
    const { role } = req.session
    if (role === 'admin') {
      Lottery.findAll({
        order: [['probability', 'DESC']]
      }).then((lotteries) => {
        totalProbability = 0
        lotteries.forEach((element) => {
          totalProbability += element.probability
        })
        res.render('admin/manage-lottery', {
          lotteries,
          totalProbability
        })
      })
    } else {
      res.redirect('/')
    }
  },

  add: (req, res) => {
    const { role } = req.session
    const lotteries = {}
    if (role === 'admin') {
      res.render('admin/lottery-add', {
        totalProbability,
        page: '建立',
        formAction: '/lottery-add',
        lotteries
      })
    } else {
      res.redirect('/')
    }
  },

  handleAdd: (req, res, next) => {
    const { prize, desc, imageURL, probability } = req.body
    const { role } = req.session
    if (role === 'admin') {
      Lottery.create({
        prize,
        desc,
        imageURL,
        probability
      }).then(() => {
        res.redirect('/manage-lottery')
      }).catch((err) => {
        console.log(err)
        return res.send('handleCreate 錯誤：', err)
      })
    } else {
      res.redirect('/')
    }
  },

  update: (req, res) => {
    const { role } = req.session
    if (role === 'admin') {
      Lottery.findOne({
        where: {
          id: req.params.id
        }
      }).then((lotteries) => {
        res.render('admin/lottery-add', {
          lotteries,
          page: '編輯',
          totalProbability,
          formAction: '/update/lottery/'
        })
      })
    } else {
      res.redirect('/')
    }
  },

  handleUpdate: (req, res, next) => {
    const { prize, desc, imageURL, probability } = req.body
    const { role } = req.session
    if (role === 'admin') {
      Lottery.findOne({
        where: {
          id: req.params.id
        } // eslint-disable-next-line
      }).then((lotteries) => {
        return lotteries.update({
          prize,
          desc,
          imageURL,
          probability
        })
      }).then(() => {
        res.redirect('/manage-lottery')
      }).catch((err) => {
        console.log(err)
        return res.send('handleEdit 錯誤：', err)
      })
    } else {
      res.redirect('/')
    }
  },

  delete: (req, res) => {
    const { role } = req.session
    if (role === 'admin') {
      Lottery.findOne({
        where: {
          id: req.params.id
        } // eslint-disable-next-line
      }).then((lotteries) => {
        return lotteries.destroy()
      }).then(() => {
        res.redirect('/manage-lottery')
      }).catch((err) => {
        console.log(err)
        return res.send('delete 錯誤：', err)
      })
    } else {
      res.redirect('/')
    }
  },

  lottery: (req, res) => {
    Lottery.findAll({
      order: [['probability', 'ASC']] // 從資料庫撈所有資料並按機率由低到高排列
    }).then((lotteries) => {
      const num = Math.floor(Math.random() * 100) + 1 // 隨機生成1~100的數

      function sumRate(num) { // 設一個fn紀錄機率累加值sumRate
        // 第一筆資料時，累加值為本身的 probability 屬性，sumRate=[0].probability
        // 第二筆資料時，累加值為本身 probability 加之前的累加值，sumRate=[0].probability+[1].probability
        // 以此類推 sumRate += [i].probability
        let rate = 0
        for (let i = 0; i <= num; i++) {
          rate += lotteries[i].probability
        }
        return rate // 回傳第n筆資料時的機率累加值
      }

      // 隨機數num與機率累加值sumRate做判斷
      // 假設只有三筆資料 機率為 30% 30% 40%，亂數為55
      // i = 0 時，sumRate為30，判斷式不合條件(num <= sumRate)
      // i = 1 時，sumRate為60，符合條件，印出第二筆（i=1）資料
      // 所以各筆資料的吻合機率為前後筆的區間
      // eslint-disable-next-line
      for (let i in lotteries) {
        if (num <= sumRate(i)) {
          console.log(i, lotteries[i].prize, lotteries[i].probability, sumRate(i))
          return res.send(JSON.stringify(lotteries[i], null, 4)) // 回傳該筆資料
        }
      }

      // 若隨機數大於累計加總數，則輸出錯誤物件
      if (num > sumRate(lotteries.length - 1)) {
        const fault = {
          prize: '你失敗了',
          desc: '再試一次',
          imageURL: 'https://pse.is/3fgu8w'
        }
        console.log('你失敗了')
        return res.send(JSON.stringify(fault, null, 4))
      }
    }).catch(() => {
      res.redirect('/')
    })
  },

  // 方法同上，改成render頁面
  result: (req, res) => {
    Lottery.findAll({
      order: [['probability', 'ASC']]
    }).then((lotteries) => {
      function sumRate(num) {
        let rate = 0
        for (let i = 0; i <= num; i++) {
          rate += lotteries[i].probability
        }
        return rate
      }

      const num = Math.floor(Math.random() * 100) + 1

      if (num > sumRate(lotteries.length - 1)) {
        const fault = {
          prize: '空歡喜一場',
          description: 'ㄏㄏ 再試一次吧',
          imageURL: 'https://pse.is/3fgu8w'
        }
        return res.render('lottery', {
          result: fault
        })
      }
      // eslint-disable-next-line
      for (let i in lotteries) {
        if (num <= sumRate(i)) {
          return res.render('lottery', {
            result: lotteries[i]
          })
        }
      }
    }).catch(() => {
      res.redirect('/')
    })
  }

}

module.exports = lotteryController
