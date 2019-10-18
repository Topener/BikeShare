let timap = require('ti.map');
let annotations = [];
let placeUIDs = [];

function handleRegionChange(e) {
    require('/api').getBikes(e.source.region, bikes => {
        console.log(`Found ${bikes.length} places for bikes`);
        renderAnnotations(bikes);
    });
}

function renderAnnotations(places) {
    const placesUIDs = [];
    let newAnnotations = [];
    let newPlaces = _.filter(places, place => {
        placesUIDs.push(place.uid);
        return placeUIDs.indexOf(place.uid) == -1;
    });

    let oldAnnotations = _.filter(annotations, annotation => {
        if (placesUIDs.indexOf(annotation.uid) == -1) {
            placeUIDs.splice(placesUIDs.indexOf(annotation.uid),1);
            return true;
        }
        return false;
    });

    _.each(newPlaces, place => {
        newAnnotations.push(createAnnotation({place: place, selected: false}));
        placeUIDs.push(place.uid);
    });

    $.map.addAnnotations(newAnnotations);
    $.map.removeAnnotations(oldAnnotations);
    annotations = newAnnotations;
}

function createAnnotation(options) {
    return timap.createAnnotation({
        latitude: options.place.lat,
        longitude: options.place.lng,
        image: require('/image').getBikeImage(options),
        uid: options.place.uid
    })
}

let lastAnnotation = false;
let deselectTimeout = false;
function clickMap(e) {

    if (!e.annotation) {
        $.overlay.dismiss();
        lastAnnotation = false;
        return;
    };

    const place = require('/api').getPlace(e.annotation.uid);

    if (lastAnnotation && lastAnnotation.uid && e.annotation.uid == lastAnnotation.uid){
        deselectTimeout = setTimeout($.overlay.dismiss, 50);
        toggleSelection({selected: false, place: place, annotation: e.annotation})
        lastAnnotation = false;
        return;
    }
    clearTimeout(deselectTimeout);
    lastAnnotation = e.annotation;
    toggleSelection({selected: true, place: place, annotation: e.annotation})
    $.overlay.show();
    $.overlay.render(place);
}

function toggleSelection(options){
    const selectedAnnotation = _.findWhere(annotations, {uid: options.annotation.uid});
    $.map.removeAnnotation(selectedAnnotation);
    annotations.splice(annotations.indexOf(selectedAnnotation), 1);
    const newAnnotation = createAnnotation({place: options.place, selected: options.selected});
    annotations.push(newAnnotation);
    $.map.addAnnotation(createAnnotation({place: options.place, selected: options.selected}));
    
}

exports.render = function() {
}
