$(document).ready(function(){
    $.post("php/user_info.php", {}, (result)=>{
        if(result == '{}' || JSON.parse(result).privilege_level == 0){
            window.location.replace("index.html");
        }
    });
    $("#loadProductForm").validate({
        rules:{
            work:{
                number:true,
                required: true,
                min:0
            },
            pieces:{
                number: true,
                required: true,
                min:0
            }
        }
    });

    $("#loadProductForm").submit(function(){
        var formData = new FormData($("#loadProductForm")[0]);
        $.ajax({
            type: "POST",
            url: "php/load_product.php",
            data: formData,
            contentType: false,
            processData: false,
            success: function(result) {
                if (result == "correct") {
                    $(".result").css("visibility", "visible").fadeIn(2000).html("Producto agregado correctamente!").fadeOut(2000);
                    return;
                }

                var obj = JSON.parse(result);
                var errors = {"nameExists": "El nombre de producto ya esta en uso.", "wrongPrivilege":"No tiene los privilegios para realizar esta tarea."};
                var message = "";
                for(const key in obj){
                    message += errors[obj[key]] + "<br>";
                }
                $(".result").css("visibility", "visible").fadeIn(2000).html(message).fadeOut(2000);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Error:", textStatus, errorThrown);
            }
        });
        return false;
        
    });
    
});