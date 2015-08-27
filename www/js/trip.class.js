// This is a JavaScript file


function update_trip_page(id){
  $(".trip-icon").removeClass("gray-icon");
  $(".trip-icon").addClass("gray-icon");
  $(".trip-menu-"+id).removeClass("gray-icon");
}


function loadtrips(){
    hidetabs();

    }
    
function testlog(){
    console.log("Test");
}



function delay_hlight(id){
    setTimeout(function()
        { 
    $(".trip-menu-"+id).removeClass("gray-icon");
        }
    , 100);
}

function trip_navi(id){
    var pages = tripNavigator.getPages();
    
    if(trip_navi_id==id){console.log("Firing blanks")}
    else{
        trip_navi_id=id;
        //console.log("Trip_navi_id= "+trip_navi_id);
        setTimeout(function()
            { 
            pages[pages.length - 2].destroy();
            //console.log("page"+(pages.length-2)+"destroyed")
            }
    , 400);
        if(id==1){
            tripNavigator.pushPage('3_trip_2_main.html',{ animation:'none' });
            delay_hlight(1);
            loadtrips();
        }
        if(id==2){
            tripNavigator.pushPage('3_trip_3_invite.html',{ animation:'none' });
            delay_hlight(2);
        }
        if(id==3){
            tripNavigator.pushPage('3_trip_4_iten.html',{ animation:'none' });
            delay_hlight(3);
            setTimeout(function(){create_days_carousel();iten_slider();load_iten();}, 250);
            
        }
        if(id==4){
            tripNavigator.pushPage('3_trip_5_pay.html',{ animation:'none' });
            delay_hlight(4);
            setTimeout(function(){iScroll()}, 200);
            
        }
        if(id==5){
            tripNavigator.pushPage('3_trip_6_set.html',{ animation:'none' });
            delay_hlight(5);
            setTimeout(function(){populate_trip_settings()}, 100);
        }


        
    }
}


function show_invite(input){
    $('.invite-filter-Going').hide();
    $('.invite-filter-Maybe').hide();
    $('.invite-filter-Invited').hide();
    
    $('.invite-filter-'+input).show();
    //console.log('invite-filter-'+input);
}

function addnewtrip(){
    tripNavigator.pushPage('3_trip_1_add.html');
    trip_image_url="";
    hidetabs();
}

function createNewTrip(){

    var TripObject = Parse.Object.extend("TripObject");
    var trip = new TripObject();
    
    if(trip_image_url==""){}else{
    var parseFile = new Parse.File("mypic.jpg", {base64:trip_image_url});
    trip.set("img",parseFile);
    }
    
    trip.set("userid",Parse.User.current().id);
    trip.set("title",$('#trip_name').val());
    trip.set("desc",$('#trip_desc').val());
    trip.set("start",$('#trip_start_date').val());
    trip.set("end",$('#trip_end_date').val());
    trip.set("country",$('#trip_country').val());
    trip.set("status","Upcoming");
    trip.save(null, {
        success: function(trip) {
            tripNavigator.pushPage('3_trip_2_main.html');
            //Populate the page
            hidetabs();
            querytrips();
            //Sets current trip and resets trip id
            trip_navi_id=1;
            current_trip=trip.id;
            get_trip_settings();
            //Creates Days       
            create_days($('#trip_start_date').val(),$('#trip_end_date').val());
            query_days();
            //deletes the created page
            
            
            var pages = tripNavigator.getPages();
            pages[pages.length - 1].destroy();
            },
        error: function(trip,error) {}
    });
                
} 

function querytrips(){
    //console.log("query trips")
    var tripquery = new Parse.Query(Parse.Object.extend("TripObject"));
    tripquery.limit(100);
    //tripquery.equalTo("userid",Parse.User.current().id);
    tripquery.descending("createdAt");
    tripquery.find({
    success:function(results) {
    	    
            
            
            var s = "";
			var invcount=0;
            var upcount=0;
            var comcount=0;
            
            for(var i=0; i<results.length; i++) {
		 
                var trip_id= results[i].id;
                var trip_title= results[i].get("title");
                var trip_desc = results[i].get("desc");
                var trip_status = results[i].get("status");
            
            //Counts Status
            if(trip_status=="Upcoming"){upcount+=1};
            if(trip_status=="Invited"){invcount+=1};
            if(trip_status=="Completed"){comcount+=1};
            
            //Returns the time ago
            var trip_date = eval('returntime('+results[i].createdAt.getTime()+')');
            
            //Catches undefined images
            if(results[i].get("img")===undefined){
                var trip_pic="img/placeholder.png";
            }else{
                var trip_pic = results[i].get("img").url();
            }
                        
            //Puts information into template
            s+='<ons-list-item modifier="chevron" class="list-item-container '+trip_status+'" onclick="populatetrip(\''+trip_id+'\')"><ons-row>';
            s+='<ons-col width="95px"><img src="'+trip_pic+'" class="thumbnail"></img></ons-col>';
            s+='<ons-col><div class="name">'+trip_title+'</div>';
            s+='<div class="location"><i class="fa fa-clock-o"></i>'+' '+trip_date+'</div>';
            s+='<div class="desc">'+trip_desc+'</div></ons-col><ons-col width="40px"></ons-col></ons-row></ons-list-item>';
            
			}
            
            //compiles new information 
            
            $("#my_trip_list").hide();
            $("#my_trip_list").html(s);

            //console.log(s);
            ons.compile(document.getElementById('trip_div'));
            
            //Updates counters
            setTimeout(function()
            { 
            $(".Invited").hide();
            $(".Completed").hide();
            $(".Upcoming").show();
            $("#my_trip_list").show();
            }
            , 25);

            changenum(invcount,upcount,comcount)
            //resets counters
            
    		invcount=0;
            upcount=0;
            comcount=0;
            
            $(".spinner").hide();
            
		},error:function(e) {
			//$.mobile.loading("hide");
 		}
	});    
        
}

