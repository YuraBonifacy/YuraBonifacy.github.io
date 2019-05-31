$('.comment-form textarea').each(function () {
  this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
}).on('input', function () {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
});

$('.mobi-menu__button').click(function(){
	$('.mobi-menu__wrapper').toggleClass('open-menu');
	$('html').toggleClass('hidden');
	$('.stub').toggleClass('stub-open');
});
$('.user-btn').click(function(e){
	if($(this).is(e.target) || $('.name-user').is(e.target)){
		$('.block-menu-usr').toggle();
	}
});


$(document).click(function(e){
	var div = $(".block-menu-usr"); // Ñ‚ÑƒÑ‚ ÑƒÐºÐ°Ð·Ñ‹Ð²Ð°ÐµÐ¼ ID ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚Ð°
		if (!$('.name-user').is(e.target) &&!$('.user-btn').is(e.target) && !div.is(e.target) && div.has(e.target).length === 0) { // Ð¸ Ð½Ðµ Ð¿Ð¾ ÐµÐ³Ð¾ Ð´Ð¾Ñ‡ÐµÑ€Ð½Ð¸Ð¼ ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚Ð°Ð¼
			div.hide(); // ÑÐºÑ€Ñ‹Ð²Ð°ÐµÐ¼ ÐµÐ³Ð¾
		}
});
$(document).on('click', function(event){
	if($(event.target).closest(".header__wrapper .mobi-menu__button").length || $(event.target).is('.open-menu')){
		return;
	}
	else{
		$('.mobi-menu__wrapper').removeClass('open-menu');
		$('html').removeClass('hidden');
		$('.stub').removeClass('stub-open');
	}
	event.stopPropagation();
});
$(window).resize(function(){
	var w = $(window).width();
	if(w > 760 && $('.mobi-menu__wrapper').hasClass('open-menu')){
		$('.mobi-menu__wrapper').removeClass('open-menu');
        $('.stub').fadeOut('fast');
	}
});
$('.search__button').click(function(){
	$('.top-search').toggleClass('open-search');
});
$('.close-search').click(function(){
	$('.top-search').removeClass('open-search');
});
var sub_category__container = $('.sub-category__container'), timeoutId;
$('.sidebar__category-item').hover(function(){
	clearTimeout(timeoutId);
	$(this).addClass('category-item__open');
	var cat_id = $(this).attr('data-cat');
	// alert(cat_id);
	$.ajax({
		url: "/ajax/menuajax/getsubcat",
		type: "POST",
		data: ({cat_id: cat_id}),
		success: function(msg) {
			$('.sub-category__container').html(msg);
		}
	});
	sub_category__container.show();
}, function(){
	timeoutId = setTimeout($.proxy(sub_category__container,'hide'), 1000)
});
sub_category__container.mouseenter(function(){
    clearTimeout(timeoutId); 
}).mouseleave(function(){
    sub_category__container.hide();
});

//DROPDOWN MENU
$('.dropdown-btn').click(function(){
	$('.mobile-dropdown__box').slideToggle();
});
//dropdown contact
$("#show-contact").on("click", function (event) {
	event.preventDefault();
	$('.contact-block').slideToggle();
});
// add to favorites
$('.add-to-fav').click(function() {
	var favElement = $(this);
	var target_id = favElement.attr('data-id');
	var target_type = favElement.attr('data-type');
	$.ajax({
		url: "/ajax/favourites/addtofavourites",
		type: "POST",
		dataType: 'json',
		data: ({target_id: target_id, target_type: target_type}),
		success: function(d) {
            if (d.status == 'success') {
				favElement.removeClass('favorites-btn-active').addClass('favorites-btn-active');
				popUpShow(5000, 'Ð˜Ð·Ð±Ñ€Ð°Ð½Ð½Ð¾Ðµ', d.message);
            } else {
				popUpShow(5000, 'ÐžÑˆÐ¸Ð±ÐºÐ°', d.message);
            }
		},
		error: function() { // Ð”Ð°Ð½Ð½Ñ‹Ðµ Ð½Ðµ Ð¾Ñ‚Ð¿Ñ€Ð°Ð²Ð»ÐµÐ½Ñ‹
    		popUpShow(3000, 'ÐžÑˆÐ¸Ð±ÐºÐ°', 'Ð”Ð°Ð½Ð½Ñ‹Ðµ Ð½Ðµ Ð¾Ñ‚Ð¿Ñ€Ð°Ð²Ð»ÐµÐ½Ñ‹');
    	}
	});
});

