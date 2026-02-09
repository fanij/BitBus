/* ===================================================================
 * Dazzle - Main JS
 *
 * ------------------------------------------------------------------- */ 

(function($) {

	"use strict";

	var cfg = {		
		scrollDuration : 800 // smoothscroll duration
	},	

	$WIN = $(window);	

   // Add the User Agent to the <html>
   // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
	var doc = document.documentElement;
	doc.setAttribute('data-useragent', navigator.userAgent);

	
	/* Preloader 
	 * -------------------------------------------------- */
	var ssPreloader = function() {

		$WIN.on('load', function() {	

			// force page scroll position to top at page refresh
			$('html, body').animate({ scrollTop: 0 }, 'normal');

         // will fade out the whole preloader DIV that covers the website.
	      $("#preloader").delay(500).fadeOut('slow');
	  
	  	});
	};


	/* Mobile Menu
	 * ---------------------------------------------------- */ 
	var ssMobileMenu = function() {

  		var toggleButton = $('.header-menu-toggle'),
          nav = $('#header-nav-wrap');

		toggleButton.on('click', function(event){
			event.preventDefault();

			toggleButton.toggleClass('is-clicked');
			nav.slideToggle();
		});

		if (toggleButton.is(':visible')) nav.addClass('mobile');

		$(window).resize(function() {
			if (toggleButton.is(':visible')) nav.addClass('mobile');
			else nav.removeClass('mobile');
		});

		$('#header-nav-wrap').find('a').on("click", function() {  

			if (nav.hasClass('mobile')) {   		
				toggleButton.toggleClass('is-clicked'); 
				nav.slideToggle();   		
			}     
		});

	}; 


	/* FitVids
	 * ---------------------------------------------------- */
	var ssFitVids = function() {
		$(".fluid-video-wrapper").fitVids();
	}; 



  /* Owl Carousel
	* ------------------------------------------------------ */
	var ssOwlCarousel = function() {

		$(".owl-carousel").owlCarousel({	
	      loop: true,
  			nav: false,
			autoHeight: true,
  			items: 1
		});

	};  	


  /* Highlight the current section in the navigation bar
	* ------------------------------------------------------ */
	var ssWaypoints = function() {

		var sections = $("section"),
		navigation_links = $(".header-main-nav li a");	

		sections.waypoint( {

	       handler: function(direction) {

			   var active_section;

				active_section = $('section#' + this.element.id);

				if (direction === "up") active_section = active_section.prev();

				var active_link = $('.header-main-nav li a[href="#' + active_section.attr("id") + '"]');			

	         navigation_links.parent().removeClass("current");
				active_link.parent().addClass("current");

			}, 

			offset: '25%'

		});
	};


  /* Smooth Scrolling
	* ------------------------------------------------------ */
	var ssSmoothScroll = function() {

		$('.smoothscroll').on('click', function (e) {
			var target = this.hash,
			$target    = $(target);
	 	
		 	e.preventDefault();
		 	e.stopPropagation();	  

			$('html, body').stop().animate({
				'scrollTop': $target.offset().top
			}, cfg.scrollDuration, 'swing', function () {
				window.location.hash = target;
			});

	  	});

	};



  /* Placeholder Plugin Settings
	* ------------------------------------------------------ */
	var ssPlaceholder = function() {
		$('input, textarea, select').placeholder();  
	};



  	/* Alert Boxes
  	------------------------------------------------------- */
  	var ssAlertBoxes = function() {

  		$('.alert-box').on('click', '.close', function() {
		  $(this).parent().fadeOut(500);
		}); 

  	};	  	
	


  /* Animate On Scroll
  	* ------------------------------------------------------ */
	var ssAOS = function() {

		AOS.init( {
      	offset: 200,
      	duration: 600,
      	easing: 'ease-in-sine',
      	delay: 300,
			once: true,
			disable: 'mobile'
    	});

	};

 
  /* Back to Top
	* ------------------------------------------------------ */
	var ssBackToTop = function() {

		var pxShow  = 500,         // height on which the button will show
		fadeInTime  = 400,         // how slow/fast you want the button to show
		fadeOutTime = 400,         // how slow/fast you want the button to hide
		scrollSpeed = 300,         // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
		goTopButton = $("#go-top")

		// Show or hide the sticky footer button
		$(window).on('scroll', function() {
			if ($(window).scrollTop() >= pxShow) {
				goTopButton.fadeIn(fadeInTime);
			} else {
				goTopButton.fadeOut(fadeOutTime);
			}
		});
	};	


  /* EAdress
	* ------------------------------------------------------ */
	var decodeBase64 = function() {
		let encoded = "ZmFuaS5qYXNobWFrb3Zza2FAZ21haWwuY29t";
		let text = decodeURIComponent(atob(encoded).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        $('#eadress').html(text);
	};


  /* Carousel
	* ------------------------------------------------------ */
	const items = document.querySelectorAll('.item');
    let activeIndex = 0;

    function updateCarousel() {
        const total = items.length;
        items.forEach((item, i) => {
            item.classList.remove('far-left', 'left', 'center', 'right', 'far-right');
            item.style.opacity = "0";

            const farLeft = (activeIndex - 2 + total) % total;
            const left = (activeIndex - 1 + total) % total;
            const center = activeIndex;
            const right = (activeIndex + 1) % total;
            const farRight = (activeIndex + 2) % total;

            if (i === center) item.classList.add('center'), item.style.opacity = "1";
            else if (i === left) item.classList.add('left'), item.style.opacity = "1";
            else if (i === right) item.classList.add('right'), item.style.opacity = "1";
            else if (i === farLeft) item.classList.add('far-left'), item.style.opacity = "1";
            else if (i === farRight) item.classList.add('far-right'), item.style.opacity = "1";
        });
    }

    document.getElementById('next').onclick = () => {
        activeIndex = (activeIndex + 1) % items.length;
        updateCarousel();
    };

    document.getElementById('prev').onclick = () => {
        activeIndex = (activeIndex - 1 + items.length) % items.length;
        updateCarousel();
    };


  
  /* Initialize
	* ------------------------------------------------------ */
	(function ssInit() {

		ssPreloader();
		ssMobileMenu();
		ssFitVids();
		ssOwlCarousel();
		ssWaypoints();
		ssSmoothScroll();
		ssPlaceholder();
		ssAlertBoxes();
		ssAOS();
		ssBackToTop();
		decodeBase64();
		updateCarousel();
	})();
 

})(jQuery);