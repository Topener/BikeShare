const xhr = new(require("ti.xhr"))();
xhr.setStaticOptions({
    parseJSON: true
});

let places = [];

function getBikes(region, callback) {
    if (places.length === 0) {
        return getBikesFromAPI(() => {
            filterBikes(region, callback);
        });
    }
    filterBikes(region, callback);
}

function getPlace(uid) {
    return _.findWhere(places, {uid: uid});
}

function filterBikes(region, callback) {
    const maxLat = region.latitude + region.latitudeDelta;
    const maxLng = region.longitude + region.longitudeDelta;
    const minLat = region.latitude - region.latitudeDelta;
    const minLng = region.longitude - region.longitudeDelta;

    callback(_.filter(places, place => {
        return place.lat > minLat 
                && place.lat < maxLat 
                && place.lng > minLng 
                && place.lng < maxLng;
    }));
}

function getBikesFromAPI(callback) {
    xhr.GET({
        url: 'https://api.nextbike.net/maps/nextbike-live.json?city=362',
        onSuccess: data => {
            places = data.data.countries[0].cities[0].places;
            callback();
        }
    });
}

module.exports = {
    getBikes: getBikes,
    getPlace: getPlace
}