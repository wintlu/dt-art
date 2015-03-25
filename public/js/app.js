$(document).ready(function(argument) {

    var imageIndex = 0;
    var imageCollection = [];

    function selectActive(activeElement) {
        activeElement.siblings().removeClass('active');
        activeElement.addClass('active');
    }

    function showVideo(mediaUrl) {
        if (mediaUrl) {
            $('#video-modal').find('iframe').prop('src', mediaUrl);
        }
        $('#video-modal').modal({});
    }

    function showImage(){
        var $imageModal = $('#image-modal');
        var realIndex = imageIndex % imageCollection.length
        var realImageWrap = imageCollection.get(realIndex);
        if(realImageWrap){
            var img = $(realImageWrap).find('img');
            $imageModal.find('img').attr('src', img.attr('src'));
        }
    }

    function showImageModal(index, collection) {
        var $imageModal = $('#image-modal');
        imageIndex = index;
        imageCollection = collection;
        $imageModal.modal({});
        showImage();
    }

    function initImageModal() {
        var $imageModal = $('#image-modal');
        $imageModal.find('.left').click(function() {
            imageIndex--;
            showImage();
        });
        $imageModal.find('.right').click(function() {
            imageIndex++;
            showImage();
        });
    };

    function hashChanged() {
        if (window.location.hash) {
            var hashID = window.location.hash.substr(1);
            var anchor = $('.menu-nav-2 a[href="#' + hashID + '"]');
            selectActive(anchor.parent());
            var content = $('[name=' + hashID + ']');
            selectActive(content);
        } else {
            var activeAnchor = $('.menu-nav-2 li.active a');
            window.location.hash = activeAnchor.attr('href');
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

    function delayLoadImg(isLargeScreen) {
        $('img[data-delay-src]').each(function(index, img) {
            var $img = $(img);
            var realSrc = isLargeScreen ? $img.attr('data-delay-src') : $img.attr('data-delay-src') + '?small';
            $img.attr('src', realSrc);
        });
    };

    function isLargeScreen() {
        return $('#media-indicator').css('display') === 'block';
    }

    $('.modal-nav-toggle').click(function() {
        $('.modal-nav-wrap').addClass('active');
    });
    $('.modal-nav-wrap .close-button').click(function() {
        $('.modal-nav-wrap').removeClass('active');
    });

    $('[data-media]').click(function(event) {
        var mediaUrl = $(event.target).data('media');
        showVideo(mediaUrl);
    })

    $('[data-image]').click(function(event) {
        var collection = $(this).parents('.tab-pane').find('[data-image]');
        var index = collection.index(this);
        showImageModal(index, collection);
    })

    $(window).on('hashchange', hashChanged);
    hashChanged();
    initSlider();
    initImageModal();
    delayLoadImg(isLargeScreen());
});
