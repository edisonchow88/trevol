// This is a JavaScript file


function returntime(input){
    var d = new Date();
    var ago ="";
    var second = Math.ceil((d.getTime()-input)/1000);
    
    var minute = second/60;
    var hour = minute/60;
    var day = hour/24;
    var month = day/30;
    var year = day/365;
    
    if(year>=1){
        ago= Math.ceil(year)+" year";
        if(year>1){ago+="s"};
      
    }else if(month>=1){
        ago= Math.ceil(month)+" month";
        if(month>1){ago+="s"};
        
    }else if(day>=1){
        ago= Math.ceil(day)+" day";
        if(day>1){ago+="s"};
      
    }else if(hour>=1){
        ago= Math.ceil(hour)+" hour";
        if(hour>1){ago+="s"};
      
    }else if(minute>=1){
        ago= Math.ceil(minute)+" minute";
        if(minute>1){ago+="s"};
       
    }else{
        ago= Math.ceil(second)+" second";
        if(second>1){ago+="s"};
    }
     
    ago+=" ago";
    return ago;
}

var oneDay  = 24*60*60*1000;
    

function count_days(start_d,end_d){
    var start = new Date(start_d);
    var end = new Date(end_d);
    
    var oneDay  = 24*60*60*1000;
    var diffDays = Math.ceil((end.getTime() - start.getTime()) / oneDay);
    return diffDays+1;
}

function return_time_plus(start,plus){
    var start = new Date(start);
    var result=start.getTime()+plus*oneDay;
    return result;
}

function return_day_plus(start,plus){
    var start = new Date(start);
    var result=start.getTime()+plus*oneDay;
    return result;
}

function time_to(time,format){
    var theDate = new Date(time);

if(format=="date"){
    var monthid=theDate.getMonth();
    var dayid=theDate.getDate();

    switch (monthid) {
    case 0:
        mth = "Jan";
        break;
    case 1:
        mth = "Feb";
        break;
    case 2:
        mth = "Mar";
        break;
    case 3:
        mth = "Apr";
        break;
    case 4:
        mth = "May";
        break;
    case 5:
        mth = "Jun";
        break;
    case 6:
        mth = "Jul;"
        break;
    case 7:
        mth = "Aug";
        break;
    case 8:
        mth = "Sep";
        break;
    case 9:
        mth = "Oct";
        break;
    case 10:
        mth = "Nov";
        break;
    case 11:
        mth = "Dec";
        break;
}
var mthstr=dayid+" "+mth;
return mthstr;
}else if(format=="day"){
    
   // console.log("Getting Day")
    var daynameid=theDate.getDay();

    switch (daynameid) {
    case 0:
        day = "Sunday";
        break;
    case 1:
        day = "Monday";
        break;
    case 2:
        day = "Tuesday";
        break;
    case 3:
        day = "Wednesday";
        break;
    case 4:
        day = "Thursday";
        break;
    case 5:
        day = "Friday";
        break;
    case 6:
        day = "Saturday";
        break;
    }
    return day;
    }

    

}

