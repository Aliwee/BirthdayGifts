//preload image and sound sources while counting the release date as well 
function startUp(){
	var days = getBeforeDate(releaseDate);
	if(days > 0){
		//WOOHOOOO begin to load real things 
	}else{
		$("#wait").remove();
		$("#preloader").toggle();
		preload();
	}
}

//start preloading using PxLoader and soundManager
function preload(){
	var loader = new PxLoader(); 
	
	soundManager.url = 'soundManager2/'; 
	soundManager.flashVersion = 9; 
	soundManager.useHighPerformance = true; // reduces delays
	
	// flash may timeout if not installed or when flashblock is installed 
	soundManager.ontimeout(function(status) { 
    	// no flash, go with HTML5 audio 
   		soundManager.useHTML5Audio = true; 
    	soundManager.preferFlash = false; 
    	soundManager.reboot(); 
	}); 
	soundManager.onready(function() { 
    	// ok to show the button to run the sound sample 
    	window.console.log("soundManager is ready.");
	}); 
	
	//add images
	loader.add(new PxLoaderImage('img/back1.png'));
	loader.add(new PxLoaderImage('img/back2.png'));
	loader.add(new PxLoaderImage('img/giftbox.png'));
	loader.add(new PxLoaderImage('img/giftbox2.png'));
	loader.add(new PxLoaderImage('img/doc.png'));
	loader.add(new PxLoaderImage('img/doc2.png'));
	loader.add(new PxLoaderImage('img/mp3.png'));
	loader.add(new PxLoaderImage('img/mp32.png'));
	loader.add(new PxLoaderImage('img/next.png'));
	loader.add(new PxLoaderImage('img/play.png'));
	loader.add(new PxLoaderImage('img/previous.png'));
	loader.add(new PxLoaderImage('img/stop.png'));
	
	//add songs
	var soundNames = ['song1', 'song2', 'song3'];
	var i, len, url;
	// queue each sound for loading 
	for(i=0, len = soundNames.length; i < len; i++) {
		url = 'song/' + soundNames[i] + '.mp3';
		// queue the sound using the name as the SM2 id 
    	loader.addSound(soundNames[i], url);
	}

	loader.addCompletionListener(function(e) { 
   	 	$("#preloader").remove();
		$("#main").toggle();
		drawBack("page1");
	}); 
	
	loader.start();
}

/*format: getBeforeDate('2015,5,20') 
* orgin author: 120975587@qq.com
* http://www.cnblogs.com/shizhouyu/p/4493875.html
* 
* modified by Aliwee Lee 
*/
//count the number of days between today and release date
function getBeforeDate(n){
    var now = new Date();
    var aftertime = new Date(n);
    var year = now.getFullYear();
    var mon= now.getMonth()+1;
    var day= now.getDate();
    var year_after = aftertime.getFullYear();
    var mon_after = aftertime.getMonth()+1;
    var day_after = aftertime.getDate();
    var chs = 0;
    //number of days in current month
    function DayNumOfMonth(Year,Month)
    {
        return 32 - new Date(Year,Month-1,32).getDate();
    }
    if(aftertime.getTime() - now.getTime() < 0){
        var temp1 = day_after;
        var temp2 = mon_after;
        var temp3 = year_after;
        day_after = day;
        mon_after = mon;
        year_after = year;
        day = temp1;
        mon = temp2;
        year = temp3;
    }
    if(year == year_after){//not across the year
        if(mon == mon_after){//not across the year and month
            chs += day_after-day;
        }else{//across the month but not the year
            chs += DayNumOfMonth(year,mon)- day+1;
            for(var i=1;i< mon_after-mon;i++){
                chs += DayNumOfMonth(year,mon+i);
            }
            chs += day_after-1;
        }    
    }else{//across the year
        chs += DayNumOfMonth(year,mon)- day+1;
        for(var m=1;m<12-mon;m++){
            chs += DayNumOfMonth(year,mon+m);
        }
        for(var j=1;j < year_after-year;j++){
            if((year+j)%400 == 0 || (year+j)%4 == 0 && (year+j)%100 != 0){
                chs += 366;
            }else{
                chs += 365;
            }
        }
        for(var n=1;n <= mon_after;n++){
            chs += DayNumOfMonth(year_after,n);
        }
        chs += day_after-1;
    }
    if(aftertime.getTime() - now.getTime() < 0){
        return -chs;
    }
    else{
         return chs;
    }
}

//mouseleave and mouseenter
function hover(){
	$("#img1").hover(function(){
		$(this).attr("src",imgUrl3);
		$(this).css("cursor","pointer");
		$("#open").toggle();
	},function(){		
		$(this).attr("src",imgUrl4);
		$(this).css("width","320px");
		$("#open").toggle();
	});
	$("#img2").hover(function(){
		$(this).attr("src",imgUrl6);
		$(this).css("cursor","pointer");
	},function(){		
		$(this).attr("src",imgUrl5);
	});
	$("#img3").hover(function(){
		$(this).attr("src",imgUrl8);
		$(this).css("cursor","pointer");
	},function(){		
		$(this).attr("src",imgUrl7);
	});
	$(".button").hover(function(){
		//$(this).css();
		$(this).css("cursor","pointer");
	},function(){
		//$(this).css();
	});
	$("#play").hover(function(){
		$(this).css("cursor","pointer");
	},function(){});
	$("#next").hover(function(){
		$(this).css("cursor","pointer");
	},function(){});
	$("#previous").hover(function(){
		$(this).css("cursor","pointer");
	},function(){});
}

//click listener
function clickGift(){
	$("#img1").click(function(){
		window.location.href = "gift.html";
	});
	$("#img2").click(function(){
		window.location.href = "mp3.html";
	});
	$("#img3").click(function(){
		window.location.href = "doc.html";
	});
	$(".button").click(function(){
		window.history.go(-1);
	});
}

//play songs like a mp3
function play(){
	$("#play").click(function(){
		$("#song"+currentSongId).css("font-weight","bold");
		$("#song"+currentSongId).css("color","#5493c9");
		if($(this).attr("src") == imgUrlPlay) {
			if(clickTimes == 1)
				 soundManager.resume('song'+currentSongId);
			else{
				soundManager.play('song'+currentSongId,{
					loops:5
				});
				clickTimes = 1;
			}		
			$(this).attr("src",imgUrlStop);
		}
		else{
			soundManager.pause('song'+currentSongId);
			$(this).attr("src",imgUrlPlay);
		}
	});
}
//play next song
function next(){
	$("#next").click(function(){
		soundManager.stop('song'+currentSongId);
		$("#song"+currentSongId).css("font-weight","initial");
		$("#song"+currentSongId).css("color","black");
		currentSongId++;
		if(currentSongId > 3)
			currentSongId = 1;
		$("#play").attr("src",imgUrlStop);
		$("#song"+currentSongId).css("font-weight","bold");
		$("#song"+currentSongId).css("color","#5493c9");
		soundManager.play('song'+currentSongId,{
			loops:5
		});
	});
}
//paly previous song
function previous(){
	$("#previous").click(function(){
		soundManager.stop('song'+currentSongId);
		$("#song"+currentSongId).css("font-weight","initial");
		$("#song"+currentSongId).css("color","black");
		currentSongId--;
		if(currentSongId < 1)
			currentSongId = 3;
		$("#play").attr("src",imgUrlStop);
		$("#song"+currentSongId).css("font-weight","bold");
		$("#song"+currentSongId).css("color","#5493c9");
		soundManager.play('song'+currentSongId,{
			loops:5
		});
	});
}
