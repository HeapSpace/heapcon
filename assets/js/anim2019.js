var initiatedBlockTest = false,
	windowHeight = 0,
	windowWidth = 0,
	blockHeight = 0,
	blockOffset = 0,
	blockMidPoint = [0, 0, 0];

function initBlockTex() {
	initiatedBlockTest = true;
	windowHeight = $(window).innerHeight();
	windowWidth = $(window).innerWidth();
	blockHeight = $('.block-text-1').outerHeight();
	blockOffset = (blockHeight + windowHeight) / 2;

	blockMidPoint[1] = $('.block-text-1').offset().top + (blockHeight - windowHeight) / 2;
	blockMidPoint[2] = $('.block-text-2').offset().top + (blockHeight - windowHeight) / 2;
	blockMidPoint[3] = $('.block-text-3').offset().top + (blockHeight - windowHeight) / 2;
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

	// $(window).scrollTop();

	// console.log($(window).scrollTop() + windowHeight);
}