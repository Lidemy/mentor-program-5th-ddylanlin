const express = require('express')
const bodyParser = require('body-parser') // eslint-disable-next-line
const session = require('express-session')
const flash = require('connect-flash')

const app = express()
const port = process.env.PORT || 5001

const lotteryController = require('./controllers/lottery')

app.use(express.static('views'))
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
  res.locals.totalProbability = req.session.totalProbability
  res.locals.errorMessage = req.flash('errorMessage')
  next()
})

app.get('/', lotteryController.index)
app.get('/result', lotteryController.result)
app.get('/admin', lotteryController.admin)
app.get('/create', lotteryController.create)
app.post('/create', lotteryController.handleCreate)
app.get('/edit/:id', lotteryController.edit)
app.post('/edit/:id', lotteryController.handleEdit)
app.get('/delete/:id', lotteryController.delete)
app.get('/lottery', lotteryController.lottery)

app.listen(port, () => {
  console.log(`♫.(◕∠◕).♫ http://localhost:${port}  ♫.(◕∠◕).♫`)
})
