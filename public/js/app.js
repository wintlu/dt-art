$(document).ready(function(argument) {

    function selectActive(activeElement) {
        activeElement.siblings().removeClass('active');
        activeElement.addClass('active');
    }

    function showVideo(mediaUrl) {
        var $modal = $('#video-modal');
        if (mediaUrl) {
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
            centerMode: true,
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
        showVideo(mediaUrl);
    });

    $('[data-image]').click(function(event) {
        var imgs = $(this).parents('.tab-pane').find('[data-image] img');
        var urls = $.map(imgs, function(img) {
            return $(img).attr('src');
        });
        var curUrl = $(this).find('img').attr('src');
        var index = urls.indexOf(curUrl);
        showImageSlick(index, urls);
    });

    $(window).on('hashchange', hashChanged);
    hashChanged();
    delayLoadImg(isLargeScreen());
    initSlicker();
});
