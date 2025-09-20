$(document).ready(function(){
    var menu = document.getElementsByClassName("body");
    $(document).scroll(function(ev){
        if(window.scrollY > 0) {
            $(".menu").css("position", "fixed");
        } else {
            $(".menu").css("position", "relative"); 
        }
    });

    $(".menulog li").click(loadFrame);

    $(".logFrame iframe").blur(function(){
        $(".logFrame iframe").css("display", "none");
    });
});

function loadFrame(ev){
     $(".logFrame iframe").attr("src",ev.target.id+".html").on("load", function(){
            $(this).css("display", "block").focus();
            if(ev.target.id == "signUp"){
                $(this).css({height:"350px", right:"14.5%"});
            } else{
                $(this).css({height:"auto", right:"0"});
            }
        })
        return false;
}