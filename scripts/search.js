$(document).ready(function(){
    
});

function changeSelection(obj, func){
    obj.parentNode.parentNode.querySelector("#selection").innerHTML = obj.innerHTML;
    func(obj);
}

function getBasePrice(id){
    /* Completar esta funcion agregando la consulta a mysql */
    return 1500;
}

function updatePrice(id){
    var amountStr = $("#amount"+id).val(); 
    if(!amountStr) amountStr ="0";
    var amount = Number(amountStr);
    $("#price"+id).html("$"+amount*getBasePrice(id));
}

function changeAmount(id, displace){
    var amountStr = $("#amount"+id).val(); 
    if(!amountStr) amountStr = "0";
    var amount = Number(amountStr);
    if(amount == 0 && displace < 0) return;
    amount += displace;
    $("#amount"+id).val(amount);
    updatePrice(id);
}