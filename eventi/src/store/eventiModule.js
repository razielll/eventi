import eventiService from '@/services/eventiService.js';
import { log } from 'util';

export default {
	state: {
		eventis: [],
		filterBy: {}
	},
	mutations: {
		addEventi(state, { eventi }) {
			state.eventis.unshift(eventi);
		},
		loadEventi(state, { eventis }) {
			state.eventis = eventis;
		},
		updateEventi(state, { _id, data }) {
			let eventi = state.eventis.find(eventi => eventi._id === _id);
			Object.assign(eventi, data);
			// state.eventis.splice(idx, 1, updateEventi);
		},
		incEventiClap(state) { },
		addUserToEventi(state, { data }) {
			let eventi = state.eventis.find(eventi => eventi._id === data.eventiId)
			eventi.goingUserId.push(data.userId)
		},
		removeUserFromEventi(state, { data }) {
			let userIdToRemove = data.userId
			let eventi = state.eventis.find(eventi => eventi._id === data.eventiId)
			let idx = eventi.goingUserId.findIndex(userId => userId === userIdToRemove)
			eventi.goingUserId.splice(idx, 1)
		}
	},
	actions: {
		addEventi({ commit }, { data }) {
			return eventiService.addEventi(data).then(eventi => {
				commit({ type: 'addEventi', eventi });
				return eventi;
			});
		},
		loadEventi(context) {
			return eventiService.loadEventi().then(res => {
				context.commit({ type: 'loadEventi', eventis: res });
			});
		},
		getEventiById(context, { eventiId }) {
			return eventiService.getEventiById(eventiId);
		},
		removeEventi(context, { eventiId }) {
			return eventiService.removeEventi(eventiId).then(() => {
				context.commit({ type: 'removeEventi', eventiId });
			});
		},
		updateEventi({ commit }, { _id, data, isCommit = true }) {
			return eventiService.updateEventi(_id, data).then(updateResult => {
				if (updateResult.ok && isCommit) {
					return commit({ type: 'updateEventi', _id, data });
				}
			});
		},
		incEventiClap({ state, dispatch }, { _id }) {
			const eventi = state.eventis.find(eventi => eventi._id === _id);
			const updateData = { clapsCount: eventi.clapsCount + 1 };
			dispatch({ type: 'updateEventi', _id, updateData });
		},
		addUser(context, { data }) {
			eventiService.eventiAddUser(data.eventiId, data.userId)
				.then((res) => {
					if (res.ok) {
						return context.commit({ type: "addUserToEventi", data })
					}
				})
		},
		removeUser(context, { data }) {
			return eventiService.eventiRemvoeUser(data.eventiId, data.userId)
				.then(res => {
					if (res.ok) {
						return context.commit({ type: "removeUserFromEventi", data })
					}
				})
		}
	},
	getters: {
		eventisToShow(state) {
			return state.eventis;
		},
	}
};
