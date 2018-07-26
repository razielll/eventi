import axios from 'axios';

const URL =
  process.env.NODE_ENV !== 'development' ? '/' : '//localhost:3000/user';

function loadUser() {
  return axios.get(URL).then(res => res.data);
}

export default {
  loadUser
};
