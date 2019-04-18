var onHome, onLuzzo, onFranc, onLojas, onLoja, onEmenta;
var classList, finalType;
var tapaFooter, reservaFooterBt, navbarHeader ;



jQuery(document).ready(function(){

  	console.log("Bem Vindo ao website Luzzo 2019!");
  	console.log("by:gomastudio.net");

    findType();

});//end Doc

function findType() {
    tapaFooter = document.querySelector('.tapa');
    reservaFooterBt = document.querySelector(".f-reserva");
    navbarHeader = document.querySelector(".navbar"); 

    onHome = false;
    onLuzzo = false;
    onFranc = false;
    onLojas = false;
    onLoja = false;
    onEmenta = false;
    classList = ['path-home','page-node-type-luzzo','page-node-type-franchising','path-lojas','page-node-type-loja','page-node-type-ementa'];

    var classBody = jQuery('body').attr('class').split(' ');

  if (jQuery('body').hasClass(classList[0]) == true) {
    onHome = true;
    finalType = "onHome";
  } else if (jQuery('body').hasClass(classList[1]) == true) {
    onLuzzo = true;
    finalType = "onLuzzo";
  } else if (jQuery('body').hasClass(classList[2]) == true) {
    onFranc = true;
    finalType = "onFranc";
  } else if (jQuery('body').hasClass(classList[3]) == true) {
    onLojas = true;
    finalType = "onLojas";
  } else if (jQuery('body').hasClass(classList[4]) == true) {
    onLoja = true;
    finalType = "onLoja";
  } else if (jQuery('body').hasClass(classList[5]) == true) {
    onEmenta = true;
    finalType = "onEmenta";
  }   

  console.log("TYPE: "+finalType);
  APPLogic(finalType);
}


function APPLogic(qualType) {

  switch (qualType) {
    case 'onHome':
          initSliderHome();
          animateCaptionsHome();
          setTimeout(corrigirModal,300);
          makeHomeParallax();
          
          break;
    case 'onLuzzo':
          jQuery('.menu--main li:nth-child(1)').addClass("active");

          makeLuzzoParallax();


          break;
    case 'onFranc':
          jQuery('.menu--main li:nth-child(2)').addClass("active");

         break;
    case 'onLojas':
          jQuery('.menu--main li:nth-child(3)').addClass("active");



         break;
    case 'onLoja':
          jQuery('.menu--main li:nth-child(3)').addClass("active");

          initSliderHome();
          makeLojaParallax();

         break;
    case 'onEmenta':
          jQuery('.menu--main li:nth-child(5)').addClass("active");

         break;
      
  }



    
    initEvents();


}



function initSliderHome() {
    //
    //Fix name city
    //

  if (onLoja) {
      jQuery( "#flexslider-2 .slides li" ).each(function( index ) {
        var thisOne  = jQuery(this);
        var myDiv1Para =  thisOne.find( ".views-field-field-cidade > .field-content" ).remove();
        var myDivOnde = thisOne.find('.views-field-field-nome');
        myDiv1Para.appendTo(myDivOnde);
      });
  }



  	//
  	//Fix Height Slider 
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

function corrigirModal() {

    //
    //Fix Modal News Position 
    //

      jQuery( ".modalajust" ).each(function( index ) {
        var thisOne  = jQuery(this).remove();
        var myDivOnde = jQuery( "body" );
        thisOne.appendTo(myDivOnde);
      });


      var maxHeight = 0;
      jQuery( "#block-views-block-slider-noticias-block-1 .slides li" ).each(function( index ) {

            console.log("jQuery(this).height(): "+jQuery(this).outerHeight());

         if (jQuery(this).outerHeight() > maxHeight) { 
          maxHeight = jQuery(this).outerHeight(); 
        }
      });

      jQuery( "#block-views-block-slider-noticias-block-1 .slides li" ).height((maxHeight+100));

}

function initEvents() {

  jQuery( ".navbar-toggle" ).click(function() {
    jQuery(this).toggleClass("clickMenuBur"); 
    jQuery('body').toggleClass("modal-open");
  });



  switch (finalType) {
    case 'onHome':

          jQuery( ".godown" ).click(function() {
              // var options = { document.querySelector('.main-container')};
              var desiredOffset = jQuery('#navbar').height();

            console.log("desiredOffset: "+desiredOffset);


              // animateScrollTo(document.querySelector('.main-container'));
              animateScrollTo(desiredOffset, document.querySelector('.main-container'));
          });

          break;
    case 'onLuzzo':

          break;
    case 'onFranc':

         break;
    case 'onLojas':

         break;
    case 'onLoja':

          jQuery( ".godown" ).click(function() {
              // animateScrollTo(document.querySelector('#block-nextpreviousblock'));

              var Offset = jQuery('#navbar').height();
              Offset = pos_to_neg(Offset);
              var options = {offset: Offset};

              console.log("Offset = "+Offset);

              animateScrollTo(document.querySelector('#block-nextpreviousblock'),options);
          });

         break;
    case 'onEmenta':

         break;
      
  }



    //evento onScroll
    window.onscroll = function(){
      verificaScroll();
    }
}

function verificaScroll() {

  

      if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
        navbarHeader.classList.add("navbarPeq");
      } else {
        navbarHeader.classList.remove("navbarPeq");
      }



  if (isInViewport(tapaFooter)) {
      tapaFooter.classList.add("ani-tapa-footer");
      TweenMax.to(reservaFooterBt, .8, {opacity:"1", delay:1});
  }else{
      tapaFooter.classList.remove("ani-tapa-footer");
      TweenMax.to(reservaFooterBt, 0, {opacity:"0"});
  }



}

// UTEIS
function pos_to_neg(num){
      return -Math.abs(num);
}

//verifica se está na viewPort
var isInViewport = function (elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= ((window.innerHeight || document.documentElement.clientHeight)+(bounding.height/1.3) ) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

function makeHomeParallax() {
  // init controller
            var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "200%"}});
            // build scenes
            new ScrollMagic.Scene({triggerElement: "#flexslider-1"})
                    .setTween("#flexslider-1 .slides > li", {y: "80%", ease: Linear.easeNone})
                    .addTo(controller);

}
function makeLuzzoParallax() {
  // init controller
            var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "200%"}});
            // build scenes
            new ScrollMagic.Scene({triggerElement: ".field--name-field-ilustra-logo"})
                    .setTween(".field--name-field-ilustra-logo img", {y: "80%", ease: Linear.easeNone})
                    .addTo(controller);

}
function makeLojaParallax() {
            var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "200%"}});
            // build scenes
            new ScrollMagic.Scene({triggerElement: "#flexslider-2"})
                    .setTween("#flexslider-2 .slides > li", {y: "80%", ease: Linear.easeNone})
                    .addTo(controller);
}









