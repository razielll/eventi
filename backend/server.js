const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
var server = require('http').createServer(app);
var io = require('socket.io')(server);


io.on('connection', function (socket) {
	console.log('a user connected');
	socket.on('chat join', function () {
		socket.broadcast.emit('broadcast-join-chat', 'hello friends!');
	});
	socket.on('disconnect', function () {
		console.log('user disconnected');
	});

	socket.on('SEND_MESSAGE', function (msg) {
		// console.log('user', msg.user, ' sent: ', msg.txt);
		(msg.user === undefined) ? msg.user = '' : msg.user
		io.emit('messageChannel', `${msg.user}: ${msg.txt}`);
	});

});
server.listen(33333);


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


const addUserRoute = require('./routes/userRoute')
const addEventiRoute = require('./routes/eventiRoute')


app.use(cookieParser());
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true }
}))

app.use(bodyParser.json())

app.use(cors({
	origin: ['http://localhost:8080'],
	credentials: true // enable set cookie
}));
// app.use(express.static('dist'))

addUserRoute(app);

addUserRoute(app)
addEventiRoute(app)




const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`App server litening on port ${port}!`)
})
