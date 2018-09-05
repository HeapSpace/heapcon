// inputs for all methods:
// y - top offset (scroll-dependent)
// output:
// x, y: offsets, a: angle


jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
};


// no movement
function fun_none(y) {
	return {x: 0, y: 0, a: 0};
}

// circling and rotating
function fun_circleAndRotate(y) {
	x = (30 * Math.sin(y/80));
	y = 100 * Math.cos(y/80);
	return {x: x/2, y: y/2, a: y/4};
}

// just rotate
function fun_rotate(y) {
	return {x: 0, y: 0, a: y/4};
}

function fun_down(y) {
	return {x: 0, y: y/6, a: 0};
}

const funs = [
	fun_none,				// 0
	fun_circleAndRotate,	// 1
	fun_rotate,				// 2
	fun_down,				// 3
];

// main function
function makefun() {
	const $w = $(window);
	const m = $w.width()/2;
	const st = $w.scrollTop();

	$(".decor img").each(function(index) {
		const $e = $(this);
		const fn = $e.data("fn");
		if (fn == undefined) {
			return;
		}

		let top = $e.data("top");
		if (top == undefined) {
			top = $e.position().top;
			$e.data("top", top);
			$e.data("st", st);
		}
		let left = $e.data("left");
		if (left == undefined) {
			left = $e.position().left;
			$e.data("left", left);
		}

		xy = funs[fn](st - $e.data("st"));

		//if (inViewport($e)) {
			$e.css({'left': left + xy.x});
			$e.css({'top': top + xy.y});
			$e.rotate(xy.a);
		//}
	});
}