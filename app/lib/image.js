let icons = {
    selected: {

    },
    unselected: {

    }
}

function getBikeImage(options) {
    const place = options.place;
    const group = options.selected ? 'selected' : 'unselected';
    if (!place || place.bike) {
        if (!icons[group].default){
            icons[group].default = Alloy.createController('images/bike', {selected: options.selected}).getView().toImage();
        }
        return icons[group].default;
    }
    if (place.bike === false) {
        if (!icons[group].hasOwnProperty(place.bikes)) {
            icons[group][place.bikes] = Alloy.createController('images/bike', {number: place.bikes, rack: true, selected: options.selected}).getView().toImage();
        }
        return icons[group][place.bikes];
    }
}

module.exports = {
    getBikeImage: getBikeImage
}