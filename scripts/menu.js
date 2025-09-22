$(document).ready(function(){
    var menu = document.getElementsByClassName("body");
    $(document).scroll(function(ev){
        if(window.scrollY > 0) {
            $(".menu").css("position", "fixed");
        } else {
            $(".menu").css("position", "relative"); 
        }
    });

    initSession();

    window.addEventListener('message', function(event) {
        if (event.origin == "http://127.0.0.1") {
            initSession();
        }
    });
});

function setLogMenuEvents(){
    $(".menulog .logMenu").click(loadFrame);
    $(".menulog i").click(loadFrame);

    $(".logFrame iframe").blur(function(){
        $(".logFrame iframe").css("display", "none");
    });
}

function initSession(){
    $(".menulog ul").html("");
    setUserMenu();
}

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

function setUserMenu(){
    $.post("php/user_info.php", {}, function(result) {
        if(result == '{}'){
            closeSession();
            return;
        }
        var userInfo = JSON.parse(result);
        if (!document.getElementById("userInfo")){
            $(".menulog ul").prepend(`
                <li class='menuitem' id='userInfo'>
                    <i class='material-icons'>account_circle</i>${userInfo.user_name}
                    <div class='occult userMenu'>
                    </div>
                </li>`);
        }

        $(".userMenu").html(`${getUserHTML(userInfo)}`);
        $(".closeSession").click(function(ev){
            $.post("php/session_close.php", {}, closeSession);
        });
        setCartMenu();
    });
}

function getUserHTML(userInfo){
    var containers = `<a href="profile.html"><p class='profileItem profileData'>Opciones de perfil</p></a>`;
    if(userInfo.privilege_level == 1){
        containers += `<a href="loadProducts.html"><p class='profileItem uploadProduct'>Subir producto</p></a>`;
    }
    containers += `<p class='profileItem closeSession'>Cerrar sesión</p>`;
    return containers;
}

function closeSession(){
    $(".menulog ul").html(`
        <li class="menuitem logMenu" id="signUp"><i class="material-icons">person_3</i> Registrarse</li>
        <li class="menuitem loginItem logMenu" id="login"><i class="material-icons">key</i>Ingresar</li>
        <div class="logFrame"><iframe src="" style="display: none;"></iframe></div>
    `);

    setLogMenuEvents();
}

function setCartMenu(){
    $.post("php/shopping_cart_info.php", {}, function(result) { 
        if(result == []){
            return;
        }
        var cartInfo = JSON.parse(result);
        if (document.getElementById("cart") == null){
            $(".menulog ul").prepend(`
                <li class='menuitem' id='cart'>
                    <i class='material-icons'>shopping_cart</i>
                    <div class='occult cartMenu' style='display:none;'>
                    </div>
                </li>`);
        }

        $(".menulog .cartMenu").html(`${getCartHTML(cartInfo)}`);
    });
}

function getCartHTML(cartInfo){
    var containers = "";
    var counter = 1;
    var total = 0;
    for (const request in cartInfo){
        containers += `<div class='cartProduct product${counter}'>`;
        containers += `<p class='cartProductInfo name${counter}'>${request.name}</p>`;
        containers += `<p class='cartProductInfo amount${request.amount}'>${request.amount}</p>`;
        containers += `<p class='cartProductInfo subtotal${counter}'>${request.subtotal}</p>`;
        containers += `</div>`;
        counter++;
        total += request.subtotal;
    }
    containers += `<div class='carTotal'>${total}</div>`;
    return containers;
}