function populatetrip(tripid){
            tripNavigator.pushPage('3_trip_2_main.html');
            current_trip=tripid;
            trip_navi_id=1;
            //console.log("TripID: "+tripid);
            hidetabs();
            getchats();
            query_days();
            get_trip_settings();
            
}

function showtrips(input){
            $(".Invited").hide();
            $(".Upcoming").hide();
            $(".Completed").hide();
            $("."+input).show();
}


function changenum(a,b,c){
    document.getElementById("invcount_holder").innerHTML = a;
    document.getElementById("upcount_holder").innerHTML = b;
    document.getElementById("comcount_holder").innerHTML = c;
               
}

function get_trip_settings(){
    var tripquery = new Parse.Query(Parse.Object.extend("TripObject"));
    tripquery.equalTo("objectId",current_trip);
    tripquery.get(current_trip, {
    success: function(results) {
  
    current_trip_desc=results.get('desc');
    current_trip_title=results.get('title');
    current_trip_start=results.get('start');
    current_trip_end=results.get('end');
    current_trip_country=results.get('country');
    current_trip_img=results.get('img').url();

    },
    error: function(object, error) {console.log("Get Failed");} 
    });
    
}

function populate_trip_settings(){
    $("#edit_trip_desc").html(current_trip_desc);
    $("#edit_trip_name").val(current_trip_title);
    $("#edit_trip_start_date").val(current_trip_start);
    $("#edit_trip_end_date").val(current_trip_end);
    $("#edit_trip_country").val(current_trip_country);
    $(".edit_trip_img").attr("src",current_trip_img);
}

function editTripInfo(){
    var Trip = Parse.Object.extend("TripObject");
    var trip = new Trip();
    trip.id = current_trip;
    trip.set("title",$('#edit_trip_name').val());
    trip.set("desc",$('#edit_trip_desc').val());
    trip.set("start",$('#edit_trip_start_date').val());
    trip.set("end",$('#edit_trip_end_date').val());
    trip.set("country",$('#edit_trip_country').val());
    trip.save(null, {
    success: function(point) {
        console.log("Info Updated!");// Saved successfully.
    },
    error: function(point, error) {
    }
    });
    
    /*var tripquery = new Parse.Query(Parse.Object.extend("TripObject"));
    tripquery.equalTo("objectId",current_trip);
    
    tripquery.first({
        success: function (Trip) {
            Trip.save(null, {
                success: function (contact) {
                    trip.set("title",$('#edit_trip_name').val());
                    trip.set("desc",$('#edit_trip_desc').val());
                    trip.set("start",$('#edit_trip_start_date').val());
                    trip.set("end",$('#edit_trip_end_date').val());
                    trip.set("country",$('#edit_trip_country').val());
                    trip.save();
                }
            });
        }
    });*/
}

function delete_trip(){
    var tripquery = new Parse.Query(Parse.Object.extend("TripObject"));
    tripquery.equalTo("objectId",current_trip);
    tripquery.get(current_trip, {
    success: function(results) {
  
         results.destroy({
         success: function(myObject) {
         delete_days();
         tripNavigator.popPage();
         querytrips();
         unhidetabs();
        
         console.log("Delete Success");
    
  },
  error: function(myObject, error) {
        console.log("Delete Failed");
  }
  
}); 
  
  },
  error: function(object, error) {
        console.log("Delete Failed");
  } 
  });
    
}

function create_days(start,end){
    var days = eval(count_days(start,end));
    var dayArray=[];  
    var ItenDayObject = Parse.Object.extend("ItenDayObject");
    var y=-2;
    //Add day plus a day 0 and saves multiple rows into parse at once
    for(x=0;x<days+1;x++){
    y+=1;    
    var ido = new ItenDayObject();
    var date = return_time_plus(start,y);
    ido.set("tripid",current_trip);
    ido.set("day",x);
    ido.set("date",date);
    dayArray.push(ido);
    }
    
    Parse.Object.saveAll(dayArray, {
        success: function(objs) {},error: function(error) {}
    });
    dayArray=[];  
}

function delete_days(){
    var idoquery = new Parse.Query(Parse.Object.extend("ItenDayObject"));
    idoquery.equalTo("tripid",current_trip);
    idoquery.find().then(function(results) {
    return Parse.Object.destroyAll(results);
    }).then(function() {}, function(error) {});
}

function query_days(){
    var IDO = Parse.Object.extend("ItenDayObject");
    var idoquery = new Parse.Query(IDO);
    idoquery.equalTo("tripid", current_trip);
    idoquery.ascending("day");
    idoquery.find({
      success: function(results) {
         for (var i = 0; i < results.length; i++) {
          var object = results[i];
          //alert(object.id + ' - ' + object.get('playerName'));
          days_array.push(object.get('date'));
          //console.log(days_array[i]);
        }
        
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
}

function create_days_carousel(){
    //prepare array    
    var s="";
    //console.log("Length:"+days_array.length);
    for (var i = 0; i < days_array.length; i++) {
        var date=eval('time_to(days_array[i],"date")');
        var dayname=eval('time_to(days_array[i],"day")');
        var day="Day "+i;
        s+='<a class="iten_link" href="#" onclick="current_day_selected('+i+')"><div class="iten_day" style="border-radius:5px;"><p>';
        s+=day;
        s+='</p><p class="iten_day_s">';
        s+=date;
        s+='</p><p>';
        s+=dayname;
        s+='</p></div></a>';
    }
    //console.log(s);
    $(".date-slider").html(s);
}

function current_day_selected(input){
    current_day=input;
    console.log("Current day= "+input);
}







