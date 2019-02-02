jQuery(document).ready(function(){

  	console.log("Bem Vindo ao website Luzzo 2018!");
  	console.log("by:gomastudio.net");

  	//slider
  	initSliderHome();
  	animateCaptionsHome();
    initEvents();

});//end Doc


function initSliderHome() {

    //
    //Fix name city
    //

  if (jQuery('body').hasClass('page-node-type-loja') == true) {

      console.log("TYPE: page-node-type-loja");

      jQuery( "#flexslider-2 .slides li" ).each(function( index ) {

        var thisOne  = jQuery(this);
        var myDiv1Para =  thisOne.find( ".views-field-field-cidade > .field-content" ).remove();
        var myDivOnde = thisOne.find('.views-field-field-nome');

        myDiv1Para.appendTo(myDivOnde);

      });

  }



  	//
  	//Fix Height Slider Home
  	//

  var $item = jQuery('#flexslider-1 .slides li, #flexslider-2 .slides li');
	var $wHeight = jQuery(window).height();
	$item.eq(0).addClass('active');
	$item.height($wHeight); 
	$item.addClass('full-screen');

	jQuery('#flexslider-1 .slides li img').each(function() {
	  var $src = jQuery(this).attr('src');
	  jQuery(this).parent().css({
	    'background-image' : 'url(' + $src + ')',
	  });
	  jQuery(this).remove();
	});

  jQuery('#flexslider-2 .slides li img').each(function() {
    var $src = jQuery(this).attr('src');
    jQuery(this).parent().parent().parent().css({
      'background-image' : 'url(' + $src + ')',
    });
    jQuery(this).parent().parent().remove();
    jQuery(this).parent().remove();
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

  	jQuery('#flexslider-1 .caption-wrapper').each(function(){        
        jQuery(this).css({'opacity' : '0',});
    });
    jQuery('#flexslider-1').find(".flex-active-slide").find('.caption-wrapper').css({'opacity' : '1',});


	jQuery('#flexslider-1').bind({
    before: function(e) {
      jQuery(this).find(".flex-active-slide").find('.caption-wrapper').each(function(){
        jQuery(this).removeClass("animated slideInUp");
        jQuery(this).css({'opacity' : '0',});
      });
    },
    after: function(e) {
    jQuery(this).find(".flex-active-slide").find('.caption-wrapper').css({'opacity' : '1',});	
      jQuery(this).find(".flex-active-slide").find('.caption-wrapper').addClass("animated slideInUp");
    }
  });
}

function initEvents() {
    jQuery( ".godown" ).click(function() {
        animateScrollTo(document.querySelector('.main-container'));
    });
}


