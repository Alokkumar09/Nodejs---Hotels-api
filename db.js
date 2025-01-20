const mongoose = require("mongoose");

require('dotenv').config();

//const mongoURL=process.env.dbURLLocal;
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