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
	blockHeight = $('.block-text').outerHeight();
	blockOffset = (blockHeight + windowHeight) / 2;

	$('.block-text').each(function(index, el) {
		blockMidPoint[index] = $(el).offset().top + (blockHeight - windowHeight) / 2;
	});

	var scrollPos = $(window).scrollTop();

	initiatedBlockTest = true;
}

function setBlockPosition(block, blockMove) {
	$(block).find('.line-1').css('transform', 'translate(' + blockMove + 'px, 0)');
	$(block).find('.line-2').css('transform', 'translate(' + -blockMove + 'px, 0)');
}

function blockTextScroll() {
	if(!initiatedBlockTest) initBlockTex();

	var scrollPos = $(window).scrollTop();

	$('.block-text').each(function(index, el) {
		if((scrollPos > blockMidPoint[index] - blockOffset) && (scrollPos < blockMidPoint[index] + blockOffset)){

			var currentBlockMove = (blockMidPoint[index] - scrollPos) * 0.3;

			setBlockPosition(el, currentBlockMove);

			return;
		}
	});
}



// ****************************** //
// ****** Show People Anim ****** //
// ****************************** //
function initPeople() {
	windowHeight = $(window).innerHeight();

	// $('.list li:not(.open)').each(function(index, el) {
	// 	if($(el).offset().top > ) 
	// });
}

function showPeople() {
	var scrollPos = $(window).scrollTop();

	$('.list li:not(.show)').each(function(index, el) {
		if($(el).offset().top > scrollPos + windowHeight * 0.2 && $(el).offset().top < scrollPos + windowHeight * 0.7){
			$(el).addClass('show');
		}
	});
}