//tree list slide
$('.cat-title').on('touchend',function(e){
	if ($(this).siblings('.sub-cat').css('display')=='none') {
		$('.sub-cat').slideUp('slow');
		$(this).siblings('.sub-cat').slideDown('slow');
		$('.cat-title').removeClass('cat-title__open');
		$(this).addClass('cat-title__open');
	} else {
		$(this).siblings('.sub-cat').slideUp('slow');
		$('.cat-title').removeClass('cat-title__open');
	}
});
$('.sub-cat-title').on('touchend',function(event) {
	if ($(this).siblings('[data-item="'+$(this).data('item-main')+'"]').css('display')=='none') {
		$('.sub-cat-title').removeClass('sub-cat-title__open');
		$(this).addClass('sub-cat-title__open');
		$('.sub-cat-item').not('.sub-cat-title').slideUp();	
		$(this).siblings('[data-item="'+$(this).data('item-main')+'"]').slideDown();
	} else {
		$('.sub-cat-item').not('.sub-cat-title').slideUp();	
		$('.sub-cat-title').removeClass('sub-cat-title__open');	
	}
});

//PopUp
function popUpShow(time, title, msg) {
	$('.popUp').fadeIn('fast');
	$('.popUp-title').text(title);
	$('.popUp-msg').text(msg);
	setTimeout(popUpHide, time);
}

function popUpHide() {
	$('.popUp').fadeOut('fast');
}
//scroll dialog
$(document).ready(function() {
	var height_scroll = $('.dialog-scroll').height();
    $('.dialog-open-block').scrollTop(height_scroll);
});

//Sen Comment
$('.send-comment').click(function(){
	var data = {
		message: $('#message').val(),
		id: $('#rew_id').val(),
		target_id: $('#target_id').val(),
		target_type: $(this).data('type'),
		url: '/ajax/commentajax/sendcomment'
	};
	$.ajax({
		url: data.url,
		type: "POST",
		dataType: 'json',
		data: ({id: data.id, target_id: data.target_id, target_type: data.target_type, message: data.message}),
		success: function(d) {
			if (d.status == 'success' && d.redirect == true) {
				location.reload();
			} else if (d.status == 'success') {
				$('#message').val(null);
				popUpShow(5000, d.title, d.message);
			} else {
				popUpShow(5000, 'ÐžÑˆÐ¸Ð±ÐºÐ°', d.message);
			}
		},
		error: function() { // Ð”Ð°Ð½Ð½Ñ‹Ðµ Ð½Ðµ Ð¾Ñ‚Ð¿Ñ€Ð°Ð²Ð»ÐµÐ½Ñ‹
    		popUpShow(3000, 'ÐžÑˆÐ¸Ð±ÐºÐ°', 'Ð”Ð°Ð½Ð½Ñ‹Ðµ Ð½Ðµ Ð¾Ñ‚Ð¿Ñ€Ð°Ð²Ð»ÐµÐ½Ñ‹');
    	}
	});
});

