var ImageViewer = (function() {
    var self;

    function ImageViewer(container) {
        this.$container = $(container);
        this.$container.find('.left-button').click(this.goLeft);
        this.$container.find('.right-button').click(this.goRight);
        this.$container.find('.close-button').click(this.close);
        this.index = 0;
        this.coll = [];
        self = this;
    }

    ImageViewer.prototype.showCurrent = function() {
        var _index = self.index % self.coll.length;
        var curImageUrl = this.coll[_index];
        this.$container.find('img').attr('src', curImageUrl);
    }

    ImageViewer.prototype.close = function() {
        self.$container.removeClass('active');
        self.index = 0;
        self.coll = [];
    }

    ImageViewer.prototype.goLeft = function() {
        self.index--;
        self.showCurrent();
    }

    ImageViewer.prototype.goRight = function() {
        self.index++;
        self.showCurrent();
    }
    11

    ImageViewer.prototype.show = function(_index, _coll) {
        this.index = _index;
        this.coll = _coll;
        this.showCurrent();
        this.$container.addClass('active');
    }

    return ImageViewer;
})();

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

    var imageViewer = new ImageViewer('#image-viewer');

    $('[data-image]').click(function(event) {
        var imgs = $(this).parents('.tab-pane').find('[data-image] img');
        var urls = $.map(imgs, function(img) {
            return $(img).attr('src');
        });
        var curUrl = $(this).find('img').attr('src');
        // var index = collection.index(this);
        // showImageModal(index, collection);
        var index = urls.indexOf(curUrl);
        imageViewer.show(index, urls);
    })

    $(window).on('hashchange', hashChanged);
    hashChanged();
    delayLoadImg(isLargeScreen());
    initSlicker();
    initImageModal();

});
