$(document).ready(function(){
	$(".tabbed").each(function(){
		mainWidth = $(this).parent().width() - 20;
		theWidth = 100 / $("> ul > li", this).length;
	
		$(" > ul > li", this).css({
			width:theWidth + "%"
		});
		
		$(this).css({
			position:"relative",
			overflow:"visible",
			zIndex:1
		});
		$("> ul",this).css({
			margin:"0 20px 0 0",
			padding:0
		});
	
		$(" > ul > li",this).css({
			float:"left",
			margin:0,
			padding:0
		});
		$(" > ul > li",this).css({
			cursor:"pointer"
		});
		$(" > ul > li > ul",this).hide()
		$(" > ul > li > ul",this).css({
			position:"absolute",
			width:mainWidth,
			left:0,
			top:"1.3em",
			zIndex:10,
			margin:0,
			padding:0,
			cssFloat:"none"
		});
		$(" > ul > li > ul >li",this).css({
			margin:0,
			padding:0,
			listStyle:"none"
		});
		$(" > ul > li > ul:first",this).show()
		theHeight = $(" ul:first >li",this).height() + $(".tabbed > ul li ul:first").height() + 12 ;
		$(this).css({
			height: theHeight + "px"
		});
		$(" > ul > li > span",this).click(function(){
			$(this).parent("li").parent("ul").children("li").children("ul").hide()
			$(this).parent("li").children("ul").show()
			theHeight = $(this).parent("li").height() + $(this).parent("li").children("ul").height() + 12;
			$(this).parent("li").parent("ul").parent("div").animate({
				height: theHeight + "px"
			},100);
		});
	});
		
	

});