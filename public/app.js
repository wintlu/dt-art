$(document).ready(function(argument) {
    function selectActive(activeElement) {
        activeElement.siblings().removeClass('active');
        activeElement.addClass('active');
    }

    function showMedia(mediaUrl) {
        if (mediaUrl) {
            $('#video-modal').find('iframe').prop('src', mediaUrl);
        }
        $('#video-modal').modal({});
    }

    function hashChanged() {
        if (window.location.hash) {
            var hashID = window.location.hash.substr(1);
            var anchor = $('.menu-nav-2 a[href="#' + hashID + '"]');
            selectActive(anchor.parent());
            var content = $('[name=' + hashID + ']');
            selectActive(content);
        }
    }

    function initSlider() {
        if (window.$JssorSlider$) {
            var options = {
                $AutoPlay: true,
                $FillMode: 2,
                $ArrowNavigatorOptions: {
                    $Class: $JssorArrowNavigator$,
                    $ChanceToShow: 2,
                    $AutoCenter: 2
                }
            };
            var jssor_slider1 = new $JssorSlider$('slider_container', options);

            function ScaleSlider() {
                var bodyWidth = document.body.clientWidth;
                if (bodyWidth)
                    jssor_slider1.$ScaleWidth(Math.min(bodyWidth, 1920));
                else
                    window.setTimeout(ScaleSlider, 30);
            }
            ScaleSlider();

            $(window).bind("load", ScaleSlider);
            $(window).bind("resize", ScaleSlider);
            $(window).bind("orientationchange", ScaleSlider);
        }
    }

    $('.modal-nav-toggle').click(function() {
        $('.modal-nav-wrap').addClass('active');
    });
    $('.modal-nav-wrap .close-button').click(function() {
        $('.modal-nav-wrap').removeClass('active');
    });

    $('[data-media]').click(function(event) {
        var mediaUrl = $(event.target).data('media');
        showMedia(mediaUrl);
    })

    $(window).on('hashchange', hashChanged);
    hashChanged();
    initSlider();
});
