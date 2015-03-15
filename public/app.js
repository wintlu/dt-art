$(document).ready(function (argument) {
	$('.modal-nav-toggle').click(function () {
		$('.modal-nav-wrap').css('display', 'block');
	});
	$('.modal-nav .close').click(function () {
		$('.modal-nav-wrap').css('display', 'none');
	});

	$('.menu-nav-2 a').click(function (event) {
		var nav = $(event.target);
		nav.parent().parent().find('li').removeClass('active');
		nav.parent('li').addClass('active');

		var hash= event.target.hash;
		var content = $(hash);
		content.parent().find('.tab-pane img').removeClass('active animated flipInX');
		content.find('img').addClass('active animated flipInX');
		event.preventDefault();
	});
});