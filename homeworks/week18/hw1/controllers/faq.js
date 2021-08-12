// const db = require('../models')

// const { Faq } = db

const faqController = {

  index: (req, res) => {
    res.render('faq')
  },

  manage: (req, res) => {
    res.render('admin/manage-faq')
  },

  add: (req, res) => {
    res.render('admin/faq-add')
  }

  // page: (req, res) => {
  //   switch (req.query.page) {
  //     case 'List':
  //       quickFindAll('article/page', req, res)
  //       break

  //     case 'Front-end':
  //       quickFindPage('article/page', 'Front-end', req, res)
  //       break

  //     case 'Back-end':
  //       quickFindPage('article/page', 'Back-end', req, res)
  //       break

  //     case 'Others':
  //       quickFindPage('article/page', 'Others', req, res)
  //       break

  //     case 'About':
  //       quickFindPage('article/page', 'About', req, res)
  //       break

  //     default:
  //       res.redirect('/page?page=List')
  //       break
  //   }
  // },

  // view: (req, res) => {
  //   Article.findOne({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then((articles) => {
  //     res.render('article/article', {
  //       articles
  //     })
  //   })
  // },

  // create: (req, res) => {
  //   const { role } = req.session.role
  //   if (role === 'admin') {
  //     res.render('article/create_article', {
  //       returnTo: req.session.returnTo
  //     })
  //   } else {
  //     res.redirect('/')
  //   }
  // },

  // handleCreate: (req, res, next) => {
  //   const { title, content, category } = req.body
  //   // if (!title) {
  //   //   req.flash('errorMessage', '請輸入文章標題')
  //   //   return next()
  //   // }
  //   // if (!content) {
  //   //   req.flash('errorMessage', '請輸入文章內容')
  //   //   return next()
  //   // }
  //   // if (category === 'Uncategorized') {
  //   //   req.flash('errorMessage', '請選擇文章分類')
  //   //   return next()
  //   // }
  //   Article.create({
  //     title,
  //     content,
  //     category,
  //     username: req.session.username
  //   }).then(() => {
  //     res.redirect(req.session.returnTo)
  //   }).catch((err) => {
  //     req.flash('errorMessage', err.toString())
  //     return next()
  //   })
  // },

  // delete: (req, res) => {
  //   Article.findOne({
  //     where: {
  //       id: req.params.id,
  //       username: req.session.username
  //     }
  //     /* eslint-disable-next-line */
  //   }).then((articles) => {
  //     return articles.update({
  //       is_deleted: 1
  //     })
  //   }).then(() => {
  //     res.redirect('/')
  //   }).catch(() => {
  //     res.redirect('/')
  //   })
  // },

  // update: (req, res) => {
  //   const { role } = req.session.role
  //   if (role === 'admin') {
  //     Article.findOne({
  //       where: {
  //         id: req.params.id
  //       }
  //     }).then((articles) => {
  //       res.render('article/edit_article', {
  //         articles,
  //         returnTo: req.session.returnTo
  //       })
  //     })
  //   } else {
  //     res.redirect('/')
  //   }
  // },

  // handleUpdate: (req, res) => {
  //   Article.findOne({
  //     where: {
  //       id: req.params.id,
  //       username: req.session.username
  //     }
  //     /* eslint-disable-next-line */
  //   }).then((articles) => {
  //     return articles.update({
  //       title: req.body.title,
  //       content: req.body.content,
  //       category: req.body.category
  //     })
  //   }).then(() => {
  //     res.redirect('back')
  //   }).catch(() => {
  //     res.redirect('/')
  //   })
  // }

}

module.exports = faqController
