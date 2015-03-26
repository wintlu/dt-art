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

    function showImage() {
        var $imageModal = $('#image-modal');
        var realIndex = imageIndex % imageCollection.length
        var realImageWrap = imageCollection.get(realIndex);
        if (realImageWrap) {
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

    function delayLoadImg(isLargeScreen) {
        $('img[data-delay-src]').each(function(index, img) {
            var $img = $(img);
            var realSrc = $img.attr('data-delay-src')
            if (!isLargeScreen) {
                var cropParam = $img.attr('data-crop');
                realSrc = realSrc + '?' + cropParam;
            }
            $img.attr('src', realSrc);
        });
    };

    function isLargeScreen() {
        var $html = $('html');
        if ($html.hasClass('ie8')) {
            return true;
        }
        return $('#media-indicator').css('display') === 'block';
    }

    function initSlicker() {
        $('.slick-carousel').slick({
            auto: true,
            prevArrow: '<span class="prevArrow hidden-xs hidden-sm glyphicon glyphicon-chevron-left"></span>',
            nextArrow: '<span class="nextArrow hidden-xs hidden-sm glyphicon glyphicon-chevron-right"></span>'
        });
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
    delayLoadImg(isLargeScreen());
    initSlicker();
    initImageModal();
});
