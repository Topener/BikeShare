
require('/profile').fetchProfile(renderProfileData);

function renderProfileData(data) {
    $.distanceLabel.text = data.totalDistance;
    // optionally make it dynamic here to introduce imperial
    $.distanceDescriptor.text = 'Kilometers';

    $.ridesLabel.text = data.totalRides;
    $.ridesDescriptor.text = "Rides";
    createGreeting(data.username);
}

function createGreeting(username) {
    let attr = Ti.UI.createAttributedString({
        text: `${$.greeting.text} ${username}`,
        attributes: [{
            type: Ti.UI.ATTRIBUTE_FOREGROUND_COLOR,
            range: [$.greeting.text.length + 1, username.length],
            value: '#333333'
        }
    ]
    });
    $.greeting.attributedString = attr;
}

function showRideHistory() {
    Alloy.createController('rideHistory').getView().open();
}