// This is a JavaScript file

$(document).ready(function() {
    // are we running in native app or in a browser?
    window.isphone = false;
    if(document.URL.indexOf("http://") === -1 
        && document.URL.indexOf("https://") === -1) {
        window.isphone = true;
    }

    if( window.isphone ) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }
    
    console.log(navigator.userAgent.match(/(iPad);.*CPU.*OS 7_\d/i));
});

function onDeviceReady() {

if (navigator.userAgent.match(/(iPad.*|iPhone.*|iPod.*);.*CPU.*OS 7_\d/i)) {
        document.body.style.marginTop = '-10px';
        $(".trip_tab_containter").css("margin-top","30px");
        document.getElementById('ios7-statusbar-fix').style.display = 'block';
       //alert("iOS detected");  
       
}

//init_autocomplete();

}