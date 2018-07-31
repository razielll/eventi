import axios from 'axios';
const URL =
  process.env.NODE_ENV !== 'development'
    ? '/eventi'
    : '//localhost:3000/eventi';

function addEventi(data) {
  console.log('route data:', data);
  return axios.post(`${URL}/edit`, data).then(res => res.data);
}

function loadEventi(query) {
  return axios
    .get('http://localhost:3000/', { params: { ...query } })
    .then(res => {
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

function incEventiClap(_id, updateData) {
  return axios
    .put(`${URL}/incEventiClap/${_id}`, updateData)
    .then(res => res.data);
}

export default {
  addEventi,
  loadEventi,
  removeEventi,
  updateEventi,
  getEventiById,
  incEventiClap
};
