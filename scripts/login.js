$(document).ready(function(){
    $("#loginForm").submit(function(){
        var data = $(this).serialized();
        $.post("php/login.php", data, function(response){
            if(response != "correct"){
                
            }
        });
        return false;
    });
});