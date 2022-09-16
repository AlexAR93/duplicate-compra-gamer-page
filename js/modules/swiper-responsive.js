var swiper = new Swiper('.swiper-container', {
	navigation: {
	  nextEl: '.swiper-button-next',
	  prevEl: '.swiper-button-prev'
	},
	slidesPerView: 1,
	spaceBetween: 10,
	// init: false,
	pagination: {
	  el: '.swiper-pagination',
	  clickable: true,
	},

  
	breakpoints: {
	  0: {
		slidesPerView: 1,
		spaceBetween: 20,
	  },
	  480: {
		slidesPerView: 2,
		spaceBetween: 40,
	  },
	  660: {
		slidesPerView: 3,
		spaceBetween: 40,
	  },
	  1200: {
		slidesPerView: 4,
		spaceBetween: 40,
	  },
	} 
    });