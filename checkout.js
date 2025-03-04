
let listCart = [];
function checkCart(){
        var cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCart='));
        if(cookieValue){
            listCart = JSON.parse(cookieValue.split('=')[1]);
        }
}
checkCart();
addCartToHTML();
function addCartToHTML(){
   
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';

    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');
    let totalQuantity = 0;
    let totalPrice = 0;
    
    // if has product in Cart
    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                    `<img src="${product.image}">
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">Rs.${product.price}/1 product</div>
                    </div>
                    <div class="quantity">${product.quantity}</div>
                    <div class="returnPrice">Rs.${product.price * product.quantity}</div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
                totalPrice = totalPrice + (product.price * product.quantity);
            }
        })
    }
    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = 'Rs.' + totalPrice;
}



function placeOrder() {
    // Assuming order placement logic here
    var orderPlacedSuccessfully = true; // Set this to true or false based on the outcome of the order placement process

    if (orderPlacedSuccessfully) {
        // Display order placed message after a delay
        setTimeout(function() {
            // Update button text
            var orderButton = document.getElementById("orderButton");
            orderButton.textContent = "Order Placed Successfully!";
            orderButton.style.backgroundColor = "green";
            
            // Redirect to home page after another delay
            setTimeout(function() {
                window.location.href = "index.html";
            }, 2000); // Delay of 2000 milliseconds (2 seconds) before redirecting
        }, 2000); // Delay of 2000 milliseconds (2 seconds) before displaying the message
    } else {
        var orderButton = document.getElementById("orderButton");
        orderButton.textContent = "Failed to Place Order";
        orderButton.style.backgroundColor = "red";
    }

    function addToCart() {
        
        // Add the product to the listCart array
        listCart.push({
            image: productImage,
            name: productName,
            price: productPrice,
            quantity: 1 // Assuming quantity is 1 
        });
    
        addCartToHTML();
    
        alert("Added to cart");
    }
    
    // Attach click event listener to add to cart button
    document.getElementById("addToCartButton").addEventListener("click", addToCart);
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
