// const db = require('../models')

// const { Menu } = db

const menuController = {

  index: (req, res) => {
    res.render('menu')
  },

  manage: (req, res) => {
    res.render('admin/manage-menu')
  },

  add: (req, res) => {
    res.render('admin/menu-add')
  }

  // admin: (req, res) => {
  //   Lottery.findAll({
  //     order: [['probability', 'DESC']]
  //   }).then((lotteries) => {
  //     totalProbability = 0
  //     lotteries.forEach((element) => { // 每刷新一次頁面重新計算所有獎項機率加總值
  //       totalProbability += element.probability
  //     })
  //     console.log(totalProbability)
  //     res.render('admin', {
  //       lotteries,
  //       totalProbability
  //     })
  //   })
  // },

  // create: (req, res) => {
  //   res.render('create', {
  //     totalProbability
  //   })
  // },

  // handleCreate: (req, res, next) => {
  //   const { prize, description, imageURL, probability } = req.body
  //   Lottery.create({
  //     prize,
  //     description,
  //     imageURL,
  //     probability
  //   }).then(() => {
  //     res.redirect('admin')
  //   }).catch((err) => {
  //     console.log(err)
  //     return res.send('handleCreate 錯誤：', err)
  //   })
  // },

  // edit: (req, res) => {
  //   Lottery.findOne({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then((lotteries) => {
  //     res.render('edit', {
  //       lotteries,
  //       totalProbability
  //     })
  //   })
  // },

  // handleEdit: (req, res, next) => {
  //   const { prize, description, imageURL, probability } = req.body
  //   Lottery.findOne({
  //     where: {
  //       id: req.params.id
  //     } // eslint-disable-next-line
  //   }).then((lotteries) => {
  //     return lotteries.update({
  //       prize,
  //       description,
  //       imageURL,
  //       probability
  //     })
  //   }).then(() => {
  //     res.redirect('/admin')
  //   }).catch((err) => {
  //     console.log(err)
  //     return res.send('handleEdit 錯誤：', err)
  //   })
  // },

  // delete: (req, res) => {
  //   Lottery.findOne({
  //     where: {
  //       id: req.params.id
  //     } // eslint-disable-next-line
  //   }).then((lotteries) => {
  //     return lotteries.destroy()
  //   }).then(() => {
  //     res.redirect('/admin')
  //   }).catch((err) => {
  //     console.log(err)
  //     return res.send('delete 錯誤：', err)
  //   })
  // }

}

module.exports = menuController