//addIMG
jQuery(document).ready(function ($) {

	var maxFileSize = 5 * 1024 * 1024; // (Ð±Ð°Ð¹Ñ‚) ÐœÐ°ÐºÑÐ¸Ð¼Ð°Ð»ÑŒÐ½Ñ‹Ð¹ Ñ€Ð°Ð·Ð¼ÐµÑ€ Ñ„Ð°Ð¹Ð»Ð° (2Ð¼Ð±)
	var current_img = 1;
	var queue = {};
	var removedImages = {};
	var form = $('#universe_silent_one');
	var imagesList = $('#uploadImagesList');

	var maxItems = form.data('maximages');
	var currentItemsCount = form.data('currentcount-images');

	var itemPreviewTemplate = imagesList.find('.item.template').clone();
	itemPreviewTemplate.removeClass('template');
	imagesList.find('.item.template').remove();


	$('#addImages').on('change', function () {
		var files = this.files;
		console.log(files);
		currentItemsCount++;

		for (var i = 0; i < files.length; i++) {
			
			if (currentItemsCount > maxItems) {
				currentItemsCount--;
				popUpShow(2000, 'ÐžÑˆÐ¸Ð±ÐºÐ°', 'Ð Ð°Ð·Ñ€ÐµÑˆÐµÐ½Ð¾ Ð´Ð¾Ð±Ð°Ð²Ð»ÑÑ‚ÑŒ Ð´Ð¾ 10 Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ð¹ Ð²ÐºÐ»ÑŽÑ‡Ð¸Ñ‚ÐµÐ»ÑŒÐ½Ð¾');
				continue;
			}

			var file = files[i];

			if ( !file.type.match(/image\/(jpeg|jpg|png)/) ) {
				popUpShow(3000, 'ÐžÑˆÐ¸Ð±ÐºÐ°', 'Ð¤Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ñ Ð´Ð¾Ð»Ð¶Ð½Ð° Ð±Ñ‹Ñ‚ÑŒ Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ jpg Ð¸Ð»Ð¸ png');
				continue;
			}

			if ( file.size > maxFileSize ) {
				popUpShow(3000, 'ÐžÑˆÐ¸Ð±ÐºÐ°', 'Ð Ð°Ð·Ð¼ÐµÑ€ Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ð¸ Ð½Ðµ Ð´Ð¾Ð»Ð¶ÐµÐ½ Ð¿Ñ€ÐµÐ²Ñ‹ÑˆÐ°Ñ‚ÑŒ 5 ÐœÐ±');
				continue;
			}
			
			preview(files[i]);
			//alert(files[i].name);
			//console.log(files[i]);
			console.log(current_img);
			current_img++;
		}

		this.value = '';
	});

	// Ð¡Ð¾Ð·Ð´Ð°Ð½Ð¸Ðµ Ð¿Ñ€ÐµÐ²ÑŒÑŽ
	function preview(file) {
		var reader = new FileReader();
		reader.addEventListener('load', function(event) {
			var img = document.createElement('img');

			var itemPreview = itemPreviewTemplate.clone();

			itemPreview.find('.img-wrap img').attr('src', event.target.result);
			itemPreview.find('.img-wrap').attr('data-filename', file.name);
			itemPreview.data('id', file.name);

			imagesList.append(itemPreview);

			queue[file.name] = file;

		});
		reader.readAsDataURL(file);
	}

	// Ð£Ð´Ð°Ð»ÐµÐ½Ð¸Ðµ Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ð¹
	imagesList.on('click', '.delete-link', function () {
		var item = $(this).closest('.item'),
			id = item.data('id');
		var removed_id = $(this).data('removed-id');
		if ($(this).data('removed-id')) {
			removedImages[removed_id] = removed_id;
		}
		
		delete queue[id];

		currentItemsCount--;
		item.remove();
	});


	// ÐžÑ‚Ð¿Ñ€Ð°Ð²ÐºÐ° Ñ„Ð¾Ñ€Ð¼Ñ‹
	form.on('submit', function(event) {
		event.preventDefault();
		var formData = new FormData(this);

		for (var removed_id in removedImages) {
			formData.append('removed_images[]', removedImages[removed_id]);
		}
		
		for (var id in queue) {
			formData.append('images[]', queue[id]);
		}
		
		// var el = checkField();
		// console.log(el);
		$.ajax({
			url: $(this).attr('action'),
			type: 'POST',
			dataType: 'json',
			data: formData,
			beforeSend: function(){
				$('.popLoader').show();
			},
			complete: function(){
				$('.popLoader').hide();
			},
			success: function(d) {
				//console.log(d);
				if (d.status == 'success' && d.redirect == true) {
					if (d.reset == true) {form.trigger('reset');}
					window.location.href = d.redirect_link;
				} else if (d.status == 'success') {
					if (d.reset == true) {form.trigger('reset');}
					popUpShow(5000, d.title, d.message);
				} else {
					popUpShow(3000, 'ÐžÑˆÐ¸Ð±ÐºÐ°', d.message);
				}
			},
			error: function() {
				popUpShow(3000, 'ÐžÑˆÐ¸Ð±ÐºÐ°', 'Ð”Ð°Ð½Ð½Ñ‹Ðµ Ð½Ðµ Ð¾Ñ‚Ð¿Ñ€Ð°Ð²Ð»ÐµÐ½Ñ‹');
			},
			cache: false,
			contentType: false,
			processData: false
		});

		return false;
	});

});

