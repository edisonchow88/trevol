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