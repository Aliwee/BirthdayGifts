//Initialize the background of different pages
function drawBack(page){
	winwidth = $(window).width();
	
	if(page == "page1"){
		$("#"+page).css("background-image",imgUrl1);
		$("#"+page).css("background-size",winwidth+"px");	
	}
	else if(page == "page4"){
		$("#"+page).css("background-image",imgUrl2);
		$("#"+page).css("background-size",winwidth+"px"+ " 630px");
	}
	else{
		//do nothing
	}
}