// Other
$('.btn-universe').on('click', function () {
	var ident_form = $(this).data('form');
	var form = $('#'+ident_form);

	form.on('submit', function(event) {
		event.preventDefault();
		
		var formData = new FormData(this);
		
		$.ajax({
			url: $(form).attr('action'),
			type: 'POST',
			dataType: 'json',
			data: formData,
			async: false,
			beforeSend: function(){
				$('.popLoader').show();
			},
			complete: function(){
				$('.popLoader').hide();
			},
			success: function(d) {
				//console.log(d);
				if (d.status == 'success' && d.redirect == true) {
					if (d.reset == true) {form.trigger('reset');}
					window.location.href = d.redirect_link;
				} else if (d.status == 'success') {
					if (d.reset == true) {form.trigger('reset');}
					popUpShow(5000, d.title, d.message);
				} else {
					popUpShow(3000, 'ÐžÑˆÐ¸Ð±ÐºÐ°', d.message);
				}
			},
			cache: false,
			contentType: false,
			processData: false
		});
		return false;
	});
});

//Cabinet menu-mobi
$('.cabinet__menu-mobi').click(function(){
	$('.cabinet__main-nav').slideToggle();
	if($(this).text() == 'Ð¡ÐºÑ€Ñ‹Ñ‚ÑŒ Ð¼ÐµÐ½ÑŽ'){
		$(this).text('Ð Ð°ÑÐºÑ€Ñ‹Ñ‚ÑŒ Ð¼ÐµÐ½ÑŽ');
	}else{
		$(this).text('Ð¡ÐºÑ€Ñ‹Ñ‚ÑŒ Ð¼ÐµÐ½ÑŽ');
	}
});

//Ð”Ð¾Ð±Ð°Ð²Ð»ÐµÐ½Ð¸Ðµ\Ð˜Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ðµ Ð°Ð²Ð°Ñ‚Ð°Ñ€Ð°
$(document).ready(function(){
	var maxFileSize = 2 * 1024 * 1024;
	var avatar = {};
	
	function showCoords(c){
		x1 = c.x; $('#x1').val(c.x);		
		y1 = c.y; $('#y1').val(c.y);		
		x2 = c.x2; $('#x2').val(c.x2);		
		y2 = c.y2; $('#y2').val(c.y2);
		
		$('#w').val(c.w);
		$('#h').val(c.h);
		
		if(c.w > 0 && c.h > 0){
			$('#crop').show();
		}else{
			$('#crop').hide();
		}
	}
	
	var form = $('#form_upload_avatar');
	
	$('#addAvatar').one('change', function () {
		var files = this.files;		

			var file = files[0];

			if ( !file.type.match(/image\/(jpeg|jpg|png)/) ) {
				popUpShow(3000, 'ÐžÑˆÐ¸Ð±ÐºÐ°', 'Ð¤Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ñ Ð´Ð¾Ð»Ð¶Ð½Ð° Ð±Ñ‹Ñ‚ÑŒ Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ jpg Ð¸Ð»Ð¸ png');
				return;
			}

			if ( file.size > maxFileSize ) {
				popUpShow(3000, 'ÐžÑˆÐ¸Ð±ÐºÐ°', 'Ð Ð°Ð·Ð¼ÐµÑ€ Ñ„Ð¾Ñ‚Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ð¸ Ð½Ðµ Ð´Ð¾Ð»Ð¶ÐµÐ½ Ð¿Ñ€ÐµÐ²Ñ‹ÑˆÐ°Ñ‚ÑŒ 2 ÐœÐ±');
				return;
			}
			var formData = new FormData(form);
			formData.append('image', file);
			$.ajax({
				url: '/ajax/cabinetajax/loadtmpavatar',
				type: 'POST',
				dataType: 'json',
				data: formData,
				async: false,
				beforeSend: function(){
					$('.popLoader').show();
				},
				complete: function(){
					$('.popLoader').hide();
				},
				success: function(d) {
					if (d.status == 'success') {
						$('#previewava').html('<img src="'+d.filelink+'">');
						$('#form_set_avatar').css( "display", "block");
						$('#previewava img').Jcrop({		
							minSize: [30, 30],
							bgColor: 'black',
							bgOpacity: 0.4,
							onChange: showCoords,
							onSelect: showCoords,
							aspectRatio: 1
						},function(){		
							jcrop_api = this;		
						});
					} else {
						popUpShow(3000, 'ÐžÑˆÐ¸Ð±ÐºÐ°', d.message);
					}
				},
				cache: false,
				contentType: false,
				processData: false
			});

		this.value = '';
	});
	
});

