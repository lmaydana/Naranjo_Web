$(document).ready(function(){
    $("#loginForm").submit(function(){
        var data = $(this).serialize();
        $.post("php/login.php", data, function(response){
            var messages = {"fail": "Usuario y/o contraseña incorrecto/s.", "success": "Sesion iniciada."}
            $(".result").html(messages[response]).css("visibility", "visible").fadeIn(2000).fadeOut(2000);
            if(response == "success"){
                window.parent.postMessage(response, "*");
            }
            
        });
        return false;
    });

});