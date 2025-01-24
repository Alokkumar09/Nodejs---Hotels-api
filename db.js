const mongoose = require("mongoose");

require('dotenv').config();

//const mongoURL='mongodb://127.0.0.1:27017/hotels'
const mongoURL=process.env.dbURL;

mongoose.connect(mongoURL)

const db=mongoose.connection;
db.on('connected',()=>{
    console.log("connected to MongoDB server");
    
})
db.on('error',(err)=>{
    console.error('MongoDb connection error',error);
})
db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
    
});
module.exports=db;