jQuery(document).ready(function ($) {
	$('#menu').on('click', function () {
		$('html').css('overflow', 'hidden');
		$('.mobile-menu').toggle();
	});

	$('.mobile-menu').on('click', function(){
		$(this).toggle();
	});
});