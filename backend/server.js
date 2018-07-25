const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express()

const addUserRoute = require('./routes/userRoute')
const addEventiwRoute = require('./routes/eventiRoute')


app.use(cors({
    origin: ['http://localhost:8080'],
    credentials: true // enable set cookie
}));
app.use(bodyParser.json())
// app.use(express.static('dist'))


addEventiRoute(app)
addUserRoute(app)



const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`App server litening on port ${port}!`)
})
