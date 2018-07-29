// const express = require('express')
// const app = express()
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const addUserRoute = require('./routes/userRoute');
const addEventiRoute = require('./routes/eventiRoute');

app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:8080'],
    credentials: true // enable set cookie
  })
);
app.use(
  session({
    secret: 'puki muki',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 600000
    }
  })
);
app.use(bodyParser.json());
// app.use(express.static('dist'))

addUserRoute(app);

addEventiRoute(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App server litening on port ${port}!`);
});
