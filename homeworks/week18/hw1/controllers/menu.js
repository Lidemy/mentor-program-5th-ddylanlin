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
    const { role } = req.session
    if (role === 'admin') {
      Menu.findAll({
        order: [['id', 'DESC']]
      }).then((menus) => {
        res.render('admin/manage-menu', {
          menus
        })
      })
    } else {
      res.redirect('/')
    }
  },

  add: (req, res) => {
    const { role } = req.session
    const menus = {}
    if (role === 'admin') {
      res.render('admin/menu-add', {
        page: '新增',
        formAction: '/menu-add',
        menus
      })
    } else {
      res.redirect('/')
    }
  },

  handleAdd: (req, res, next) => {
    const { dish, price, imageURL } = req.body
    const { role } = req.session
    if (role === 'admin') {
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
    } else {
      res.redirect('/')
    }
  },

  update: (req, res) => {
    const { role } = req.session
    if (role === 'admin') {
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
    } else {
      res.redirect('/')
    }
  },

  handleUpdate: (req, res, next) => {
    const { dish, price, imageURL } = req.body
    const { role } = req.session
    if (role === 'admin') {
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
    } else {
      res.redirect('/')
    }
  },

  delete: (req, res) => {
    const { role } = req.session
    if (role === 'admin') {
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
    } else {
      res.redirect('/')
    }
  }
}

module.exports = menuController
