// ****************************** //
// **** Block Text Animation **** //
// ****************************** //
var initiatedBlockTest = false,
	windowHeight = 0,
	windowWidth = 0,
	footerPos = 0,
	footerOpen = false,
	blockHeight = 0,
	blockOffset = 0,
	blockMidPoint = [0, 0, 0];


function initBlockTex() {
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
// ******** init function ******* //
// ****************************** //
function init2019() {
	windowHeight = $(window).innerHeight();
	windowWidth = $(window).innerWidth();

	footerPos = $('.footer-bottom').offset().top;
	
	checkIfEndOfPage();
}



// ****************************** //
// ****** Show People Anim ****** //
// ****************************** //
function showPeople() {
	var scrollPos = $(window).scrollTop();

	$('.list li:not(.show)').each(function(index, el) {

		if($(el).offset().top > scrollPos + windowHeight * 0.05 && $(el).offset().top < scrollPos + windowHeight * 0.7){
			$(el).addClass('show');

		}
	});
}



// ****************************** //
// ********* Show Footer ******** //
// ****************************** //
function checkIfEndOfPage() {
	if(!footerOpen){
		var scrollPos = $(window).scrollTop();

		if(scrollPos + windowHeight * 0.85 > footerPos){
			$('.footer-bottom').addClass('show');
			footerOpen = true;
		}
	}
}



// ****************************** //
// **** Schedule: switch tabs *** //
// ****************************** //
function handleSchedule() {
	$('.schedule .day.day-27').addClass('off');
	footerPos = $('.footer-bottom').offset().top;
	
	$('.schedule .tabs li').click(function(event) {
		if(!$(this).hasClass('current')){
			$('.schedule .tabs li').removeClass('current')
			$(this).addClass('current');

			$('.schedule .day').addClass('off');
			$('.schedule .day.' + $(this).attr('id')).removeClass('off');

			footerPos = $('.footer-bottom').offset().top;
		}
	});
}