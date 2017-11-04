//Initialize the background of different pages
function drawBack(page){
	winwidth = $(window).width();
	
	if(page == "page1"){
		$("#"+page).css("background-image",imgUrl1);
		$("#"+page).css("background-size",winwidth+"px");
	}
	else if(page == "page2"){
//		$("#"+page).css("background-image",imgUrl2);
//		$("#"+page).css("background-size",winwidth+"px");
	}
	else if(page == "page3"){
		
	}
	else{
		//do nothing
	}
}