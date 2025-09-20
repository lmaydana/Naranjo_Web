$(document).ready(function(){
    $("#signUpForm").validate({
        rules:{
            confirm_password:{
                equalTo:"#password"
            },
            mail:{
                email:true
            }
        }
    });

    $("#signUpForm").submit(function(){
        var data = $(this).serialize();

        $.post("php/signup.php", data, (result)=>{
            if (result == "correct") {
                $(".result").css("visibility", "visible").fadeIn(2000).html("Usuario creado exitosanente!").fadeOut(2000);
                parent.document.getElementById('.logFrame iframe').style.display = 'none';
                return;
            }
            var obj = JSON.parse(result);
            var errors = {"user": "El usuario esta actualmente en uso.", "email":"El email esta en uso."};
            var message = "";
            for(const key in obj){
                message += errors[obj[key]] + "<br>";
            }
            $(".result").css("visibility", "visible").fadeIn(2000).html(message).fadeOut(2000);
        });
        return false;
    });
    
});