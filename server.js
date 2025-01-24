const express = require('express')
const app = express()
const db=require('./db');

require('dotenv').config();

const passport=require('./auth');

const bodyParser = require('body-parser')
app.use(bodyParser.json());
const PORT= 4000;

//Middleware FUnction

const logRequest=(req,res,next)=>{
  console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`);
  next();

}

app.use(logRequest);



app.use(passport.initialize())
const localMiddleWare=passport.authenticate('local',{session:false});

app.get('/',function (req, res) {
  res.send('Hello World')
})


const personRotes=require('./routes/personRotes');
const menuRoutes=require('./routes/menuRoutes');

app.use('/menu',localMiddleWare,menuRoutes);

app.use('/person',personRotes)


app.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`);
    
}) 