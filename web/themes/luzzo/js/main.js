jQuery(document).ready(function(){

  	console.log("Bem Vindo ao website Luzzo 2018!");
  	console.log("by:gomastudio.net");

  	//slider
  	initSliderHome();
  	animateCaptionsHome();

});//end Doc


function initSliderHome() {
  	//
  	//Fix Height Slider Home
  	//

  	var $item = jQuery('#slider-home-page .slides li'); 
	var $wHeight = jQuery(window).height();
	$item.eq(0).addClass('active');
	$item.height($wHeight); 
	$item.addClass('full-screen');

	jQuery('#slider-home-page .slides li img').each(function() {
	  var $src = jQuery(this).attr('src');
	  jQuery(this).parent().css({
	    'background-image' : 'url(' + $src + ')',
	  });
	  jQuery(this).remove();
	});

	jQuery(window).on('resize', function (){
	  $wHeight = jQuery(window).height();
	  $item.height($wHeight);
	});
}

function animateCaptionsHome() {
	//
  	//Animate captions Slider Home
  	//

  	jQuery('#slider-home-page .caption-wrapper').each(function(){        
        jQuery(this).css({'opacity' : '0',});
    });
    jQuery('#slider-home-page').find(".flex-active-slide").find('.caption-wrapper').css({'opacity' : '1',});


	jQuery('#slider-home-page').bind({
    before: function(e) {
      jQuery(this).find(".flex-active-slide").find('.caption-wrapper').each(function(){
        jQuery(this).removeClass("animated slideInLeft");
        jQuery(this).css({'opacity' : '0',});
      });
    },
    after: function(e) {
    jQuery(this).find(".flex-active-slide").find('.caption-wrapper').css({'opacity' : '1',});	
      jQuery(this).find(".flex-active-slide").find('.caption-wrapper').addClass("animated slideInLeft");
    }
  });
}


