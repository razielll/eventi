import chatService from '@/services/chatService.js';
import { log } from '../../node_modules/util';


export default {
	state: {
		isConnected: false,
		socketMessage: ''
	},

	mutations: {
		SOCKET_CONNECT(state) {
			state.isConnected = true;
		},

		SOCKET_DISCONNECT(state) {
			state.isConnected = false;
		},
		SOCKET_messageChannel(state, message) {
			state.socketMessage = message
		}
	},
	actions: {
		saveMessage(context, payload) {
			console.log('chat module got', payload);
			let eventiId = payload._id
			let msg = payload.msg
			// if (msg.user === '') return
			return chatService.saveMessage(eventiId, msg)
		}
	}
}