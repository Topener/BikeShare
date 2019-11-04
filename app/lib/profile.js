let fakeData = {
    username: "Wraldpyk",
    totalDistance: 7,
    totalRides: 2,
    rides: [
        {
            distance: 2,
            price: 2.95
        },
        {
            distance: 5,
            price: 4.35
        }
    ]
}

function fetchProfile(callback) {
    callback(fakeData);
}

module.exports = {
    fetchProfile: fetchProfile
}