// This is a JavaScript file

var viewport = {
    width  : $(window).width(),
    height : $(window).height()
};

//sorry bad class item
function addimage(){
    tripNavigator.pushPage('3_trip_1_add_1_crop.html');
    
    }

        var pictureSource; 
        var destinationType;
        
document.addEventListener("deviceready", function(){
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
});

function getPhoto(source)
    {        
        navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 100, 
        destinationType: destinationType.NATIVE_URI, sourceType: pictureSource.SAVEDPHOTOALBUM });
    }

function onPhotoURISuccess(imageURI) {
      tripNavigator.pushPage('3_trip_1_add_1_crop.html');
      setTimeout(function(){ 
          $("#target").attr("src",imageURI);    
          $('#target').Jcrop({
              boxWidth: viewport.width,
              onChange : updatePreview,
              onSelect : updatePreview,
              aspectRatio: 1
              });
      }, 400);  
    } 
    
function onFail(){
    console.log("Photo failed");
}
 
 
    function updatePreview(c) {
    if(parseInt(c.w) > 0) {
        // Show image preview
        var imageObj = $("#target")[0];
        var canvas = $("#preview")[0];
        var context = canvas.getContext("2d");
        context.drawImage(imageObj, c.x, c.y, c.w, c.h, 0, 0, 100, 100);
    }
};




function cropimage(){
         var canvas = $("#preview")[0];
         var url = canvas.toDataURL();
         trip_image_url=url.replace(/^data:image\/(png|jpeg);base64,/, "");
         $(".new_trip_img").attr("src",url);
} 

