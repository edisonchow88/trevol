// This is a JavaScript file

function dologin(){
compiletabbar();
find_country();
get_gps();
}


//simple algo to queue fading
var logstate=0;
function slidetoggle(){
    //$("#login_box").slideToggle("slow");
    //$("#signup_box").slideToggle("slow");
    
    if(logstate==0){
        $("#login_box").fadeToggle(250);
        setTimeout(function(){ $("#signup_box").fadeToggle(250);    }, 400);  
        logstate=1;
    }else if(logstate==1){
        $("#signup_box").fadeToggle(250);
        setTimeout(function(){ $("#login_box").fadeToggle(250);    }, 400);  
        logstate=0;
    }

}

function signupuser(){
    var signupmail = $('#signup_email').val();
    var signuppass = $('#signup_password').val();

    var user = new Parse.User();
    user.set("username", signupmail);
    user.set("password", signuppass);
    user.set("email", signupmail);
    
    user.signUp(null, {
        success: function(user) {dologin();console.log("User signed up") },
        //error: function(user, error) {alert("Error: " + error.code + " " + error.message);}
        error: function(user, error) {alert("Ooops! Looks like " + error.message);}
    });
}

function loginuser(){
    var mail = $('#login_email').val();
    var pass = $('#login_password').val();
    Parse.User.logIn(mail, pass, {
        success: function(user) {dologin();console.log("User logged in");get_gps()},
        //error: function(user, error) {alert("Error: " + error.code + " " + error.message);}
        error: function(user, error) {alert("Ooops! Looks like you entered " + error.message);}
    });   
}    
    
    
    
    
    
    
    
    
    
    