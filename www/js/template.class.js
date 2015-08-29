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
                var tpl_int_id = results[i].get("Template_ID");
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
            console.log(tpl_int_id);
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

var delayer=0;



function populatetemp(input){
    console.log(input);
    //prevents users from  hitting too many times
    if(delayer==0){
    delayer=1;
    //console.log("calling populate template")
    var tplarray=[];
    var tplarrayd=[];
    var tplarrayo=[];
    var tplquery = new Parse.Query(Parse.Object.extend("template_content"));
    tplquery.equalTo("Template_ID",input);
    tplquery.limit(100);
    tplquery.ascending("Day,Order");
    tplquery.find({
    success:function(results) {
          for(var i=0; i<results.length; i++) {
                tplarray.push(results[i].get("Activity_ID"));
                tplarrayd.push(results[i].get("Day"));
                tplarrayo.push(results[i].get("Order"));
                console.log(results[i].get("Day")+"."+results[i].get("Order")+" "+tplarray[i])
          }
        
        //console.log([tplarray]);      
       
       var s="";
       var  intplquery = new Parse.Query(Parse.Object.extend("activity"));
            intplquery.limit(500);
            intplquery.containedIn("ID",tplarray);
            intplquery.find({
                
            success:function(results) {
                 //console.log("Find success");
                 console.log(results.length);
            var dayholder=1;
            dayposition[0]=0;
            dayposition[1]=1;
            total_fee=0;
            s+='<li class="day_list" style="padding:8px 0px 8px 10px;;height:10px;background-color:orange;vertical-align: center;">Day'+dayholder+'</li>';
            for(var i=0; i<results.length; i++) {
                var act_name=results[i].get("Activity");
                var act_img=results[i].get("IMG_ID");
                var act_city=results[i].get("City");
                var act_fee=results[i].get("Fee");
                var act_cur=results[i].get("Currency");
                console.log(act_fee);

                s+='<li style="padding-top:6px">';
                s+='<a class="list_a" href="#" onclick="populateact(\''+results[i].id+'\')"><div><label>';
                s+='<img class="list_img" src="'+act_img+'" alt=""></img>';
                s+='<span class="list_span">'+act_name+'</span>';
                s+='<div class="w_box">'+act_cur+'&nbsp'+act_fee+'</div></label></div></a></li>';
                
                if(tplarrayd[i+1]){
                if(tplarrayd[i]<tplarrayd[i+1]){
                        dayholder+=1;
                        s+='<li class="day_list" style="padding:8px 0px 8px 10px;;height:10px;background-color:orange;vertical-align: center;">Day'+dayholder+'</li>';
                        dayposition[dayholder]=i+dayholder;
                        console.log("Dayholder: "+dayholder+" Dayposition:"+dayposition[dayholder]);
                }}
                current_iten_a[i]=[];
                current_iten_a[i+1]=[];
                //Activities
                console.log(results[i].id);
                current_iten_a[i].push(results[i].id);
                current_iten_a[i].push(act_name);
                current_iten_a[i].push(act_img);
                current_iten_a[i].push(act_city) ;
                current_iten_a[i].push(act_fee);//#4
                current_iten_a[i].push(dayholder);
                current_iten_a[i].push(act_cur);
                //console.log(i);
                //console.log(current_iten_a[i][0]);
                total_fee+=act_fee;
          }
          update_total_fee(act_cur,total_fee);
          $("#itemsList").html(s);
          tripNavigator.popPage();
          iScroll();
          
         //request_flight_go();
         //request_flight_return();
          
    	},error:function(e) {console.log("Get activity failed")}
	});   
          
		},error:function(e) {console.log("Get template components failed")}
	});    
    }else{}
    setTimeout(function(){delayer=0}, 1000);
}