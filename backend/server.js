// const express = require('express')
// const app = express()
const app = require('express')();
const bodyParser = require('body-parser')
const cors = require('cors');
// const http = require('http').Server(app);
// var io = require('socket.io')(http);


const addUserRoute = require('./routes/userRoute')
const addEventiRoute = require('./routes/eventiRoute')


app.use(cors({
    origin: ['http://localhost:8080'],
    credentials: true // enable set cookie
}));
app.use(bodyParser.json())
// app.use(express.static('dist'))


addEventiRoute(app)
addUserRoute(app)


// io.on('connection', function (socket) {
//     console.log('a user connected');
// });



const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`App server litening on port ${port}!`)
})
