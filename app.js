let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');

iconCart.addEventListener('click', function(){
    if(cart.style.right == '-100%'){
        cart.style.right = '0';
        container.style.transform = 'translateX(-400px)';
    }else{
        cart.style.right = '-100%';
        container.style.transform = 'translateX(0)';
    }
})
close.addEventListener('click', function (){
    cart.style.right = '-100%';
    container.style.transform = 'translateX(0)';
})


let products = null;
// get data from file json
fetch('product.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();
})


function addDataToHTML(){
    
    let listProductHTML = document.querySelector('.listProduct');
    listProductHTML.innerHTML = '';

    // add new data
    if(products != null) // if has data
    {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML = 
            `<img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">Rs.${product.price}</div>
            <button onclick="addCart(${product.id})">Add To Cart</button>`;

            listProductHTML.appendChild(newProduct);

        });
    }
}


//using cookie so the cart details doesn't get lost after refreshing


let listCart = [];
function checkCart(){
    var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }else{
        listCart = [];
    }
}
checkCart();
function addCart($idProduct){
    let productsCopy = JSON.parse(JSON.stringify(products));
    //// If this product is not in the cart
    if(!listCart[$idProduct]) 
    {
        listCart[$idProduct] = productsCopy.filter(product => product.id == $idProduct)[0];
        listCart[$idProduct].quantity = 1;
    }else{
        //If this product is already in the cart.
        //I just increased the quantity
        listCart[$idProduct].quantity++;
    }
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";

    addCartToHTML();
}
addCartToHTML();
function addCartToHTML(){

    // clear data default
    let listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = '';

    let totalHTML = document.querySelector('.totalQuantity');
    let totalQuantity = 0;

    // if has product in Cart
    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                    `<img src="${product.image}">
                    <div class="content">
                        <div class="name">${product.name}</div>
                        <div class="price">Rs.${product.price} / 1 product</div>
                    </div>
                    <div class="quantity">
                        <button onclick="changeQuantity(${product.id}, '-')">-</button>
                        <span class="value">${product.quantity}</span>
                        <button onclick="changeQuantity(${product.id}, '+')">+</button>
                    </div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
            }
        })
    }
    totalHTML.innerText = totalQuantity;
}
function changeQuantity($idProduct, $type){
    switch ($type) {
        case '+':
            listCart[$idProduct].quantity++;
            break;
        case '-':
            listCart[$idProduct].quantity--;

            // if quantity <= 0 then remove product in cart
            if(listCart[$idProduct].quantity <= 0){
                delete listCart[$idProduct];
            }
            break;
    
        default:
            break;
    }
    
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; /;";
    
    addCartToHTML();
} 
//navigation bar changing colour when user starts scrollling 
var lastscroll=0; 
window.addEventListener('scroll',function (){
    var scrollpos = window.scrollY; 
    if(scrollpos>100){ 
        var color="#007ba7"  //blue colour when moving   
    }else{
        var color="rgba(255,255,255,0)" //transparent colour when going back 
    }
    lastscroll= scrollpos <= 0 ? 0 : scrollpos; //setting where last scroll position was 
    document.getElementById('header').style.backgroundColor=color; //setting color 
}) 

//making active class work when clicking on link
document.addEventListener('DOMContentLoaded', function() { //when window loads above functions are called 
  setactive();
  setactiveurl();
});

function setactive() {
      var links = document.querySelectorAll('nav ul li a'); //decalring all navigation bar links in array 
      links.forEach(function(link) {
        link.addEventListener('click', function() { //Listens for click event 
              links.forEach(function(link) {
                link.classList.remove('active'); //remove active class from links that doesn't have click 
              });
              this.classList.add('active'); //adding active class for the link that has been clicked 
        });
      });
}

//making sure that the active link stays without disappearing 
function setactiveurl() {
      var currentloc = window.location.href;
      var links = document.querySelectorAll('nav ul li a');
      links.forEach(function(link) {
        if (link.href === currentloc) {
              link.classList.add('active');
        }
      });
}