$('body').on('click','.img-wrap', function(){
	var main_img = $(this).data("filename");
	$('#main_image').val(main_img);
	$('.img-wrap').removeClass('main-img');
	$(this).addClass('main-img');
});

$('.comment-item').click(function(){
	var userId = $(this).data("comment-id"),
		userName = $(this).find('.comment__user-name').text(),
		destination = ($('.comment-form').offset().top)-300;
		$('html').animate({ scrollTop: destination }, 600);
		$('#rew_id').val(userId);
		$('#message').val(userName+', ');
		$('#message').focus();
});

$(document).ready(function(){
	$('.input-dialog').focus();
});

$('.button-send-message').click(function(e){
	sendMessage($('#content-message'));
});

$('#content-message').keydown(function(e){
	if ((event.keyCode == 10 || event.keyCode == 13) && event.ctrlKey){
		sendMessage($(this));
	}
});

function sendMessage(el){
	var mesText = el.val(),
			id = el.data("sendId"),
			author = el.data("author"),
			owner = el.data("owner"),
			sendUrl = '';
	// if(!(/^\s+$/.test(mesText))){
		switch(author){
			case 'u':
				sendUrl = '/ajax/messages/sendmsgu';
				break;
			case 'b':
				sendUrl = '/ajax/messages/sendmsgb';
				break;
			case 'a':
				sendUrl = '/ajax/messages/sendmsga';
				break;
			default:
    			return;
		}
		$.ajax({
			url: sendUrl,
			type: 'POST',
			data: ({message: mesText, sendId: id, owner: owner}),
			success: function(d) {
				el.val('');
			}
		});
	//}
}

function updateMsg(mass){
	for(var i = 0; i <= (mass.length-1); i++){
		if($('*').is('.dialog-item-open')){
			$('.dialog-item-open').last().after('<div class="dialog-item-open"><div class="dialogs-item__img"><img src="'+mass[i].avatar_link+'"></div><div class="dialogs-item__content"><div class="dialogs-item__title">'+mass[i].target_name+'</div><div class="dialogs-item__date">'+mass[i].date+'</div><div class="dialogs-item__desc">'+mass[i].text+'</div><span data-tooltip="Ð£Ð´Ð°Ð»Ð¸Ñ‚ÑŒ" class="remove-btn-dialog remove-btn-umsg" data-id="'+mass[i].id+'"></span> </div></div>');
		}else{
			$('.dialog-scroll').html('<div class="dialog-item-open"><div class="dialogs-item__img"><img src="'+mass[i].avatar_link+'"></div><div class="dialogs-item__content"><div class="dialogs-item__title">'+mass[i].target_name+'</div><div class="dialogs-item__date">'+mass[i].date+'</div><div class="dialogs-item__desc">'+mass[i].text+'</div><span data-tooltip="Ð£Ð´Ð°Ð»Ð¸Ñ‚ÑŒ" class="remove-btn-dialog remove-btn-umsg" data-id="'+mass[i].id+'"></span> </div></div>');
		}
	}
}


function reload(id, update){
	var u = update;
	var timer = setInterval(function(){
		$.ajax({
			url: '/ajax/messages/im/?sel='+id+'&update='+u,
			type: 'POST',
			success: function(ret){
				var user = JSON.parse(ret);
				console.log(ret);
				if(user['dialog'].length != 0){
					updateMsg(user['dialog']);
					$('.dialog-open-block').scrollTop(99999);
					u = user['update'];
				}else{
					return;
				}
			}
		});
	}, 1000);
}

function reloada(owner, id, update){
	var u = update;
	var timer = setInterval(function(){
		$.ajax({
			url: '/ajax/messages/aim'+owner+'/?sel='+id+'&update='+u,
			type: 'POST',
			success: function(ret){
				var user = JSON.parse(ret);
				console.log(ret);
				if(user['dialog'].length != 0){
					updateMsg(user['dialog']);
					$('.dialog-open-block').scrollTop(99999);
					u = user['update'];
				}else{
					return;
				}
			}
		});
	}, 1000);
}

function reloadb(owner, id, update){
	var u = update;
	var timer = setInterval(function(){
		$.ajax({
			url: '/ajax/messages/bim'+owner+'/?sel='+id+'&update='+u,
			type: 'POST',
			success: function(ret){
				var user = JSON.parse(ret);
				console.log(ret);
				if(user['dialog'].length != 0){
					updateMsg(user['dialog']);
					$('.dialog-open-block').scrollTop(99999);
					u = user['update'];
				}else{
					return;
				}
			}
		});
	}, 1000);
}


