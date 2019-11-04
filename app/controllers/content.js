let timap = require('ti.map');
let annotations = [];
let placeUIDs = [];

function handleRegionChange(e) {
    require('/api').getBikes(e.source.region, bikes => {
        //console.log(`Found ${bikes.length} places for bikes`);
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
            if (lastAnnotation && lastAnnotation.uid == annotation.uid) {
                clickMap({
                    annotation: annotation
                });
            }
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

    _.each(oldAnnotations, oa => {
        annotations.splice(_.findIndex(annotations, {uid: oa.uid}), 1);
    });
    _.each(newAnnotations, na => {
        annotations.push(na);
    });
}

function createAnnotation(options) {
    return timap.createAnnotation({
        latitude: options.place.lat,
        longitude: options.place.lng,
        image: require('/image').getBikeImage(options),
        uid: options.place.uid,
        selectedIcon: options.selected,
        place: options.place
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

    toggleSelection({
        annotation: e.annotation,
        selected: true
    });

    const place = require('/api').getPlace(e.annotation.uid);

    if (lastAnnotation) {
        toggleSelection({
            annotation: lastAnnotation,
            selected: false
        });        
    }

    if (lastAnnotation && lastAnnotation.uid && e.annotation.uid == lastAnnotation.uid){
        deselectTimeout = setTimeout($.overlay.dismiss, 50);
        lastAnnotation = false;
        return;
    }
    clearTimeout(deselectTimeout);
    lastAnnotation = e.annotation;
    $.overlay.show();
    $.overlay.render(place);
}

function toggleSelection(options){
    const selectedAnnotationIndex = _.findIndex(annotations, {uid: options.annotation.uid});
    let newAnnotation = createAnnotation({
        place: options.annotation.place,
        selected: options.hasOwnProperty('selected') ? options.selected : !options.annotation.selectedIcon
    });
    $.map.removeAnnotation(options.annotation);
    annotations.splice(selectedAnnotationIndex, 1);
    annotations.push(newAnnotation);
    $.map.addAnnotation(newAnnotation);
}

exports.render = function() {
}
