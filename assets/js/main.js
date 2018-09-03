
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
function jQueryInitNonHomePage() {
	if ($(window).scrollTop() > 500) {
		colorMyBody("#231f20");
		scrollDirection = 2;
	}

	$(window).scroll(function() {
		const height = $(window).scrollTop();

		if (scrollDirection === 1) {
			if (height > 500) {
				colorMyBody("#231f20");
				scrollDirection = 2;
	    	}
	    }
	    else {
			if (height < 400) {
				colorMyBody(nextColor());
				scrollDirection = 1;
	    	}
	    }
	});
}

let scrollDirectionA = 1;
function jQueryInitAllPages() {
	$.fn.scrollEnd = function(callback, timeout) {
		$(this).scroll(function(){
		  var $this = $(this);
		  if ($this.data('scrollTimeout')) {
			clearTimeout($this.data('scrollTimeout'));
		  }
		  $this.data('scrollTimeout', setTimeout(callback,timeout));
		});
	};

	// decorations
	$(document).on("scroll", function() {
		makefun();
	});
	makefun();
	$(window).resize(function() {
		makefun();
	});

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

	// color effect
	$(window).scroll(function() {
		const height = $(window).scrollTop();
		if (scrollDirectionA === 1) {
			if (height > 600) {
				$("header").fadeOut("slow");
				scrollDirectionA = 2;
	    	}
	    }
	    else {
			if (height < 400) {
				$("header").fadeIn("slow");
				scrollDirectionA = 1;
	    	}
	    }
	});
}