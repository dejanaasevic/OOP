let Carticon = document.querySelector("#carticon");
let Cart = document.querySelector(".cart");
let CloseCart=document.querySelector("#cartclose");

//open cart
Carticon.onclick = () =>{
    Cart.classList.add("active");
}

//close cart
CloseCart.onclick= ()=>{
    Cart.classList.remove("active");
}


if(document.readyState=="loading"){
    document.addEventListener("DOMContentLoaded", ready);
}else{
    ready();
}

function ready(){
    var removecartbuttons = document.getElementsByClassName("removecart");
    console.log(removecartbuttons);
    for(var i=0; i<removecartbuttons.length; i++){
        var button=removecartbuttons[i];
        button.addEventListener("click", removecartitem);
    }
    var quanitiyinputs=document.getElementsByClassName('cartquantity');
    for(var i=0; i<quanitiyinputs.length; i++){
        var input=quanitiyinputs[i];
        input.addEventListener("change",quanityChanged);
    }
    
    var addcart=document.getElementsByClassName("addcart");
    for(var i=0; i<addcart.length; i++){
        var button=addcart[i];
        button.addEventListener("click",addCartClicked);
    }
    
    document.getElementsByClassName("btnbuy")[0].addEventListener('click',buybuttonclicked);
}
function addCartClicked(event){
    var button = event.target;
    var shopitem=button.parentElement;
    var title=shopitem.getElementsByClassName("productname")[0].innerText;
    var priceelement=shopitem.getElementsByClassName("price")[0];
    var price=shopitem.getElementsByClassName("cena")[0].innerText;
    var productimage=shopitem.getElementsByClassName("productimg")[0].src;
    addProductToCart(title,price,productimage);
    
}
function addProductToCart(title,price,productimage){
    var cartshopbox=document.createElement("div");
    cartshopbox.classList.add('box');
    var cartitems=document.getElementsByClassName("cartcontent")[0];
    var cartitemsnames=cartitems.getElementsByClassName("cartproductname");
    for(var i=0; i<cartitemsnames.length;i++){
       alert('Već ste dodali ovaj proizvod');
        return;
    }

  

var  cartBoxContent =`
                        <img src="${productimage}" alt="coffee" class="cartimg">
                        <div class="detailbox">
                        <div class="cartproductname">"${title}"</div>
                            <div class="cartprice">"${price}"</div>
                            <input type="number" value="1" class="cartquantity">
                        </div>
                        <img src="img/trashicon.png" class="removecart">`;
cartshopbox.innerHTML=cartBoxContent;
cartitems.append(cartshopbox);
cartshopbox.getElementsByClassName("removecart")[0].addEventListener('click',removecartitem);
cartshopbox.getElementsByClassName("cartquantity")[0].addEventListener('change',quanityChanged);
}
function removecartitem(event){
 var buttonclicked=event.target;
    buttonclicked.parentElement.remove();
    updatetotal();
}
function quanityChanged(event){
    var input=event.target;
    if(isNaN(input.value)||input.value<=0){
        input.value=1;
    }
    updatetotal();
}
function buybuttonclicked(event){
    
}



function updatetotal(){
    var cartcontent=document.getElementsByClassName("cartcontent")[0];
    var contentbox=document.getElementsByClassName("cartbox");
    var total=0;
    for(var i=0; i<contentbox.length; i++){
        var box=contentbox[i];
        var priceelement=box.getElementsByClassName("cartprice")[0];
        var quantityelement=box.getElementsByClassName("cartquantity")[0];
        var quantity =quantityelement.value;
        var price=parseFloat(priceelement.innerText.replace("€",""));
        total=total+(price*quantity);
        total = total.toFixed(2); 
        document.getElementsByClassName("totalprice")[0].innerText=total+"€";
    }

}
