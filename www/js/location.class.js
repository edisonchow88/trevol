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


/////GPS System

function get_gps(){
navigator.geolocation.getCurrentPosition(onSuccess, onError);
console.log("Get GPS");
};


var onSuccess = function(position) {
/* 
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
*/
console.log("GPS Success");
var mylon = position.coords.longitude;
var mylat = position.coords.latitude;
console.log(mylon+","+mylat);
map_search(mylon,mylat);

};


function onError(error) {
    //alert('code: '    + error.code    + '\n' +
         // 'message: ' + error.message + '\n');
console.log("GPS Error");
};

function map_search(lon,lat) {
    console.log("Map Search");
    var s = document.createElement('script');       
    s.src = 'http://nominatim.openstreetmap.org/reverse?json_callback=cb&format=json&lat='+lat+'&lon='+lon+'&zoom=27&addressdetails=1';
    document.getElementsByTagName('head')[0].appendChild(s);
    console.log(s);
};

window.cb = function cb(json) {

if(json.address.city){
    var city = json.address.city;}
    else
    {var city = json.address.state}
    console.log(city);
    //////////GEt City from here!!/////////////
    current_city=city;
    $("#select_city").html(city);
    get_home_airport(city);
}

