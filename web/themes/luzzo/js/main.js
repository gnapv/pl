var onHome, onLuzzo, onFranc, onLojas, onLoja, onEmenta, onEmentaItem;
var classList, finalType;
var tapaFooter, reservaFooterBt, navbarHeader ;
var currentLink;

//drupal metodo para inserir jquery com o $ - actualiza com o AJAX
(function ($, Drupal) {
  Drupal.behaviors.myModuleBehavior = {
    attach: function (context, settings) {


      $('#modal-62 .webform-progress__summary', context).once('myCustomBehavior').each(function () {
        // Apply the myCustomBehaviour effect to the elements only once.
       changeProgressText();
       //console.warn("vem do metodo com AJAX");

      });
    }
  };
})(jQuery, Drupal);



jQuery(document).ready(function(){

  	//console.log("Bem Vindo ao website Luzzo!");
  	console.log(" ");
  	console.log(" ");

    console.log("  %cby:%cGoMaStudio.net %c %c %c", "border-left:10px solid #de4b3a; background: #444; color: #eb7f3b; padding: 10px; border-radius:0px", "color: orange; background: #444; color: #fff; padding:10px 10px 10px 0; border-right:10px solid #2a9a88; border-radius:0px; ", "background: #444; border-left:5px solid #e4683a; padding:10px;  border-radius:20px", "border-left:5px solid #e24e3b; padding:10px;background: #444;", "border-left:5px solid #e4683a; padding:10px;background: #444; border-radius:20px");

  	console.log(" ");
  	console.log(" ");


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
    onEmentaItem = false;
    classList = ['path-home','page-node-type-luzzo','page-node-type-franchising','path-lojas','page-node-type-loja','path-ementa','page-node-type-ementa','path-frontpage'];

    var classBody = jQuery('body').attr('class').split(' ');

  if (jQuery('body').hasClass(classList[0]) == true || jQuery('body').hasClass(classList[7]) == true) {
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
  } else if (jQuery('body').hasClass(classList[6]) == true) {
    onEmentaItem = true;
    finalType = "onEmentaItem";
  }  

  //console.log("TYPE: "+finalType);
  APPLogic(finalType);
}


function APPLogic(qualType) {

  switch (qualType) {
    case 'onHome':
          initSliderHome();
          animateCaptionsHome();
          setTimeout(corrigirModal,300);
          makeHomeParallax();
          initEncomendar();
          
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
          fixLinkLojas();


         break;
    case 'onLoja':
          jQuery('.menu--main li:nth-child(3)').addClass("active");

          initSliderHome();
          makeLojaParallax();
          initModalLoja();
          initEncomendar();

         break;
    case 'onEmenta':
          jQuery('.menu--main li:nth-child(4)').addClass("active");
          fixLinkEmenta();

         break;
    case 'onEmentaItem':
          jQuery('.menu--main li:nth-child(4)').addClass("active");
          fixExtrasEmenta();
            
         break;
      
  }



    
    initEvents();

    initModal();

    initModalNews();

    antiDragImg();



    //grabALLLinks();

    //apanhar o URL
    confirmaURL();

}


//////////////////////////////////////////////////////////////////

function confirmaURL() {
  let finalPath = window.location.href;
  abrePorDefeitoPag(finalPath);
}

function abrePorDefeitoPag(qualModal) {
  //confirmar a path para ver se vale a pena carregar o modal
  if (qualModal.indexOf("#") !== -1) {
    let myPath = qualModal.split("#");
    let finalIDPathPag = myPath[myPath.length-1];
    //console.log("finalIDPathPag = ",finalIDPathPag);

    agoraPath = myPath[0];

    if (finalIDPathPag === "reservas") {
      //let reservasBtn = document.querySelector('.menu--main .last a');
      //setTimeout(function(){ showModalPorDefeito(reservasBtn); }, 3000);
      setTimeout(function(){ jQuery('#modal-62').modal('show'); }, 4000);
      
    }else if (finalIDPathPag === "encomendar") {
      setTimeout(function(){ jQuery('#modal-122').modal('show'); }, 4000);

    }else if (finalIDPathPag.indexOf('noticia') !== -1 ) {
      let numId = finalIDPathPag.match(/\d+/g);
      setTimeout(function(){ showModalPorDefeito(numId); }, 4000);
    }
  }
}

function showModalPorDefeito(qualBtn) {
  //retirar a not da path, para simular o click e por de novo
  window.history.pushState("","",`${agoraPath}`);
  let bt = document.querySelector('[data-notid="'+qualBtn+'"]');
  //activar o Btn
  bt.click();
}


//////////////////////////////////////////////////////////////////


function antiDragImg() {
  jQuery('img').attr('draggable','false');
}


function initModal() {
    jQuery( ".navbar-nav li.last a, .f-reserva a" ).click(function(e) {
          e.preventDefault();
           jQuery('#modal-62').modal('show');
           meteURLModal("reservas");
      });

            //close
            jQuery('#modal-62').on('hidden.bs.modal', function () {
              //console.log("Fecha Modal");
              removeURLModal();
            });

     changeProgressText();
}

function initModalLoja() {
    jQuery( ".field--name-field-reservar a" ).click(function(e) {
          e.preventDefault();
           jQuery('#modal-62').modal('show');
           meteURLModal("reservas");
      });

      //close
      jQuery('#modal-62').on('hidden.bs.modal', function () {
        //console.log("Fecha Modal");
        removeURLModal();
      });
}

var agoraPath = null;


function meteURLModal(qual) {

  agoraPath = window.location.href;
  if (agoraPath.indexOf("reservas") === -1 || agoraPath.indexOf("noticia") === -1) {
    window.history.pushState("","",`${agoraPath}#${qual}`);
  } 
}
function removeURLModal() { 
  window.history.pushState("","",`${agoraPath}`);
}



function changeProgressText() {
    var textProgress = jQuery(".webform-progress__summary").text();


    if (textProgress.length != 3 && textProgress.length < 25) {
     // var _loc1 = textProgress.substring(5, textProgress.length);
     // var _loc2 = _loc1.replace(" of ", "/");

    //console.log("textProgress = ",textProgress);

      //var _loc2 = textProgress.replace(" of ", "/");

    //console.log("_loc2 = ",_loc2);

      //jQuery(".webform-progress__summary").text(_loc2);


      //var _loc3 = _loc2.substring(0,1);
    //   if (_loc3 != "3") {
    //     jQuery(".webform-progress__summary").html(
    //       jQuery(".webform-progress__summary").html().substr(0, jQuery(".webform-progress__summary").html().length-2)
    //         + "<span style='color: #fff'>"
    //         + jQuery(".webform-progress__summary").html().substr(-2)
    //         + "</span>");
    //   }

    }
}

function initEncomendar() {

  jQuery( "#block-encomendas" ).click(function(e) {
    //e.preventDefault();
     jQuery('#modal-122').modal('show');
     meteURLModal("encomendar");
  });

  //close
  jQuery('#modal-122').on('hidden.bs.modal', function () {
    //console.log("Fecha Modal");
    removeURLModal();
  });

  jQuery('.webform-options-display-buttons-label').click(function(e) {
    //e.preventDefault();
    jQuery('.webform-options-display-buttons-label').css("border-color","#ccc");
    jQuery('.webform-options-display-buttons-label').css("box-shadow","unset");


  });

  jQuery( "select" ).change(function() {
    // Check input( $( this ).val() ) for validity here
    jQuery('.form-item-na-luzzo').removeClass("has-error");

  });


  jQuery('#form-encomendar-all-pages').submit(function( event ) {
    //console.log('Form encomendar submitted to JS :)');
    event.preventDefault();
    var FormEncomendar = document.getElementById("form-encomendar-all-pages");
    //var FormEncomendar = event.target;
   // console.log("Form.full_name.value = " + FormEncomendar.metodo_de_entrega.value);

    // metodo_de_entrega
    // na_luzzo
    // link_para_take_away
    // link_para_take_delivery

    if (FormEncomendar.na_luzzo.value.length == 0 || FormEncomendar.metodo_de_entrega.value.length == 0) {


          //console.log("Campos obrigatórios devem ser preenchidos!");
          if (FormEncomendar.na_luzzo.value.length == 0) {
            jQuery('.form-item-na-luzzo').addClass("has-error");
            FormEncomendar.na_luzzo.focus();

          }
          if (FormEncomendar.metodo_de_entrega.value.length == 0) {
            // jQuery('.form-item-na-luzzo').removeClass("has-error");
            // jQuery('.webform-options-display-buttons-label').css("border-color","#a94442");
            jQuery('.webform-options-display-buttons-label').css("box-shadow","inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 6px #ce8483");
            // FormEncomendar.metodo_de_entrega.focus();
          }


                 
          



      //console.log("Campos obrigatórios devem ser preenchidos!");
      //FormEncomendar.na_luzzo.focus();

    } else if (FormEncomendar.metodo_de_entrega.value === "take-away") {
      let currentLink = FormEncomendar.link_para_take_away.value;
      let primTel = currentLink.split("");

      let finalTelLink = 'tel:+351'+currentLink.replace(/\s+/g, '');
      FormEncomendar.reset();
      jQuery('#modal-122').modal('hide');
      removeURLModal();
      window.open(finalTelLink, '_self');
      //console.log("finalTelLink = "+finalTelLink);


    }else if (FormEncomendar.metodo_de_entrega.value === "domicilio") {
      let currentLink = FormEncomendar.link_para_take_delivery.value;
      FormEncomendar.reset();
      jQuery('#modal-122').modal('hide');
      removeURLModal();
      window.open(currentLink, '_blank');
    }

  });

  jQuery('#webform-submission-encomendar-node-9-add-form--2').submit(function( event ) {
    //console.log('Form encomendar submitted to JS :)');
    event.preventDefault();
    var FormEncomendar = document.getElementById("webform-submission-encomendar-node-9-add-form--2");
    //console.log("Form.full_name.value = " + FormEncomendar.metodo_de_entrega.value);

    // metodo_de_entrega
    // na_luzzo
    // link_para_take_away
    // link_para_take_delivery

    if (FormEncomendar.na_luzzo.value.length == 0 || FormEncomendar.metodo_de_entrega.value.length == 0) {

      console.log("FormEncomendar.na_luzzo.value.length = ",FormEncomendar.na_luzzo.value.length);

      //console.log("Campos obrigatórios devem ser preenchidos!");
      if (FormEncomendar.na_luzzo.value.length == 0) {
        // jQuery('.select-wrapper:after').css("color","#a94442");
        jQuery('.form-item-na-luzzo').addClass("has-error");
        console.log("form-item-na-luzzo == has-error");
        //FormEncomendar.na_luzzo.focus();

      }else if (FormEncomendar.metodo_de_entrega.value.length == 0) {
        jQuery('.form-item-na-luzzo').removeClass("has-error");

        // jQuery('.select-wrapper:after').css("color","#F4D680");
        
      }
    
      

    } else if (FormEncomendar.metodo_de_entrega.value === "take-away") {
      let currentLink = FormEncomendar.link_para_take_away.value;
      jQuery('#modal-122').modal('hide');
      removeURLModal();
      window.open(currentLink, '_blank');


    }else if (FormEncomendar.metodo_de_entrega.value === "domicilio") {
      let currentLink = FormEncomendar.link_para_take_delivery.value;
      jQuery('#modal-122').modal('hide');
      removeURLModal();
      window.open(currentLink, '_blank');
    }

  });


}


function initSliderHome() {
 jQuery( ".navbar-inverse" ).css("background-color","rgba(0, 0, 0, 0.4)");

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

  var $slidesFlex = jQuery('#flexslider-1 .slides, #flexslider-2 .slides');
  $slidesFlex.height($wHeight);





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
    $slidesFlex.height($wHeight);

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

         if (jQuery(this).outerHeight() > maxHeight) { 
          maxHeight = jQuery(this).outerHeight(); 
        }
      });

      jQuery( "#block-views-block-slider-noticias-block-1 .slides li" ).height((maxHeight+100));

}

