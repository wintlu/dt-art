$(document).ready(function(argument) {
    function selectActive(activeElement) {
        activeElement.siblings().removeClass('active');
        activeElement.addClass('active');
    }

    $('.modal-nav-toggle').click(function() {
        $('.modal-nav-wrap').show();
    });
    $('.modal-nav-wrap .close-button').click(function() {
        $('.modal-nav-wrap').hide();
    });

    $('.menu-nav-2 a').click(function(event) {
        var nav = $(event.target);
        selectActive(nav.parent());
        var hash = event.target.hash;
        var content = $(hash);
        selectActive(content);
        event.preventDefault();
    });
});
