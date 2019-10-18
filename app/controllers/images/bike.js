if (!$.args.number) {
    $.numberIndicator.visible = false
}

if ($.args.rack) {
    $.bikeIcon.text = ""; // https://fontawesome.com/icons/container-storage?style=light
    if ($.args.number === 0) {
        $.mapIcon.backgroundColor = "#A7271B";
        $.bikeIcon.color = "#fff"
    }
}

if ($.args.selected) {
    $.mapIcon.backgroundColor = "#147B36";
    $.bikeIcon.color = "#fff"
}