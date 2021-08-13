const { body, validationResult } = require('express-validator')
const db = require('../models')

const { Faq } = db

const faqController = {

  index: (req, res) => {
    Faq.findAll({
      order: [['id', 'DESC']]
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
        order: [['id', 'DESC']]
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
    const { role } = req.session
    const faqs = {}
    if (role === 'admin') {
      res.render('admin/faq-add', {
        page: '新增',
        formAction: '/faq-add',
        faqs
      })
    } else {
      res.redirect('/')
    }
  },

  handleAdd: (
    body('title').isEmail(),
    body('content').isLength({ min: 5 }),
    (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      console.log(errors.array())
      const { title, content, order } = req.body
      Faq.create({
        title,
        content,
        order
      }).then(() => {
        res.redirect('/manage-faq')
      }).catch((err) => {
        req.flash('errorMessage', err.toString())
      })
    }),

  update: (req, res) => {
    const { role } = req.session
    if (role === 'admin') {
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
    } else {
      res.redirect('/')
    }
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
