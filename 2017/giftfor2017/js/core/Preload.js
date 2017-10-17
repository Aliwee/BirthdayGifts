//preload image and sound sources while counting the release date as well 
window.onload = function(){
	var days = getBeforeDate(releaseDate);
	if(days > 0){
		//do nothing
	}else{
		$("#wait").remove();
		$("#preloader").toggle();
		preload();
	}
}

//start preloading using PxLoader
function preload(){
	var loader = new PxLoader(); 
	loader.add(new PxLoaderImage('img/back1.png'));

	loader.addCompletionListener(function(e) { 
   	 	$("#preloader").remove();
		$("#main").toggle();
		drawBack();
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
    //获取当月的天数
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