$(document).ready(function(){
    var menu = document.getElementsByClassName("body");
    $(document).scroll(function(ev){
        if(window.scrollY > 0) {
            $(".menu").css("position", "fixed");
        } else {
            $(".menu").css("position", "relative"); 
        }
    });
    
});