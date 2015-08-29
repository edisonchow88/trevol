// This is a JavaScript file

function getchats(){
    
}

var myApp = myApp || {};

    		myApp.enableSort =  myApp.enableSort || function enableSort() {
				$("#itemsList").sortable({
					handle : "label",
					axis : 'y',
					disabled : false
				});
			}
			
			// jQuery's onload function
			$(function() {
				myApp.enableSort();
			});
            
            /*
$("#chat-form").on("submit", function(e){
    console.log("chatted!");
var input = $("#chat-input").val();
s="";
s='<div class="chat-bubble-right">'+input+'</br><span class="chat-time">11:11 &#10003&#10003</span></div>';
$(".chat-content").append(s);
    });*/
    
    $(document).keypress(function(e) {
    if(e.which == 13) {
        var input = $("#chat-input").val();
s="";
s='<div class="chat-bubble-right">'+input+'</br><span class="chat-time">11:11 &#10003&#10003</span></div>';
$(".chat-content").append(s);
$("#chat-input").val("");
    }
});