$('.checkbox-toggle').click(function(){
	$('.btn4').toggleClass('open');
});

function applyTopColorEffect() {
	$("body").addClass("bg-red").removeClass("bg-black");

	$(window).scroll(function() {
		const height = $(window).scrollTop();
		console.log(height);
		if (height > 500) {
			$("body").removeClass("bg-color-0").addClass("bg-color-1");
    	}
	});
}

function initNonHomePage() {
	applyTopColorEffect();
}