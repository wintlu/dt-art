$(document).ready(function(argument) {
    function selectActive(activeElement) {
        activeElement.siblings().removeClass('active');
        activeElement.addClass('active');
    }

    function hashChanged() {
        if (window.location.hash) {
            var hashID = window.location.hash.substr(1);
            $('.menu-nav-2 a[href="#' + hashID + '"]').click();
        }
    }

    $('.modal-nav-toggle').click(function() {
        $('.modal-nav-wrap').addClass('active');
    });
    $('.modal-nav-wrap .close-button').click(function() {
        $('.modal-nav-wrap').removeClass('active');
    });

    $('.menu-nav-2 a').click(function(event) {
        var nav = $(event.target);
        selectActive(nav.parent());
        var hash = event.target.hash;
        var content = $(hash);
        selectActive(content);
        event.preventDefault();
    });

    $(window).on('hashchange', hashChanged);
    hashChanged();
});
