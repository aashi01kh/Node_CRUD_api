require('dotenv').config()

const { error } = require('console')
const express=require('express')
const bodyParser=require('body-parser')
const { default: mongoose } = require('mongoose')
const app =express()
mongoose.connect(process.env.DATABASE_URL)
const db =mongoose.connection
db.on('error',(error)=>console.log(error))
db.once('open',()=>console.log('connected to database'))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine','ejs');

const aa = require('./routes/employes')
app.get('/add',(req,res)=>{
    res.render('add');
})
app.use('/employes',aa)
app.use(express.json());
app.listen(3000, ()=> console.log('server started'))

