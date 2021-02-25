const express = require('express')
const bodyparser = require('body-parser');
import mongoose = require('mongoose');
const router = require('./Routes/auth.route')
var app = express()

//Routes
app.use(bodyparser.json())
app.get('/', function(req:any,res:any){
    res.send('Hello world')
})
app.use('/api/account',router)

//MongoDb connection
mongoose.connect('mongodb://localhost/node_login', {useNewUrlParser: true});
mongoose.connection.once('open',function(){
    console.log('Database connected Successfully');
}).on('error',function(err:any){
    console.log('Error', err);
})

//Server
app.listen('8000',function(req:any,res:any){
    console.log('Serve is up and running at the port 8000')
})
