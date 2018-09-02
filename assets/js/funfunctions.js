// inputs for all methods:
// y - top offset (scroll-dependent)

jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
};

// simple left to right movement
function fun1(y) {
	x = (30 * Math.sin(y/80));
	y = 100 * Math.cos(y/80);
	return {x: x, y: y, a: y/2};
}




function makefun() {
	const $w = $(window);
	const m = $w.width()/2;
	const st = $w.scrollTop();
	$(".decoration").each(function(index) {
		const $e = $(this);
		const mid = m - $e.width() / 2;
		let top = $e.data("top")
		if (top == undefined) {
			top = $e.position().top;
			$e.data("top", top);
		}
		const left = mid - $e.data("left") * m / 100;

		xy = fun1(top - st);

		if (inViewport($e)) {
			$e.css({'left': left + xy.x});
			$e.css({'top': top + xy.y});
			$e.rotate(xy.a);
		}
	});
}