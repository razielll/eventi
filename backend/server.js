const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
// const https = require('https');

const server = require('http').Server(app);
const io = require('socket.io')(server);



io.on('connection', function (socket) {
	socket.on('chat join', function () {
		socket.broadcast.emit('broadcast-join-chat', 'hello friends!');
	});
	socket.on('disconnect', function () { });

	socket.on('SEND_MESSAGE', function (msg) {
		msg.user === undefined ? (msg.user = '') : msg.user;
		io.emit('messageChannel', msg);
		socket.broadcast.emit(`broadcastMsg`, `${msg.user}: ${msg.txt}`);
	});
});
// server.listen(33333);

app.use(cookieParser());
app.use(
	cors({
		origin: ['http://localhost:8080','http://localhost:3000'],
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

const addUserRoute = require('./routes/userRoute');
const addEventiRoute = require('./routes/eventiRoute');

app.use(bodyParser.json());

app.use(express.static('dist'));

addUserRoute(app);
addEventiRoute(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
	console.log(`App server litening on port ${port}!`);
});

// var options = {
//   key: fs.readFileSync('./localhost.key'),
//   cert: fs.readFileSync('./localhost.cert'),
//   requestCert: false,
//   rejectUnauthorized: false
// };
// https.createServer(options, app).listen(8443);
