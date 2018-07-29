import axios from 'axios';
const URL =
  process.env.NODE_ENV !== 'development'
    ? '/eventi'
    : '//localhost:3000/eventi';

function addEventi({ eventi }) {
  return axios.post(`${URL}/edit`, eventi).then(res => res.data);
}

function loadEventi() {
  return axios.get('http://localhost:3000/').then(res => {
    return res.data;
  });
}

function getEventiById(eventiId) {
  return axios.get(`${URL}/${eventiId}`).then(res => {
    return res.data;
  });
}

function removeEventi(eventiId) {
  return axios
    .delete(`${URL}/${eventiId}`)
    .catch(err => console.log('You are not an admin!', err));
}

function updateEventi(_id, updateData) {
  return axios.put(`${URL}/edit/${_id}`, updateData).then(res => res.data);
}

export default {
  addEventi,
  loadEventi,
  removeEventi,
  updateEventi,
  getEventiById
};
