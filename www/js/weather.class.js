// This is a JavaScript file


    function find_weather(){
        
    $.getJSON("http://api.openweathermap.org/data/2.5/forecast/daily?q=sapporo&mode=json&units=metric&cnt=16&&APPID=ef1f3cdef77bc455127259e2e8845950",
        function(json) {
;
        console.log(json.list[0].dt);
        //console.log(JSON.stringify(json));
});
};

