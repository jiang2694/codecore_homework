const express = require('express');
const app = express();
const methodOverride = require('method-override'); 


app.use(express.urlencoded({extended: true}))


//-----------------Method Override Middleware--------------------------
app.use(methodOverride((req,res) => {
    if (req.body && req.body.__method) {
        const method = req.body.__method;
        return method
    }
}))

const cookieParser = require('cookie-parser')


const path = require('path')

app.use(express.static(path.join(__dirname, 'public')));

const logger = require('morgan');
const req = require('express/lib/request');
app.use(logger('dev'));


app.use(cookieParser())
app.use((req,res, next) => {
  const name = req.cookies.name || '';
  res.locals.name = name;
  next();
})




app.get('/',(req,res)=>{
  res.render('home')
})

const cohortRouter = require('./routes/cohorts');
app.use('/cohorts', cohortRouter);

app.set('view engine', 'ejs')
app.set('views', 'views')

//---------------------------SERVER--------------------------------->

const PORT = 8989;
const DOMAIN = "localhost" 

app.listen(PORT, DOMAIN, () => {
    console.log(`Server is listening on http://${DOMAIN}:${PORT}`)
})


