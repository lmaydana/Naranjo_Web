$(document).ready(function(){
    $.post("php/products_query_limited.php", {amount:3}, function(result) {
        var products = JSON.parse(result);
        for (const productIndex in products) {
            var product = products[productIndex];
            var formattedDescription = product.description.replaceAll("\n", "<br>");
            var imageName = product.product_name.replaceAll(" ", "_") + "." + product.image_type;
            formattedDescription = formattedDescription.replaceAll(" ", "&nbsp;");
            
            $(`.${product.type}catalog`).append(`
                <div class="combo">
                <img src="imgs/products_images/${imageName}"/>
                <div class="comboInfo">
                    <div class="productName">${product.product_name}</div>
                    <p class="productDescription comboDescription">
                        ${formattedDescription}
                    </p>
                    <div class="buyInfo">
                        <input class="productAmount" type="number" placeholder="Cantidad" id="amount${product.id}" oninput="handleAmount(${product.id})">
                        <div class="price${product.id}">$${product.price}</div>
                        <button class="buyButton" id="buy${product.id}" onclick="loadCart(${product.id})">Comprar</button>
                    </div>
                </div>
            </div>
            `);
        }

    });



});

function handleAmount(id){
    var amountString = $(`#amount${id}`).val();
    var amount = isNaN(amountString) ? 0 : Number(amountString);
    if (amount < 0) {
        $(`#amount${id}`).val("0");
        return;
    }

    $.post("php/get_product_price.php", {product_id:id}, function(result) {
        if (result == "[]"){
            return;
        }
        var productPrice = JSON.parse(result)[0].price;
        $(".price"+id).html("$"+(productPrice*amount));
    });
    
}

function loadCart(id){
    
    var amount = Number($(`#amount${id}`).val());
    if(amount < 0) { return; }
    $.post("php/shopping_cart_load.php", {product_id:id, product_amount:amount}, function(result){
        if(result != "correct") {
            $(".pageMessage").html("Hubo un error al intentar cargar el carrito").fadeIn(2000).fadeOut(2000);
            return;
        }
        $(".menulog .cartMenu").html(setCartMenu());
    });
    
}