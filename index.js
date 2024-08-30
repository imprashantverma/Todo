const express = require('express');
const DbConnect = require('./config/database');
const router= require('./Router/router')
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server started at ${PORT} `);
})

const bodyParser = require('body-parser');

app.use(bodyParser.json());

DbConnect();

app.use('/',router);
