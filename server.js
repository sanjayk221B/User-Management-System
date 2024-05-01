const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const route = require('./server/routes/router'); 

const connectDB = require('./server/database/connection')

const app = express();

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080;

// log request
app.use(morgan('tiny')); 

app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    secret:'key',
    resave: true,
    saveUninitialized: true
}));

//clear cache
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); 
    res.setHeader("Pragma", "no-cache"); 
    res.setHeader("Expires", "0");
    next()
});

// mongodb connection
connectDB(); 

// parse request to body-parser
app.use(bodyParser.urlencoded( {extended: true} ));

// set view engine
app.set('view engine', 'ejs');
// app.set('views' ,path.resolve(__dirname, "views/ejs"));


// load assets
app.use('/css',express.static(path.resolve(__dirname, 'assets/css')));
app.use('/images',express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js',express.static(path.resolve(__dirname, 'assets/js')));
app.use('/fonts',express.static(path.resolve(__dirname, 'assets/fonts')));



// load routers
app.use('/',require('./server/routes/router'))
 

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));