function initModalNews() {

  var dataTarget = null;

      jQuery( ".btn-sabermais-noticias" ).click(function(e) {
         //
          e.preventDefault();
        
          let notID =  this.getAttribute("data-notid");
          dataTarget =  this.getAttribute("data-target");

          //console.log('dataTarget == ',dataTarget);
         
         
          // jQuery(dataTarget).modal('hide');
          jQuery(dataTarget).modal('show');
          meteURLModal("noticia-"+notID);

          //close
          jQuery(dataTarget).on('hidden.bs.modal', function () {
           // console.log("Fecha Modal news");
            removeURLModal();
          });

          //cancelar o comportamento default do button em jquery
          return false;
      });


}




///////////////////////

function fixLinkLojas() {

      jQuery( ".view-lojas .views-row" ).click(function() {
          var link = jQuery(this).find( ".views-field-field-nome a" ).attr("href");
          window.location.assign(link);
      });
}


function fixLinkEmenta() {

    //confirm se e picante e vegan
     if (jQuery('.vegan').length && jQuery('.picante').length){
        jQuery('.picante').css("bottom","29px");
    }



      jQuery( ".template-ementa" ).click(function() {
          var link = jQuery(this).find( "h2 a" ).attr("href");
          window.location.assign(link);

      });

      jQuery( ".template-ementa" ).mouseover(function() {
          var tit = jQuery(this).find( "h2 a" );
         jQuery(this).find( ".img-container" ).addClass("active");
         var seta = jQuery(this).find( "h2:before" );

         

          
          TweenMax.to(tit, .3, {color:"#F4D680", left:"20"});
          TweenMax.to(seta, .3, {opacity:"1", delay:".3"});
      });

      jQuery( ".template-ementa" ).mouseout(function() {
          var tit = jQuery(this).find( "h2 a" );
         jQuery(this).find( ".img-container" ).removeClass("active");
         var seta = jQuery(this).find( "h2:before" );


          TweenMax.to(tit, .3, {color:"#4A4A4A", left:"0px"});
          TweenMax.to(seta, .1, {opacity:"0", delay:"0"});

      });
}

