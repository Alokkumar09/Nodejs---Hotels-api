const express = require('express')
const app = express()
const db=require('./db');
require('dotenv').config();

const bodyParser = require('body-parser')
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.send('Hello World')
})


const personRotes=require('./routes/personRotes');
const menuRoutes=require('./routes/menuRoutes');

app.use('/menu',menuRoutes);

app.use('/person',personRotes)

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server is rnning on PORT ${PORT}`);
    
}) 