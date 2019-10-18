const animationDiff = 260;
const animationSpeed = 300;

exports.show = function() {
    if ($.wrapper.bottom > 0) return;
    $.wrapper.animate({
        bottom: $.wrapper.bottom + animationDiff,
        duration: animationSpeed
    }, () => {
        $.wrapper.bottom = $.wrapper.bottom + animationDiff;
    });
}

exports.dismiss = function() {
    if ($.wrapper.bottom < 0) return;
    $.wrapper.animate({
        bottom: $.wrapper.bottom - animationDiff,
        duration: animationSpeed
    }, () => {
        $.wrapper.bottom = $.wrapper.bottom - animationDiff;
    });
}

exports.render = function(place) {
    $.title.text = place.name;
}