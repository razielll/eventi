import axios from 'axios';
const URL = process.env.NODE_ENV !== 'development' ? '' : '//localhost:3000';

export const USER_KEY = 'loggedInUser';

function loadUser() {
  return axios.get(`${URL}/user`).then(res => res.data);
}

function userSignup(user) {
  return axios.post(`${URL}/signup`, user).then(res => res.data);
}

function userLogin(user) {
  return axios.put(`${URL}/login`, user).then(res => res.data);
}

function addEventiToUser(userId, eventiId) {
  return axios
    .put(`${URL}/joinEventi/${userId}`, { eventiId })
    .then(res => res.data);
}

function userLeaveEventi(userId, eventis) {
  return axios
    .put(`${URL}/leaveEventi/${userId}`, eventis)
    .then(res => res.data);
}

export default {
  userSignup,
  userLogin,
  loadUser,
  addEventiToUser,
  userLeaveEventi
};
