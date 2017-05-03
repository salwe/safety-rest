jQuery(document).ready(function($){

	$('.fancy').fancybox();
	
	// Sliders
	$('.countries').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows:true,
		autoplay:true
	});
	$('.count-slider').slick({
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows:true,
		autoplay:true
	});
	$('.reviews').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows:true,
		autoplay:true
	});

    $('.slider_size_full').slick({
		dots: true,
		arrows: false,
		slidesToShow: 1,
		adaptiveHeight: true,
		customPaging : function(slider, i) {
	        return '<a class="circle"></a>';
	    }
    });
     $('.offers, .stock').slick({
		dots: false,
		arrows: true,
		slidesToShow: 1,
		adaptiveHeight: true
    });
     $('.reviews-mini-slider').slick({
		dots: false,
		arrows: true,
		slidesToShow: 2,
		adaptiveHeight: true,
		variableWidth: true
    });
     $('.geography').slick({
		dots: false,
		arrows: true,
		slidesToShow: 6,
		slidesToScroll: 6,
		adaptiveHeight: true,
		variableWidth: true
    });

    // Show/hide content on main page
     $('.mainpage__showmore').click(function(e) {
     	e.preventDefault();
     	if ($(this).hasClass('btn-hide')) {
			$('.mainpage__full').show();
			$(this).removeClass('btn-hide').addClass('btn-show').text('Свернуть');
		}
		else {
			$('.mainpage__full').hide();
			$(this).removeClass('btn-show').addClass('btn-hide').text('Читать больше');
			$('html,body').animate({ scrollTop: $('.mainpage').offset().top}, 'fast');
		}
    });

	// Scroll to top
	$(window).scroll(function () {
		if ($(this).scrollTop() > 10) {
			$('#to-top').fadeIn();
		} else {
			$('#to-top').fadeOut();
		}
	});

	$('#to-top').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});

	// Show feedback item in popup on /Otzivy page
	$('.feedback .show_popup').click(function() {
		var fbItem = $(this).closest('.feedback__item');
		var fbPopup = $('.feedback-popup');

		var date = $(fbItem).find('.feedback__date').text();
		var author = $(fbItem).find('.feedback__author').text();
		var text = $(fbItem).find('.feedback__text').text();
		var img = $(fbItem).find('.feedback__h-img img').attr('src');

		$(fbPopup).find('.feedback-popup__date').text(date);
		$(fbPopup).find('.feedback-popup__author').text(author);
		$(fbPopup).find('.feedback-popup__text').text(text);
		$(fbPopup).find('.feedback-popup__h-img img').attr('src', img);
		showPopup($('.feedback-popup'));
	});


	// Show more items on /Otzivy page
	$('.feedback').children('.row').hide();
	showMore($('.feedback'), 0);

	$('.feedback__showmore').click(function(e) {
		e.preventDefault();
		var rowsCount = $(this).attr('data-rows-count');
		//$(this).closest('.feedback');
		if (!showMore($('.feedback'), rowsCount)) {
			$(this).hide();
		}
	});

	// Show/hide answer on FAQ page
	$('.faq__question').click(function() {
		$(this).next('.faq__answer').toggle();
	});

	// Dark bg behind popup
	$("#fade_back").click(function(e){
		hidePopup();
		jQuery(this).animate({opacity: 0}, 300, function(){
			jQuery(this).css('display','none');
		});
	});

	// Popup close btn
	$(".form-popup__close").click(function(e){
		$("#fade_back").click();
	});
	$(".form-popup input, .form-popup textarea").focus(function(){
		if ($(this).hasClass('inp-error')) {
			$(this).removeClass('inp-error');
		}
	})

	// Btns, calling popup
	$(".show-form-quest").click(function(e){
		e.preventDefault();
		showPopup($(".f-quest"));
	});
	$(".show-form-call").click(function(e){
		e.preventDefault();
		showPopup($(".f-call"));
	});
	$(".show-form-login").click(function(e){
		e.preventDefault();
		showPopup($(".f-login"));
	});

	// Popup submit btn
	$(".form-popup .btn-submit").click(function(e){
		e.preventDefault();
		var form = $(this).closest('form');
		if (validatePopup(form)) {
			$.ajax({
				type: "post",
				url: "/sendmessage.php" ,
				data: $(form).serialize(),
				success: function(data){
					if (Boolean(data)) {
						$(form).closest('.form-popup').find('.form-popup__h-form').hide();
						$(form).closest('.form-popup').find('.form-popup__answer').show();
					}
					else {
						alert('Возникла ошибка при отправке формы');
					}
				},
				error: function (xhr, ajaxOptions, thrownError) {
					console.log(xhr.status);
					console.log(thrownError);
				}
			});
		}
	});


//////==============================================================
	$("#show_countries_btn").click(function(){
		$(".row2hide").toggleClass("disabled");
		
	});
	
	$("input[name='phone']:not(.f5)").mask("8(999)999-99-99");
	
});



function showPopup(popup) {
	$("#fade_back").css('display','block').animate({opacity: 0.7}, 300);
	$(popup).css('display','block').animate({opacity: 1}, 300);
	$(popup).addClass('popupIsVisible');
}

function validatePopup(form) {
	var result = true;
	var fields = $(form).find('[data-req="1"]');
	for (var i = 0; i < fields.length; i++) {
		if (!$(fields[i]).val()) {
			result = false;
			$(fields[i]).addClass('inp-error');
		}
		switch ($(fields[i]).attr('data-type')) {
		  case 'email':
		    if (!validateEmail($(fields[i]).val())) {
		    	result = false;
		    	$(fields[i]).addClass('inp-error');
		    }
		    break;
		  case 'text':
		    //Инструкции
		    break;
		}
	}
	return result;
}

function hidePopup() {
	jQuery('.popupIsVisible').removeClass('popupIsVisible').animate({opacity: 0}, 300, function(){
		jQuery(this).css('display','none');
	});
		
}

function showMore(element, rowsCount) {
	rowsCount = parseInt(rowsCount);
	rowsCount += 3;
	$(element).find('.feedback__showmore').attr('data-rows-count', rowsCount);
	if ($(element).children('.row').length < rowsCount) {
		return false;
	}
	$(element).children('.row').each(function(i) {
		if ($(this).index() < rowsCount) {
			$(this).show();
		}
	});
	return true;
}

//==========  SHOW/HIDE by GRAY GROUP  ==========//
function hidetxt(type){
	var show;
	param=document.getElementById(type);
	if(param.style.display == "none") {
		if(show) show.style.display = "none";
		param.style.display = "block";
		show = param;
	}
	else param.style.display = "none"
}

function validateEmail(email) {
	var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return reg.test(email);
}

// Tabs
function openBlock(evt, blockName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("b-tabs__content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("b-tabs__tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(blockName).style.display = "block";
    evt.currentTarget.className += " active";
}