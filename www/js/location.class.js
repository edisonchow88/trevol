// This is a JavaScript file

function find_country(){
    $.getJSON("http://www.telize.com/geoip?callback=?",
        function(json) {
        //	document.write("Geolocation information for IP address : ", json.ip);
        //  console.log(json);
        //json.longitude,json.latitude
        //parse_country(localStorage.getItem("local_id"),json.country);
    login_country=json.country;

});
};

function update_country(){
    
    
    setTimeout(function()
        { 
    $("#select_country").val(login_country);
        }
    , 100);
}
