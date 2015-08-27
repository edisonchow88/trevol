// This is a JavaScript file

function querytemplate(){
    //console.log("query trips")
    var tplquery = new Parse.Query(Parse.Object.extend("template"));
    tplquery.limit(3);
    tplquery.descending("createdAt");
    tplquery.find({
    success:function(results) {
    
    s="";
	
        for(var i=0; i<results.length; i++) {
		 
                var tpl_id= results[i].id;
                var tpl_author= results[i].get("Author");
                var tpl_int_id = results[i].get("ID");
                var tpl_month = results[i].get("Month");
				var tpl_name = results[i].get("Name");
				var tpl_tag = results[i].get("Tag");
				var tpl_img = results[i].get("IMG_ID");
                        
            //Puts information into template
            s+='<ons-list-item modifier="chevron" class="list-item-container" onclick="populatetemp(\''+tpl_int_id+'\')"><ons-row>';
            s+='<ons-col width="95px"><img src="'+tpl_img+'" class="thumbnail"></img></ons-col>';
            s+='<ons-col><div class="name">'+tpl_name+'</div>';
            s+='<div class="location"><i class="fa fa-clock-o"></i>'+' '+tpl_month+'</div>';
            s+='<div class="desc">'+tpl_tag+'</div></ons-col><ons-col width="40px"></ons-col></ons-row></ons-list-item>';
            //console.log(tpl_img);
			}
            
            //compiles new information 
            $("#tpl_list").hide();
            $("#tpl_list").html(s);
            ons.compile(document.getElementById('tpl_div'));
            $("#tpl_list").show();
			//Hides spinner
            $(".spinner").hide();
            
		},error:function(e) {
			
 		}
	});    
        
}

function get_template(){
tripNavigator.pushPage('3_trip_4_iten_0_tpl.html');
querytemplate();
}

function populatetemp(input){
    
}