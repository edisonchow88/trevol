// This is a JavaScript file

/*
.ons-tab-bar__content, .tab-bar__content{
    height:100%;
}
*/

function compiletabbar(){
var content = document.getElementById("kks_tabbar");

var tbar='';
tbar+='<ons-tabbar var="tabbar">';
tbar+='<ons-tabbar-item icon="search"   label="Search"    page="navigator.html" active="true"></ons-tabbar-item>';
tbar+='<ons-tabbar-item icon="star"     label="Favorites" page="2_fav.html"   onclick=""></ons-tabbar-item>';
tbar+='<ons-tabbar-item icon="calendar" label="My Trips"  page="3_trip.html"  onclick="querytrips()"></ons-tabbar-item>';
tbar+='<ons-tabbar-item icon="gear"     label="Settings"  page="4_set.html"   onclick="update_country()"></ons-tabbar-item>';
tbar+='</ons-tabbar>';

content.innerHTML=tbar;
ons.compile(content);
}
/*
function fullheightscreen(){

}

function undofullheightscreen(){

}
*/
function unhidetabs(){
  $(".tab-bar").fadeIn();
  $('.ons-tab-bar__content').css("height","");
$('.tab-bar__content').css("height","");
}

function hidetabs(){
  $(".tab-bar").fadeOut();
  $('.ons-tab-bar__content').css("height","100%");
$('.tab-bar__content').css("height","100%");
    setTimeout(function()
            { 
                    $(".chat-bar").fadeIn();     
            }
    , 500);
    setTimeout(function()
            { 
                    $(".trip-menu-1").removeClass("gray-icon");     
            }
    , 200);
    
}


function iScroll(){
    $("#itemsList").sortable({ 
  handle : "label", 
  axis : 'y', 
  disabled : false 
});
    myApp.enableSort();
    //console.log("Enable sort");
}
