// This is a JavaScript file

function queryactivities(){
    //console.log("query trips")
    var actquery = new Parse.Query(Parse.Object.extend("activity"));
    actquery.limit(50);
    actquery.descending("createdAt");
    actquery.find({
    success:function(results) {
    
    s="";
    
        for(var i=0; i<results.length; i++) {
		 
                var act_id=results[i].id;
                var act_act= results[i].get("Activity");
                //var act_int_id = results[i].get("Activity_ID");
                var act_city = results[i].get("City");
				//var act_time = results[i].get("Time");
				var act_desc = results[i].get("Description");
				//var act_fee = results[i].get("Fee");
                var act_img = results[i].get("IMG_ID");
                var act_fil = results[i].get("Action");
                var act_ico = eval('return_icon(results[i].get("Type"))');
                
                
            //Puts information into template
            s+='<ons-list-item modifier="chevron" class="list-item-container act_fil '+act_fil+'" onclick="populateact(\''+act_id+'\')"><ons-row>';
            s+='<ons-col width="95px"><img src="'+act_img+'" class="thumbnail"></img></ons-col>';
            s+='<ons-col><div class="name">'+act_act+'</div>';
            s+='<div class="location"><i class="fa '+act_ico+'"></i>&nbsp&nbsp<i class="fa fa-map-marker"></i>&nbsp'+act_city+'</div>';
            s+='<div class="desc">'+act_desc+'</div></ons-col><ons-col width="40px"></ons-col></ons-row></ons-list-item>';
            //console.log(tpl_img);
			}
            
            //compiles new information 
            $("#act_list").hide();
            $("#act_list").html(s);
            ons.compile(document.getElementById('act_div'));
            $("#act_list").show();
			//Hides spinner
            $(".spinner").hide();
            
		},error:function(e) {
			
 		}
	});    
        
}

function get_act(){
tripNavigator.pushPage('3_trip_4_iten_1_add.html', { animation: "none" });
queryactivities();
}

function populateact(input){
    tripNavigator.pushPage('3_trip_4_iten_3_details.html', { animation: "none" });
    queryactivity(input);
    current_act=input;
}

function filter_act(input){
    $(".act_fil").hide();
    $("."+input).show();
}

function queryactivity(input){
                // TO DO - store earlier result in array to avoid querying again...
                // this will save one query each time
                var actquery = new Parse.Query(Parse.Object.extend("activity"));
                actquery.equalTo("objectId",input);
                actquery.get(input, {
                success: function(results) {
              
                /*
                var act_city = results.get("City");
        		var act_time = results.get("Time");
				var act_desc = results.get("Description");
				var act_fee = results.get("Fee");
                var act_img = results.get("IMG_ID");
                var act_fil = results.get("Action");
                var act_ico = eval('return_icon(results[i].get("Type"))');
                */
                $('.card2').css('background-image', 'url(' + results.get("IMG_ID") + ')');
                $('.act_d_act').html(results.get("Activity"));
                $('.act_d_city').html(results.get("City"));
                $('.act_d_time').html(results.get("Time"))
                $('.act_d_desc').html(results.get("Description"))
                $('.act_d_fee').html('&#165'+results.get("Fee"))
                
                current_act_name=results.get("Activity");
                current_act_img=results.get("IMG_ID");
                
                },
                error: function(object, error) {console.log("Get Failed");} 
                });
                
                
                
}

function return_icon(input){
    switch (input) {
    case "COUNTRY":
        icon = "fa-map-marker";
        break;
    case "REGION":
    	icon = "fa-map-marker";
        break;
	case "CITY":
    	icon = "fa-map-marker";
        break;
	case "BOAT":
    	icon = "fa-ship";
        break;
	case "MUSEUM":
    	icon = "fa-university";
        break;
	case "NATIONAL PARK":
    	icon = "fa-tree";
        break;
	case "EVENT":
    	icon = "fa-beer";
        break;
	case "NATURE":
    	icon = "fa-camera";
        break;
	case "ZOO":
    	icon = "fa-tree";
        break;
	case "TRAIN":
    	icon = "fa-train";
        break;
	case "SHOPPING":
    	icon = "fa-shopping-cart";
        break;
	case "FOOD & DRINK":
    	icon = "fa-industry";
        break;
	case "SPORT":
    	icon = "fa-futbol-o";
        break;
	case "THEME PARK":
    	icon = "fa-rocket";
        break;
	case "INN":
    	icon = "fa-home";
        break;
	case "STREET":
    	icon = "fa-road";
        break;
	case "LOOKOUT":
    	icon = "fa-binoculars";
        break;
	case "FACTORY":
    	icon = "fa-industry";
        break;
	case "PARK":
    	icon = "fa-tree";
        break;
	case "AIRPORT":
    	icon = "fa-plane";
        break;
	case "MARKET":
    	icon = "fa-shopping-cart";
        break;
	case "NOODLE":
    	icon = "fa-cutlery";
        break;
	case "SEAFOOD":
    	icon = "fa-cutlery";
        break;
	case "HOTEL":
    	icon = "fa-home";
        break;
}
    return icon;
}