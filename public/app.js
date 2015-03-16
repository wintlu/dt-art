$(document).ready(function(argument) {
    function selectActive(activeElement) {
        activeElement.siblings().removeClass('active');
        activeElement.addClass('active');
    }

    $('.modal-nav-toggle').click(function() {
        $('.modal-nav-wrap').css('display', 'block');
    });
    $('.modal-nav .close').click(function() {
        $('.modal-nav-wrap').css('display', 'none');
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
