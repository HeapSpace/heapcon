// ****************************** //
// **** Block Text Animation **** //
// ****************************** //
var initiatedBlockTest = false,
	windowHeight = 0,
	windowWidth = 0,
	blockHeight = 0,
	blockOffset = 0,
	blockMidPoint = [0, 0, 0];

function initBlockTex() {
	windowHeight = $(window).innerHeight();
	windowWidth = $(window).innerWidth();
	blockHeight = $('.block-text-1').outerHeight();
	blockOffset = (blockHeight + windowHeight) / 2;

	blockMidPoint[1] = $('.block-text-1').offset().top + (blockHeight - windowHeight) / 2;
	blockMidPoint[2] = $('.block-text-2').offset().top + (blockHeight - windowHeight) / 2;
	blockMidPoint[3] = $('.block-text-3').offset().top + (blockHeight - windowHeight) / 2;

	var scrollPos = $(window).scrollTop();

	initiatedBlockTest = true;
}

function setBlockPosition(blockNumber, blockMove) {
	$('.block-text-' + blockNumber).find('.line-1').css('transform', 'translate(' + blockMove + 'px, 0)');
	$('.block-text-' + blockNumber).find('.line-2').css('transform', 'translate(' + -blockMove + 'px, 0)');
}

function blockTextScroll() {
	if(!initiatedBlockTest) initBlockTex();

	var scrollPos = $(window).scrollTop();

	for (var i = 1; i <= 3; i++) {
		if((scrollPos > blockMidPoint[i] - blockOffset) && (scrollPos < blockMidPoint[i] + blockOffset)){

			var currentBlockMove = (blockMidPoint[i] - scrollPos) * 0.3;

			setBlockPosition(i, currentBlockMove);

			return;
		}
	}
}



// ****************************** //
// ** Scrolling Text Animation ** //
// ****************************** //
var text = 0,
	textLine = [0, 0, 0],
	linePart = [0, 0, 0],
	timer = 0;

function checkPositions() {
	// clearTimeout(timer);

	// $('.block-text-1').offset().top + (blockHeight - windowHeight) / 2;

	// console.log(linePart[1].offset().left);
	// for (var i = 1; i <= 3; i++) {
		
	// }

	// timer = setTimeout(checkPositions, 200);
}

function scrollTextStart() {
	timer = setTimeout(checkPositions, 200);

	text = $('.small-scrolling-text');

	textLine[1] = text.find('.line-1');
	textLine[2] = text.find('.line-2');
	textLine[3] = text.find('.line-3');

	linePart[1] = textLine[1].find('.part-2');
	linePart[2] = textLine[2].find('.part-2');
	linePart[3] = textLine[3].find('.part-2');
}