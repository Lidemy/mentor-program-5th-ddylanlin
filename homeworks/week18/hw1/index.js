const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const { body } = require('express-validator')
const multer = require('multer')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5001

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({ storage })

const userController = require('./controllers/user')
const lotteryController = require('./controllers/lottery')
const faqController = require('./controllers/faq')
const menuController = require('./controllers/menu')

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(flash())
app.use(upload.any())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use((req, res, next) => {
  res.locals.username = req.session.username
  res.locals.role = req.session.role
  res.locals.errorMessage = req.flash('errorMessage')
  next()
})

// app.post('/upload', upload.single('myFile'), menuController.upload)
// // app.post('/upload', upload.single('myFile'), menuController.handleUpload)

function redirectBack(req, res) {
  res.redirect('back')
}

function isAdmin(req, res, next) {
  if (req.session.role !== 'admin') {
    return res.redirect('/')
  }
  return next()
}

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/test', (req, res) => {
  res.render('test')
})

app.get('/login', userController.login)
app.post('/login', userController.handleLogin, redirectBack)
app.get('/register', userController.register)
app.post('/register', userController.handleRegister, redirectBack)
app.get('/logout', userController.logout)

app.get('/lottery', lotteryController.index)
app.get('/manage-lottery', isAdmin, lotteryController.manage)
app.get('/lottery-add', isAdmin, lotteryController.add)
app.post('/lottery-add', isAdmin, body('prize').notEmpty(), body('desc').notEmpty(), lotteryController.handleAdd)
app.get('/update/lottery/:id', isAdmin, lotteryController.update)
app.post('/update/lottery/:id', isAdmin, lotteryController.handleUpdate)
app.get('/delete/lottery/:id', isAdmin, lotteryController.delete)
app.get('/lottery/api', lotteryController.lottery)

app.get('/faq', faqController.index)
app.get('/manage-faq', isAdmin, faqController.manage)
app.get('/faq-add', isAdmin, faqController.add)
app.post('/faq-add', isAdmin, body('title').notEmpty(), body('content').notEmpty(), faqController.handleAdd)
app.get('/update/faq/:id', isAdmin, faqController.update)
app.post('/update/faq/:id', isAdmin, faqController.handleUpdate)
app.get('/delete/faq/:id', isAdmin, faqController.delete)

app.get('/menu', menuController.index)
app.get('/manage-menu', isAdmin, menuController.manage)
app.get('/menu-add', isAdmin, menuController.add)
app.post('/menu-add', isAdmin, body('dish').notEmpty(), menuController.handleAdd)
app.get('/update/menu/:id', isAdmin, menuController.update)
app.post('/update/menu/:id', isAdmin, menuController.handleUpdate)
app.get('/delete/menu/:id', isAdmin, menuController.delete)
// app.post('/upload', isAdmin, menuController.upload)

app.listen(port, () => {
  console.log(`♫.(◕∠◕).♫ http://localhost:${port}  ♫.(◕∠◕).♫`)
})
