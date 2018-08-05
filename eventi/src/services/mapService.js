let map;

export function connectGoogleApi() {
  if (window.google) return Promise.resolve();
  const API_KEY = 'AIzaSyCx-pDokt9TxIWQmx5X6Eo2VSXqt2BuD0E';
  var elGoogleApi = document.createElement('script');
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
  elGoogleApi.async = true;
  document.body.append(elGoogleApi);

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve;
    elGoogleApi.onerror = () => reject('Google script failed to load');
    // elGoogleApi.onerror = reject.bind(null,'Google script failed to load')
  });
}

export function initMap(lat, lng, el) {
  return connectGoogleApi().then(() => {
    console.log('google available');
    map = new google.maps.Map(el, {
      center: { lat, lng },
      zoom: 15
    });
    // console.log('Map!', map);
  });
}

export function addMarker(loc) {
  var marker = new google.maps.Marker({
    position: loc,
    map: map,
    title: 'Hello World!'
  });
  return marker;
}
