import axios from 'axios';
const URL =
	process.env.NODE_ENV !== 'development'
		? '/eventi'
		: '//localhost:3000/eventi';


function saveMessage(eventiId, msg) {
	console.log('front chat service got msg', eventiId, msg);
	return axios.put(`${URL}/${eventiId}/saveMessage`, { msg })
}


export default {
	saveMessage
}