function store(key, any) {
  sessionStorage[key] = JSON.stringify(any);
}

function load(key) {
  var str = sessionStorage[key] || 'null';
  return JSON.parse(str);
}

export default {
  store,
  load
};
