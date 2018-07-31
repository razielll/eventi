// const express = require('express')
// const app = express()
const app = require('express')();
const bodyParser = require('body-parser')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');


const addUserRoute = require('./routes/userRoute')
const addEventiRoute = require('./routes/eventiRoute')


app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))



app.use(cors({
    origin: ['http://localhost:8080'],
    credentials: true // enable set cookie
}));
app.use(bodyParser.json())
// app.use(express.static('dist'))


addUserRoute(app)
addEventiRoute(app)




const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`App server litening on port ${port}!`)
})
