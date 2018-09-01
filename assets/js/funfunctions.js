// inputs for all methods:
// w - width of the object
// x - left offset (constant)
// y - top offset (scroll-dependent)

// simple left to right movement
function fun1(w, x, y) {
	x = x + (30 * Math.sin(y/80));
	y = 100 * Math.cos(y/80);
	return {x: x, y: y};
}