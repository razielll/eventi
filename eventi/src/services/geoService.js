export function getPosition(success, handleLocationError) {
  if (!navigator.geolocation) {
    console.log('HTML5 Geolocation is not supported in your browser.');
    return;
  }

  navigator.geolocation.getCurrentPosition(success, handleLocationError);
}

function distance(lat1, lon1, lat2, lon2, unit = 'K') {
  var radLat1 = (Math.PI * lat1) / 180;
  var radLat2 = (Math.PI * lat2) / 180;
  var theta = lon1 - lon2;
  var radTheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radLat1) * Math.sin(radLat2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit == 'K') {
    dist = dist * 1.609344;
  }
  if (unit == 'N') {
    dist = dist * 0.8684;
  }
  return dist.toFixed(1);
}

export default {
  getPosition,
  distance
};
