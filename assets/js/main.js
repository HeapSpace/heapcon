
////---- UTILITY

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// check if element is in the viewport
function inViewport($ele) {
	var lBound = $(window).scrollTop(),
		uBound = lBound + $(window).height(),
		top = $ele.offset().top,
		bottom = top + $ele.outerHeight(true);

	return (top > lBound && top < uBound) ||
		(bottom > lBound && bottom < uBound) ||
		(lBound >= top && lBound <= bottom) ||
		(uBound >= top && uBound <= bottom);
}

////---- UI

function canvasOrientation(canvas) {
	if (window.matchMedia("(max-width: 600px)").matches) {
		canvas.style.transform = 'rotate(90deg)';
		canvas.style.margin = '100px auto';
	} else {
		canvas.style.transform = 'rotate(0deg)';
		canvas.style.width  = '100%';
		canvas.style.height = 'auto';

	}
}

function colorMyBody(color) {
	$("body").css("backgroundColor", color);
	$("header").css("backgroundColor", color);
}

////---- COLORS

const colors = ["#384af4", "#fd4000"];
var colorNdx = 0;
function nextColor() {
	colorNdx += 1;
	if (colorNdx >= colors.length) {
		colorNdx = 0;
	}
	return colors[colorNdx];
}


////---- INIT

// sets the background color as soon as possible to avoid flicker
async function applyRandomBackgroundColor() {
    var stylesheet = document.styleSheets[1];
    let color = nextColor();
    while (stylesheet.cssRules[0].style === undefined) {
    	await sleep(1);
    }
    stylesheet.cssRules[0].style.backgroundColor = color;
	while (stylesheet.cssRules[1].style === undefined) {
    	await sleep(1);
    }
	stylesheet.cssRules[1].style.backgroundColor = color;
}


let scrollDirection = 1;
let colorThreshold = 500;
let footerColorThreshold = 10000;
let nonHome = false;
$(window).on("load", function() {
	footerColorThreshold = $(document).height() - 1000;
});

function jQueryInitNonHomePage() {
	nonHome = true;
}

let scrollDirectionA = 1;
let headerHidden = false;
let scrollUp = false;
function jQueryInitAllPages() {
	$(".checkbox-toggle").each(function () {
		if(this.checked) {
			$(this).click();
		}
	});
	$.fn.scrollEnd = function(callback, timeout) {
		$(this).scroll(function(){
		  var $this = $(this);
		  if ($this.data('scrollTimeout')) {
			clearTimeout($this.data('scrollTimeout'));
		  }
		  $this.data('scrollTimeout', setTimeout(callback,timeout));
		});
	};

	// START colored header and footer
	if ($(window).width <= 600) {
		// detect small screens
		colorThreshold = 200;
		footerColorThreshold = $(document).height() - 700;
	}
	if($(".bg-beige").length){
		$("footer").css('background', '#fd4000');
	} else {
		if(nonHome){
			if ($(window).scrollTop() > colorThreshold && $(window).scrollTop() < footerColorThreshold) {
				colorMyBody("#231f20");
				scrollDirection = 2;
			}
		} else {
			if ($(window).scrollTop() < footerColorThreshold) {
				colorMyBody("#231f20");
				scrollDirection = 2;
			}
		}

		$(window).scroll(function() {
			const height = $(window).scrollTop();

			if (scrollDirection === 1) {
				if (nonHome && height > colorThreshold) {
					colorMyBody("#231f20");
					scrollDirection = 2;
				}
			}
			else {
				if (scrollDirection === 2) {
					if (nonHome && height < colorThreshold - 100) {
						colorMyBody(nextColor());
						scrollDirection = 1;
					}
					if (height > footerColorThreshold) {
						colorMyBody(nextColor());
						scrollDirection = 3;
					}
				}
				else {
					if (height < footerColorThreshold) {
						colorMyBody("#231f20");
						scrollDirection = 2;
					}
				}
			}
		});
	}
	// END colored header and footer

	// decorations
	$(document).on("scroll", function() {
		makefun();
	});
	makefun();

	// menu
	$('.checkbox-toggle').click(function(){
		$('.btn4').toggleClass('open');
	});

	// resize and orientate the flag
	const canvas = document.getElementById("canvas");
	if (canvas != undefined) {
		canvasOrientation(canvas);
		$(window).resize(function() {
			canvas.style.width  = '100%';
			canvas.style.height = 'auto';
			// const ctx = canvas.getContext("webgl");
			canvasOrientation(canvas);
		});
	}

	// moving tech letters in place
	if($(".tech").length && !$(".inplace").length){
		if ($(window).scrollTop() > colorThreshold - 100) {
			$(".tech").addClass('inplace');
		}
	}
	// moving community letters in place
	if($(".community").length && !$(".inplace").length){
		if ($(window).scrollTop() > colorThreshold) {
			$(".community").addClass('inplace');
		}
	}

	// header show/hide
	let lastScrollPosition = $(window).scrollTop();
	$(window).scroll(function() {
		const height = $(window).scrollTop();

		// moving tech letters in place
		if($(".tech").length && !$(".inplace").length){
			if ($(window).scrollTop() > colorThreshold - 100) {
				$(".tech").addClass('inplace');
			}
		}
		// moving community letters in place
		if($(".community").length && !$(".inplace").length){
			if ($(window).scrollTop() > colorThreshold) {
				$(".community").addClass('inplace');
			}
		}

		if(height < lastScrollPosition){
			if(headerHidden){
				$("header").fadeIn("slow");
			}
			headerHidden = false;
			scrollDirectionA = 1;
		}
		else {
			if (scrollDirectionA === 1) {
				if (height > colorThreshold + 100) {
					$("header").fadeOut("slow");
					headerHidden = true;
					scrollDirectionA = 2;
				}
			}
			else {
				if (height < colorThreshold - 100) {
					$("header").fadeIn("slow");
					headerHidden = false;
					scrollDirectionA = 1;
				}
			}
		}

		lastScrollPosition = height;
	});
}