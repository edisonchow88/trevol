// This is a JavaScript file

function search_contacts(){
console.log("Search contacts");
navigator.contacts.find(
    ['displayName', 'name','phoneNumbers'],
    function(contacts){
        var contact_name;
        var contact_phone;
        var j=0;
        //Seach a list that is  times smaller
        for( i = 0; i < contacts.length; i++) {
            if(contacts[i].name.formatted != null && contacts[i].name.formatted != undefined ) {
                contact_name = contacts[i].name.formatted;
                contact_name = contact_name.replace(/'/g,"''");
                if(contacts[i].phoneNumbers != null && contacts[i].phoneNumbers.length > 0 && contacts[i].phoneNumbers[0].value != null && contacts[i].phoneNumbers[0].value != undefined ) {
                    j+=1;
                    if(j<50){
                    console.log(j+"."+contact_name+': '+contacts[i].phoneNumbers[0].value );
                    contact_phone = contacts[i].phoneNumbers[0].value;
                    }
                } else {
                    //console.log( "--No Number-" );
                    contact_phone = "";
                }
            }
        }
    },function(error){
        alert(error);
    },{ filter:"", multiple:true }
);

}