const { validationResult } = require('express-validator')
const db = require('../models')

const { Menu } = db

const menuController = {

  index: (req, res) => {
    Menu.findAll({
      order: [['id', 'DESC']]
    }).then((menus) => {
      res.render('menu', {
        menus
      })
    })
  },

  manage: (req, res) => {
    Menu.findAll({
      order: [['id', 'DESC']]
    }).then((menus) => {
      res.render('admin/manage-menu', {
        menus
      })
    })
  },

  add: (req, res) => {
    const menus = {}
    res.render('admin/menu-add', {
      page: '新增',
      formAction: '/menu-add',
      menus
    })
  },

  handleAdd: (req, res, next) => {
    const { dish, price, imageURL } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).render('admin/menu-add', {
        errorMessage: '菜色不得為空',
        page: '新增',
        formAction: '/menu-add',
        menus: {
          dish
        }
      })
    }
    Menu.create({
      dish,
      price,
      imageURL
    }).then(() => {
      res.redirect('/manage-menu')
    }).catch((err) => {
      console.log(err)
      return res.send('handleCreate 錯誤：', err)
    })
  },

  update: (req, res) => {
    Menu.findOne({
      where: {
        id: req.params.id
      }
    }).then((menus) => {
      res.render('admin/menu-add', {
        menus,
        page: '調整',
        formAction: '/update/menu/'
      })
    })
  },

  handleUpdate: (req, res, next) => {
    const { dish, price, imageURL } = req.body
    Menu.findOne({
      where: {
        id: req.params.id
      } // eslint-disable-next-line
    }).then((menus) => {
      return menus.update({
        dish,
        price,
        imageURL
      })
    }).then(() => {
      res.redirect('/manage-menu')
    }).catch((err) => {
      console.log(err)
      return res.send('handleEdit 錯誤：', err)
    })
  },

  delete: (req, res) => {
    Menu.findOne({
      where: {
        id: req.params.id
      } // eslint-disable-next-line
    }).then((menus) => {
      return menus.destroy()
    }).then(() => {
      res.redirect('/manage-Menu')
    }).catch((err) => {
      console.log(err)
      return res.send('delete 錯誤：', err)
    })
  }

}

module.exports = menuController