function windowSize(){
    if ($(window).width() >= '768'){
        $('.user-image-cabinet').mouseenter(function(e){
			$('.upload-avatar-desctop', this).fadeIn('fast');
		});
		$('.user-image-cabinet').mouseleave(function(e){
			$('.upload-avatar-desctop', this).fadeOut('fast');
		});
    }
}
$(window).on('load resize',windowSize);

$('.source').click(function(){
	var link = $(this).data('link');
	window.open(link,'_blank');
});

$(document).ready(function(){
	$("[tip]").hover(function() {
		var data_tip = $(this).attr("tip");

		$("#tooltip").text(data_tip).css({ 
			"top" : $(this).offset().top - $("#tooltip").height() - 15,
			"left" : $(this).offset().left - Math.floor($("#tooltip").outerWidth(true) / 2) + Math.floor($(this).outerWidth(true) / 2)
		}).show();
	}, function() {
		$("#tooltip").hide().text("").css({
			"top" : 0,
			"left" : 0
		});
	});
});

$(function() {
	$(window).scroll(function() {
		if($(this).scrollTop() != 0) {
			$('#toTop').fadeIn();
		}else{
			$('#toTop').fadeOut();
		}
	});

	$('#toTop').click(function() {
		$('body,html').scrollTop(0);
	});
});

$(function(){
	var header = $("#header"),
		scrollEvent = 20;
	$(document).on('touchstart scroll', function(e){
		if($(window).width() <= 580){
			var scrolled = $(window).scrollTop();
			if(scrolled > 20){
				if(scrolled > scrollEvent){
					if(!header.hasClass('hide-header')){
						header.addClass('hide-header');
					}
				}else{
					if(header.hasClass('hide-header')){
						header.removeClass('hide-header');
					}
				}
				scrollEvent = scrolled;
			}else{
				header.removeClass('hide-header');
			}
		}
	});
});

$('.right-category__title').on('touchend', function(e){
	if($('.filter-block').hasClass('filter-open')){
		$('.filter-block').removeClass('filter-open');
	}else{
		$('.filter-block').addClass('filter-open');
	}
});

$("#btn-list").on('click', function(){
	$('#wrapper-list').toggle('fast');
	$('#wrapper-list').toggleClass('open-list');
	if($('#wrapper-list').hasClass('open-list')){
		$("#btn-list").text('Ð¡ÐºÑ€Ñ‹Ñ‚ÑŒ ÑÐ¿Ð¸ÑÐ¾Ðº ÑÐ¾Ñ†Ð¸Ð°Ð»ÑŒÐ½Ñ‹Ñ… ÑÐµÑ‚ÐµÐ¹');
	}else{
		$("#btn-list").text('ÐžÑ‚ÐºÑ€Ñ‹Ñ‚ÑŒ ÑÐ¿Ð¸ÑÐ¾Ðº ÑÐ¾Ñ†Ð¸Ð°Ð»ÑŒÐ½Ñ‹Ñ… ÑÐµÑ‚ÐµÐ¹');
	}
});

$('.item-like').click(function(){
	var target_id = $(this).data('id'),
		target_type = $(this).data('type'),
		is_like = $(this).data('state');
		tripcode = $('.block-like').data('tripcode');
	var current = $(this);
	$.ajax({
		url: 'https://onlinebrest.by/ajax/core/like',
		type: 'POST',
		dataType: 'JSON',
		data: ({target_id:target_id, target_type:target_type, is_like:is_like, tripcode:tripcode}),
		success: function(res){
			if(res.status == 'success'){
				$('#like-counter').text(res.cl);
				$('#dislike-counter').text(res.cd);
				$('.item-like').removeClass('active-like');
				$(current).addClass('active-like');
				if (res.tripcode != '' && res.tripcode != null) {
					$('.block-like').data('tripcode', res.tripcode)
				}
			} else if (res.status == 'error') {
				popUpShow(2000, 'ÐžÑˆÐ¸Ð±ÐºÐ°', res.message);
				$('#like-counter').text(res.cl);
				$('#dislike-counter').text(res.cd);
			} else {
				$('#like-counter').text(res.cl);
				$('#dislike-counter').text(res.cd);
			}
		},
		error: function(res){
			popUpShow(3000, 'ÐžÑˆÐ¸Ð±ÐºÐ°', d.message);
		}
	})
});