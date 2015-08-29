// This is a JavaScript file

function get_home_airport(input){
    var query = new Parse.Query(Parse.Object.extend("Airport"));
     query.equalTo("City", input);
     query.limit(1); 
     query.find({
   success: function(airport) {
        near_origin_aircode=airport[0].get("Code");
        near_origin_airport=airport[0].get("Airport");
        console.log(near_origin_aircode);
         },  error: function(object, error) {
             console.log("Airport Failed");
         }
});}

function get_dest_airport(input){
    var query = new Parse.Query(Parse.Object.extend("Airport"));
     query.equalTo("City", input);
     query.limit(1); 
     query.find({
  success: function(airport) {
        near_dest_airport=airport[0].get("Airport");
        near_dest_aircode=airport[0].get("Code");
        console.log(near_dest_aircode);
        
        },  error: function(object, error) {
            console.log("Airport Failed");
        }
});}

var FlightRequestTo = {
      "request": {
        "slice": [
          {
            "origin": "KUL",
            "destination": "CTS",
            "date": "2015-08-31"
          }
        ],
        "passengers": {
          "adultCount": 1,
          "infantInLapCount": 0,
          "infantInSeatCount": 0,
          "childCount": 0,
          "seniorCount": 0
        },
        "solutions": 1,
        "refundable": false
      }
    };
    
    var FlightRequestBack = {
      "request": {
        "slice": [
          {
            "origin": "CTS",
            "destination": "KUL",
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
        "solutions": 1,
        "refundable": false
      }
    };
    
    //JSON String
   
    //var FlightRequest='{request:{slice:[{origin:"'+flight_origin+'",destination:"'++'",date:"2015-09-11"}],passengers:{adultCount:1,infantInLapCount:0,infantInSeatCount:0,childCount:0,seniorCount:0},solutions:1,refundable:!1}};'
    
    
    function request_flight_go(){
        console.log("Request Flight Start"+near_origin_aircode);
        //Set Variables
        flight_origin=near_origin_aircode;
        flight_dest=near_dest_aircode;
        flight_date=current_trip_start;
        
        $.ajax({
     type: "POST",
     //Set up your request URL and API Key.
     url: "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyDGksRhR3d_I9uwwnjGXGxWFJxGhY9oD94", 
     contentType: 'application/json', // Set Content-type: application/json
     dataType: 'json',
     // The query we want from Google QPX, This will be the variable we created in the beginning
     data: JSON.stringify(FlightRequestTo),
     success: function (data) {
      //Once we get the result you can either send it to console or use it anywhere you like.
      //console.log(JSON.stringify(data));
      //console.log(data.trips.data.airport[0].name);
      
      //var leg2=data.trips.tripOption.slice.segment[1].leg;
      var price=data.trips.tripOption[0].saleTotal;
      var leg1=data.trips.tripOption[0].slice[0].segment[0].leg[0];
      var leg2=data.trips.tripOption[0].slice[0].segment[1].leg[0];
      
      //console.log(leg2.origin+" "+leg2.destination);
      //console.log(price);
      //console.log(leg1.origin+' '+leg1.destination);
      //console.log(leg2.origin+' '+leg2.destination);
      
      add_flight_iten(leg1.origin,leg1.destination,leg2.destination,price);
    },
      error: function(e){
       //Error Handling for our request
       //alert("Access to Google QPX Failed."+e);
     }
    });
    }
    
    
    function request_flight_return(){
        console.log("Request Return Flight Start"+near_dest_aircode);
        
         flight_origin=near_dest_aircode;
        flight_dest=near_origin_aircode;
        flight_date=current_trip_end;
        $.ajax({
     type: "POST",
     //Set up your request URL and API Key.
     url: "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyDGksRhR3d_I9uwwnjGXGxWFJxGhY9oD94", 
     contentType: 'application/json', // Set Content-type: application/json
     dataType: 'json',
     // The query we want from Google QPX, This will be the variable we created in the beginning
     data: JSON.stringify(FlightRequestBack),
     success: function (data) {
      //Once we get the result you can either send it to console or use it anywhere you like.
      //console.log(JSON.stringify(data));
      
      var price=data.trips.tripOption[0].saleTotal;
      var leg1=data.trips.tripOption[0].slice[0].segment[0].leg[0];
      var leg2=data.trips.tripOption[0].slice[0].segment[1].leg[0];
      
      //console.log(leg2.origin+" "+leg2.destination);
      //console.log(price);
      //console.log(leg1.origin+' '+leg1.destination);
      //console.log(leg2.origin+' '+leg2.destination);
      
      add_flight_back_iten(leg1.origin,leg1.destination,leg2.destination,price);
    },
      error: function(e){
       //Error Handling for our request
       //alert("Access to Google QPX Failed."+e);
     }
    });
    }