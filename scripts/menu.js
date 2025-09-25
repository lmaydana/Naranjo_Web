$(document).ready(function(){
    var menu = document.getElementsByClassName("body");

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
    var containers = `<p class='profileItem profileData'><a href="profile.html">Opciones de perfil</a></p>`;
    if(userInfo.privilege_level == 1){
        containers += `<p class='profileItem uploadProduct'><a href="loadProducts.html">Subir producto</a></p>`;
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
                </li>
                <table class='occult cartMenu'>
                    </table>`);
        }

        $(".menulog .cartMenu").html(getCartHTML(cartInfo));
        $("#cart, .cartMenu").mouseover(function(){
            $(".cartMenu").css("display","block");
        });
        $("#cart, .cartMenu").mouseout(function(){
            $(".cartMenu").css("display","none");
        });
    });
}

function getCartHTML(cartInfo){
    var containers = `<tr><td colspan = "3">Resumen</td></tr>`;
    containers += `<tr><td>Producto</td><td>Cantidad</td><td>Subtotal</td></tr>`;
    var counter = 1;
    var total = 0;
    for (const productId in cartInfo){
        var request = cartInfo[productId];
        containers += `<tr class='cartProduct product${counter}'>`;
        containers += `<td class='cartProductInfo name${counter}'>${request.name}</td>`;
        containers += `<td class='cartProductInfo amount${counter}'>${request.amount}</td>`;
        containers += `<td class='cartProductInfo subtotal${counter}'>$${request.subtotal}<button class="deleteRequest" onclick="deleteRequest(${productId})">X</button></td>`;
        containers += `</tr>`;
        counter++;
        total += request.subtotal;
    }
    containers += `<tr class='carTotal'><td>Total</td><td colspan="2">$${total}</td></tr>`;
    containers += `<tr><td colspan="3"><a class="toBuyEnd" href="buyEnd.html">Continuar compra!</a></td></tr>`;
    return containers;
}

function deleteRequest(id){
    $.post("php/delete_request.php", {productId: id}, function(result) { 
        setCartMenu();
     });
}