const { validationResult } = require('express-validator')
const db = require('../models')

const { Faq } = db

const faqController = {

  index: (req, res) => {
    Faq.findAll({
      order: [['order', 'ASC']]
    }).then((faqs) => {
      res.render('faq', {
        faqs
      })
    })
  },

  manage: (req, res) => {
    const { role } = req.session
    if (role === 'admin') {
      Faq.findAll({
        order: [['order', 'ASC']]
      }).then((faqs) => {
        res.render('admin/manage-faq', {
          faqs
        })
      })
    } else {
      res.redirect('/')
    }
  },

  add: (req, res) => {
    const faqs = {}
    res.render('admin/faq-add', {
      page: '新增',
      formAction: '/faq-add',
      faqs
    })
  },

  handleAdd: (req, res) => {
    const { title, content, order } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).render('admin/faq-add', {
        errorMessage: '欄位不得為空',
        page: '新增',
        formAction: '/faq-add',
        faqs: {
          title,
          content,
          order
        }
      })
    }
    Faq.create({
      title,
      content,
      order
    }).then(() => {
      res.redirect('/manage-faq')
    }).catch((err) => console.log(err))
  },

  update: (req, res) => {
    Faq.findOne({
      where: {
        id: req.params.id
      }
    }).then((faqs) => {
      res.render('admin/faq-add', {
        faqs,
        page: '編輯',
        formAction: '/update/faq/'
      })
    })
  },

  handleUpdate: (req, res) => {
    Faq.findOne({
      where: {
        id: req.params.id
      }
      /* eslint-disable-next-line */
    }).then((faqs) => {
      return faqs.update({
        title: req.body.title,
        content: req.body.content,
        order: req.body.order
      })
    }).then(() => {
      res.redirect('/manage-faq')
    }).catch(() => {
      res.redirect('/')
    })
  },

  delete: (req, res) => {
    Faq.findOne({
      where: {
        id: req.params.id
      }
      /* eslint-disable-next-line */
    }).then((faq) => {
      return faq.destroy()
    }).then(() => {
      res.redirect('/manage-faq')
    }).catch(() => {
      res.redirect('/manage-faq')
    })
  }

}

module.exports = faqController
