// This is a JavaScript file

var FlightRequest = {
      "request": {
        "slice": [
          {
            "origin": "DCA",
            "destination": "LAX",
            "date": "2015-09-11"
          }
        ],
        "passengers": {
          "adultCount": 1,
          "infantInLapCount": 0,
          "infantInSeatCount": 0,
          "childCount": 0,
          "seniorCount": 0
        },
        "solutions": 20,
        "refundable": false
      }
    };
    
    function request_flight(){
        console.log("Request Flight Start");
        $.ajax({
     type: "POST",
     //Set up your request URL and API Key.
     url: "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyDMDxMahDgLdeh91zbheyURY-u6v9tz0FY", 
     contentType: 'application/json', // Set Content-type: application/json
     dataType: 'json',
     // The query we want from Google QPX, This will be the variable we created in the beginning
     data: JSON.stringify(FlightRequest),
     success: function (data) {
      //Once we get the result you can either send it to console or use it anywhere you like.
      console.log(JSON.stringify(data));
    },
      error: function(e){
       //Error Handling for our request
       alert("Access to Google QPX Failed."+e);
     }
    });
    }
    
    function find_weather(){
    $.getJSON("http://api.openweathermap.org/data/2.5/forecast/daily?q=sapporo&mode=json&units=metric&cnt=16&&APPID=ef1f3cdef77bc455127259e2e8845950",
        function(json) {
        //rint(json);
    	console.log(JSON.stringify(json));
});
};