function fixExtrasEmenta() {
      //confirm se e picante e vegan
     if (jQuery('.vegan').length && jQuery('.picante').length){
        if (window.innerWidth <= 767 || document.documentElement.clientWidth <= 767) {
          jQuery('.picante').css("left","29px");
        }else{
         jQuery('.picante').css("bottom","-49px");
        }
    }else{

    }

}

function initEvents() {

  var onMenuMobile = false;

  jQuery( ".navbar-toggle" ).click(function() {
    jQuery(this).toggleClass("clickMenuBur");
    jQuery('body').toggleClass("my-modal-open");
    jQuery('#block-languageswitcher').toggleClass("mobile-open");
    
  });



  switch (finalType) {
    case 'onHome':

          jQuery( ".godown" ).click(function() {
  
                 var Offset = jQuery('#navbar').height();
              Offset = pos_to_neg(Offset);
              var options = {offset: Offset};

              animateScrollTo(document.querySelector('#block-views-block-reservas-luzzo-block-1'),options);
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
    //init MediaQuerys
    var x = window.matchMedia("(max-width: 768px)");
    closeNavToPeq(x); // Call listener function at run time
    x.addListener(closeNavToPeq); // Attach listener
}


jQuery(window).on("load", function(){
      startAnimation();
      closeLoader();

    
}); 


function verificaScroll() {


      if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250 || window.innerWidth <= 768) {
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

function closeLoader() {

  //TweenMax.to("#tempo-loader", .5, {attr:{dur:50}, onComplete:startAnimaClose});
  startAnimaClose();
}

function startAnimaClose() {

  TweenMax.to(".base-3", .5, {opacity:"0", scale:".1"});
  TweenMax.to(".base-2", .8, {height:"0", delay:.5, ease:SlowMo.ease.config(0.3, 0.4, false)});
  TweenMax.to(".base-1", .8, {height:"94px", delay:.6, ease:SlowMo.ease.config(0.3, 0.4, false), onComplete:removeDisplay});
  
}

function startAnimation() {
  jQuery('body').addClass("loaded");
  
}

function removeDisplay() {
  jQuery('.loader-page').css("display",'none');
  jQuery('body').toggleClass("modal-open");

  
}


function openLoader() {
  TweenMax.to("#tempo-loader", 0, {attr:{begin:1, dur:2000}});

  TweenMax.to(".base-1", .8, {height:"100vh", ease:Power4.easeOut});
  TweenMax.to(".base-2", .8, {height:"100vh", delay:.1, ease:SlowMo.ease.config(0.3, 0.4, false), onComplete:startAnimaOpen});
  TweenMax.to(".loader-svg", .5, {opacity:"1", delay:.2, scale:"1"});
 
}

function startAnimaOpen() {

    window.location = currentLink;
  
}



function grabALLLinks() {
  //
      jQuery( "a" ).click(function(e) {
          e.preventDefault();

          currentLink = jQuery(this).attr('href');

          if (currentLink.indexOf("http://") != "-1") {

              //console.log("currentLink tem HTTP:// = "+currentLink);
              window.open(currentLink, '_blank');
             // window.location = currentLink;

          }else{
              //console.log("currentLink = "+currentLink);
              openLoader();
          }
      });
}

// MediaQuerys

function closeNavToPeq(x) {
  if (x.matches) { // If media query matches - max-width: 768px
        navbarHeader.classList.add("navbarPeq");
  } else {
        navbarHeader.classList.remove("navbarPeq");    
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









