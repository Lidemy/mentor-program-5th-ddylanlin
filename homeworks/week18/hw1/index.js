const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')

const app = express()
const port = process.env.PORT || 5001

// const userController = require('./controllers/user')
// const articleController = require('./controllers/article')

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(flash())

app.use((req, res, next) => {
  res.locals.errorMessage = req.flash('errorMessage')
  next()
})

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/faq', (req, res) => {
  res.render('faq')
})

app.get('/lottery', (req, res) => {
  res.render('lottery')
})

app.get('/menu', (req, res) => {
  res.render('menu')
})

app.get('/manage-lottery', (req, res) => {
  res.render('manage-lottery')
})

app.get('/manage-faq', (req, res) => {
  res.render('manage-faq')
})

app.get('/manage-menu', (req, res) => {
  res.render('manage-menu')
})

// app.get('/page', articleController.page)
// app.get('/article/:id', articleController.view)
// app.get('/create', articleController.create)
// app.post('/create', articleController.handleCreate, redirectBack)
// app.get('/delete/:id', articleController.delete)
// app.get('/update/:id', articleController.update)
// app.post('/update/:id', articleController.handleUpdate, redirectBack)
// app.get('/admin', articleController.admin)
// app.post('/admin', articleController.handleSwitchAdmin, redirectBack)
// app.get('/recover/:id', articleController.handleRecover, redirectBack)

app.listen(port, () => {
  console.log(`♫.(◕∠◕).♫ http://localhost:${port}  ♫.(◕∠◕).♫`)
})
