import axios from 'axios';
const URL = process.env.NODE_ENV !== 'development' ? '' : '//localhost:3000';

function addEventi(data) {
  return axios.post(`${URL}/eventi/edit`, data).then(res => res.data);
}

function loadEventi(query) {
  return axios.get(`${URL}/eventi`, { params: { ...query } }).then(res => {
    return res.data;
  });
}

function getEventiById(eventiId) {
  return axios.get(`${URL}/eventi/${eventiId}`).then(res => {
    return res.data;
  });
}

function removeEventi(eventiId) {
  return axios
    .delete(`${URL}/eventi/${eventiId}`)
    .catch(err => console.log('You are not an admin!', err));
}

function updateEventi(_id, updateData) {
  return axios
    .put(`${URL}/eventi/edit/${_id}`, updateData)
    .then(res => res.data);
}

function eventiAddUser(eventiId, userId) {
  return axios
    .put(`${URL}/eventi/${eventiId}`, { userId })
    .then(res => res.data);
}

function eventiRemvoeUser(eventiId, userId) {
  return axios
    .put(`${URL}/eventi/removeUser/${eventiId}`, { userId })
    .then(res => res.data);
}

function incEventiClap(_id, updateData) {
  return axios
    .put(`${URL}/eventi/incEventiClap/${_id}`, updateData)
    .then(res => res.data);
}
export default {
  addEventi,
  loadEventi,
  removeEventi,
  updateEventi,
  getEventiById,
  eventiAddUser,
  eventiRemvoeUser,
  incEventiClap
};
