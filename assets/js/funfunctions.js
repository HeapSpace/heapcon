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


//
function fun1(y) {
	x = (30 * Math.sin(y/80));
	y = 100 * Math.cos(y/80);
	return {x: x/2, y: y/2, a: y/4};
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
			let up = $e.data("up")
			if (up != undefined) {
				top -= up;
			}
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