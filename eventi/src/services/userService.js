import axios from 'axios';
const URL = process.env.NODE_ENV !== 'development' ? '/' : '//localhost:3000/';

function loadUser() {
  return axios.get(`${URL}user`).then(res => res.data);
}

function userSignup(user) {
  axios.post(`${URL}signup`, user).then(res => res.data);
}

function userLogin(user) {
  axios.put(`${URL}login`, user).then(res => {
    console.log('back to userService');
    res.data;
  });
}

export default {
  userSignup,
  userLogin,
  loadUser
};
