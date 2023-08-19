
// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
    {
         id: 1,
         name: 'Cooking oil',
         price: 10.5,
         type: 'grocery',
         offer: {
             number: 3,
             percent: 20
         }
     },
     {
         id: 2,
         name: 'Pasta',
         price: 6.25,
         type: 'grocery'
     },
     {
         id: 3,
         name: 'Instant cupcake mixture',
         price: 5,
         type: 'grocery',
         offer: {
             number: 10,
             percent: 30
         }
     },
     {
         id: 4,
         name: 'All-in-one',
         price: 260,
         type: 'beauty'
     },
     {
         id: 5,
         name: 'Zero Make-up Kit',
         price: 20.5,
         type: 'beauty'
     },
     {
         id: 6,
         name: 'Lip Tints',
         price: 12.75,
         type: 'beauty'
     },
     {
         id: 7,
         name: 'Lawn Dress',
         price: 15,
         type: 'clothes'
     },
     {
         id: 8,
         name: 'Lawn-Chiffon Combo',
         price: 19.99,
         type: 'clothes'
     },
     {
         id: 9,
         name: 'Toddler Frock',
         price: 9.99,
         type: 'clothes'
     }
 ]
 // Array with products (objects) added directly with push(). Products in this array are repeated.
 var cartList = [];
 
 // Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
 var cart = [];
 
 var total = 0;
 
 // Exercise 1
 function buy(id) {
     // 1. Loop for to the array products to get the item to add to cart
 
     let productId = id;
 
     let foundProduct = products.find(products => products.id === productId); // .FIND METHOD
 
     // 2. Add found product to the cartList array
 
     if (foundProduct) {
       console.log("Product bought:", foundProduct);
       cartList.push(foundProduct)
     } else {
       console.log("Product doesn't exist.");
     }
 
     console.log("Current cartList:", cartList);
     console.log ("the total price is:", calculateTotal());
 
 }
 
 // Exercise 2
 function cleanCart() {
 
     cartList.length = 0;
     console.log("The cartList has been cleared:", cartList);
 
 }
 
 // Exercise 3
 function calculateTotal() {
     // Calculate total price of the cartList
     let sumPrices = 0;
     for (let i = 0; i < cartList.length; i++) {
         sumPrices += cartList[i].price;
     }
     return sumPrices;
 }

     const totalPrice = calculateTotal();
     console.log("the total price is:", totalPrice);
 
 
 
 // Exercise 4
 
 
 function generateCart() {
     var itemCount = {};
 
     for (var i = 0; i < cartList.length; i++) {
         var item = cartList[i];
         var itemId = item.id.toString();
         
         if (itemCount[itemId]) {
             itemCount[itemId].quantity++;
         } else {
             itemCount[itemId] = {
                 id: itemId,
                 name: item.name,
                 price: item.price,
                 type: item.type,
                 quantity: 1,
                 offer: item.offer,
                 subtotal: 0,
                 subtotalWithDiscount: 0
             };
         }
     }
 
     var cart = Object.values(itemCount); // REDECLARED CART VARIABLE, IS IT PUSHING THE OBJECTS TO THE GLOBAR CART ARRAY??????? IDTHINK SO, ITS MAKING A NEW ARRAY, FIX!
 
     console.log("Current cart: ", cart);
     console.log("cartList after generateCart(): ", cartList);
     return cart;
 }
 

  
 
 // Exercise 5
 
 
 function applyPromotionsCart(cart) {
    console.log("applyPromotionsCart is working");
    console.log("Received cart:", cart);

       for (let i = 0; i < cart.length; i++) {
      const product = cart[i];

      if (product.id == 1 && product.quantity % 3 == 0) {
         console.log("applyPromotionsCart(cart): id 1 found");
         product.subtotal = product.price * product.quantity;
         product.subtotalWithDiscount = product.subtotal - (0.2 * product.subtotal);
         console.log("subtotal of oil is: " + product.subtotalWithDiscount);

      } else if (product.id == 3 && product.quantity >= 10) {
        console.log("applyPromotionsCart(cart): id 1 found");
        product.subtotal = product.price * product.quantity;
        product.subtotalWithDiscount = product.subtotal - (0.3 * product.subtotal);
        console.log("subtotal of cupcake mixture is: " + product.subtotalWithDiscount);
        }

        else {
            product.subtotal = product.price * product.quantity;
            product.subtotalWithDiscount = product.subtotal;
            console.log("subtotal of else products is: " + product.subtotalWithDiscount);
            }
    
 }

 }

 
 // Exercise 6
 function printCart(cart) {
 // Fill the shopping cart modal manipulating the shopping cart dom

    console.log("printCart is working: ", cart);

    const tableBody = document.getElementById("cart_list");
    let total = 0;

    cart.forEach(product => {
        const row = document.createElement("tr");
        
        const nameCell = document.createElement("td");
        const productName = document.createElement("strong");
        productName.textContent = product.name;
        nameCell.appendChild(productName);
        row.appendChild(nameCell);
        
        const priceCell = document.createElement("td");
        priceCell.textContent = `$${product.price}`;
        row.appendChild(priceCell);
        
        const qtyCell = document.createElement("td");
        qtyCell.textContent = product.quantity;
        row.appendChild(qtyCell);
        
        const totalCell = document.createElement("td");
        totalCell.textContent = `$${product.subtotalWithDiscount}`;
        row.appendChild(totalCell);
        
        tableBody.appendChild(row);

        //sum totals with discount
        total += product.subtotalWithDiscount;
        console.log("total is: ", total);

        //print the total with discounts in modal/cart
        let totalPriceSpan = document.getElementById("total_price");
        totalPriceSpan.textContent = total;

    });




 }
 

   //CALL generateCart(), applyPromotionsCart() and printCart() on cartButton CLICK

   document.getElementById("cartButton").addEventListener("click", function buttonClickHandler() {
    const generatedCart = generateCart(); 
    applyPromotionsCart(generatedCart);

    console.log("Generated cart:", generatedCart);
    printCart(generatedCart); 
    // CART IS BEIGN PRINTED AGAIN WITH EVERY CARTBUTTON CLICK, ARRAY IS BEIGN UPDATED BUT ELEMENTS PRINTED IN CART SHOULD BE DELETED EVERY TIME THE MODAL CLOSES?

 });
 

 document.getElementById("closeCartButton").addEventListener("click", function closeCartButtonClickHandler() {
    const tableBody = document.getElementById("cart_list");

    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }

 });
 








 // ** Nivell II **
 
 // Exercise 8
 function addToCart(id) {
     // Refactor previous code in order to simplify it 
     // 1. Loop for to the array products to get the item to add to cart
     // 2. Add found product to the cart array or update its quantity in case it has been added previously.
 }
 
 // Exercise 9
 function removeFromCart(id) {
     // 1. Loop for to the array products to get the item to add to cart
     // 2. Add found product to the cartList array
 }
 
 function open_modal(){
     console.log("Open Modal");
     printCart();
 }
