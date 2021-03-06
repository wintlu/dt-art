$(document).ready(function(argument) {
    var _isLargeScreen = isLargeScreen();

    function selectActive(activeElement) {
        activeElement.siblings().removeClass('active');
        activeElement.addClass('active');
    }

    function selectActiveTab(activeElement) {
        selectActive(activeElement);
        $('img[data-delay-src]', activeElement).each(function(index, img) {
            loadImg($(img));
        })
    }

    function showVideo(mediaUrl, title) {
        if (mediaUrl === 'undefined') {
            return;
        }

        var $modal = $('#video-modal');
        if (mediaUrl) {
            $modal.find('.model-title').text(title);
            $modal.find('iframe').prop('src', mediaUrl);
        }
        $modal.modal({});
        $modal.on('hidden.bs.modal', function() {
            $modal.find('iframe').prop('src', '');
        });
    }

    function hashChanged() {
        if (window.location.hash) {
            var hashID = window.location.hash.substr(1);
            var anchor = $('.menu-nav-2 a[href="#' + hashID + '"]');
            selectActive(anchor.parent());
            var content = $('[name=' + hashID + ']');
            selectActiveTab(content);
        } else {
            var activeAnchor = $('.menu-nav-2 li.active a');
            window.location.hash = activeAnchor.attr('href');
        }
    }

    function loadImg($img) {
        var realSrc = $img.attr('data-delay-src');
        if (_isLargeScreen && $img.attr('data-crop-lg')) {
            realSrc += '?' + $img.attr('data-crop-lg');
        } else if (!_isLargeScreen && $img.attr('data-crop-sm')) {
            realSrc += '?' + $img.attr('data-crop-sm');
        }
        $img.attr('src', realSrc);
    }

    function loadImages() {
        $('img[data-delay-src].eager').each(function(index, img) {
            loadImg($(img));
        });
    }

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
            prevArrow: '<span class="prevArrow hidden-xs hidden-sm icon-left-open-big"></span>',
            nextArrow: '<span class="nextArrow hidden-xs hidden-sm icon-right-open-big"></span>'
        });
    }

    var slicker = null;

    function showImageSlick(index, urls) {
        if (slicker) {
            slicker.slick('unslick');
        }
        slicker = $('#image-slick');
        slicker.slick({
            prevArrow: '<span class="prevArrow hidden-xs hidden-sm icon-left-open-big"></span>',
            nextArrow: '<span class="nextArrow hidden-xs hidden-sm icon-right-open-big"></span>'
        });
        $('.slick-slide', slicker).remove();
        $.each(urls, function(index, url) {
            var positionStr = (index + 1).toString() + '/' + urls.length;
            slicker.slick('slickAdd', '<div><img src="' + url + '"></img><div class="title">' + positionStr + '</div></div>');
        });
        slicker.slick('slickGoTo', index);
        slicker.addClass('active');
        slicker.on('click', function(event, arg2) {
            var $target = $(event.target);
            if ($target.hasClass('prevArrow') || $target.hasClass('nextArrow')) {
                return;
            }
            slicker.removeClass('active');
        });
    }

    $('.modal-nav-toggle').click(function() {
        $('.modal-nav-wrap').addClass('active');
    });
    $('.modal-nav-wrap .close-button').click(function() {
        $('.modal-nav-wrap').removeClass('active');
    });

    $('[data-media]').click(function(event) {
        var mediaUrl = $(this).data('media');
        var title = $(this).find('.img-title').text();
        showVideo(mediaUrl, title);
    });

    $('[data-image]').click(function(event) {
        var imgs = $(this).parents('.tab-pane').find('[data-image] img');
        var urls = $.map(imgs, function(img) {
            return $(img).attr('data-delay-src');
        });
        var curUrl = $(this).find('img').attr('data-delay-src');
        var index = urls.indexOf(curUrl);
        showImageSlick(index, urls);
    });

    $(window).on('hashchange', hashChanged);
    hashChanged();
    loadImages();
    initSlicker();
});
