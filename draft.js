
//VERSION 1

// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
    {
         id: 1,
         name: 'cooking oil',
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
 //console.log(cartList);
 
 // Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
 var cart = [];
 //console.log(cart);
 
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
     let totalPriceSpan = document.getElementById("total_price");
     totalPriceSpan.textContent = calculateTotal();
 
 }
 
 // Exercise 2
 function cleanCart() {
 
     cartList.length = 0;
     console.log("The cartList has been cleared:", cartList);
 
 }
 
 // Exercise 3
 function calculateTotal() {
     // Calculate total price of the cart using the "cartList" array
     let sumPrices = 0;
     for (let i = 0; i < cartList.length; i++) {
         sumPrices += cartList[i].price;
     }
     return sumPrices;
 }
 
     // call function
     const totalPrice = calculateTotal();
     console.log("the total price is:", totalPrice);
 
 
 
 // Exercise 4
 
 /* OPTION 1 - WITHOUT ALL PROPERTIES
  function generateCart() {
     var itemCount = {};
 
     for (var i = 0; i < cartList.length; i++) {
         var itemId = cartList[i].id.toString();
         if (itemCount[itemId]) {
             itemCount[itemId]++;
         } else {
             itemCount[itemId] = 1;
         }
     }
 
     for (var itemId in itemCount) {
         cart.push({ id: itemId, quantity: itemCount[itemId] });
     }
 
     console.log("Current cart: ", cart);
     console.log("cartList after generateCart(): ", cartList);
 } 
 
 /* OPTION 2 - WITH ALL PROPERTIES*/
 
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
                 subtotal: 0,
                 subtotalWithDiscount: 0
             };
         }
     }
 
     var cart = Object.values(itemCount);
 
     console.log("Current cart: ", cart);
     console.log("cartList after generateCart(): ", cartList);
     return cart;
 }
 
 
 //CALL generateCart
 document.getElementById("cartButton").addEventListener("click", function buttonClickHandler() {
     const cart = generateCart(); // Generate the cart first
     const cartWithPromotions = applyPromotionsCart(cart); // Apply promotions and get the modified cart
     console.log("This is the cart with discounts applied: ", cartWithPromotions);
 });
 
 
 
 
 // Exercise 5
 
 
 function applyPromotionsCart(cart) {
         // COOKING OIL PROMO
         let cookingOilItem = null;
     
         for (let i = 0; i < cart.length; i++) {
             if (cart[i].id === 1 && cart[i].type === 'grocery') {
                 cookingOilItem = cart[i];
                 break;
             }
         }
     
         if (cookingOilItem) {
             let subtotal = cookingOilItem.price * cookingOilItem.quantity;
             cookingOilItem.subtotal = subtotal;
     
             // Step 3: Apply the promotion
             let subtotalWithDiscount = subtotal - 10;
             cookingOilItem.subtotalWithDiscount = subtotalWithDiscount;
         }
 
     // Instant cupcake mixture PROMO
 
     let cupcakeMixtureItem = null;
     
     for (let i = 0; i < cart.length; i++) {
         if (cart[i].id === 3 && cart[i].type === 'grocery') {
             cupcakeMixtureItem = cart[i];
             break;
         }
     }
 
     if (cupcakeMixtureItem) {
 
         let subtotal = cupcakeMixtureItem.price * cupcakeMixtureItem.quantity;
         cupcakeMixtureItem.subtotal = subtotal;
 
         // Step 3: Apply the promotion
         let subtotalWithDiscount = subtotal - 10;
         cupcakeMixtureItem.subtotalWithDiscount = subtotalWithDiscount;
     }
 
     //  HAVE TO CHECK IT--- THIS MAKES IT WORK BUT ONLI WITH THE -10 DISCOUNT, HAVE TO FIX THE CUPCAKE MIX TO DISCOUNT 30%
     for (let i = 0; i < cart.length; i++) {
         const item = cart[i];
         item.subtotal = item.price * item.quantity;
         item.subtotalWithDiscount = item.subtotal - 10; // Apply the discount
     }
 
     return cart;
 }
 
 applyPromotionsCart(cart);
 
 console.log("This is the cart with discounts applied: ", cart);
 
 
 
 
 // Exercise 6
 function printCart() {
     // Fill the shopping cart modal manipulating the shopping cart dom
 }
 
 
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


 //VERSION 2


// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
    {
         id: 1,
         name: 'cooking oil',
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
 //console.log(cartList);
 
 // Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
 var cart = [];
 //console.log(cart);
 
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
     let totalPriceSpan = document.getElementById("total_price");
     totalPriceSpan.textContent = calculateTotal();
 
 }
 
 // Exercise 2
 function cleanCart() {
 
     cartList.length = 0;
     console.log("The cartList has been cleared:", cartList);
 
 }
 
 // Exercise 3
 function calculateTotal() {
     // Calculate total price of the cart using the "cartList" array
     let sumPrices = 0;
     for (let i = 0; i < cartList.length; i++) {
         sumPrices += cartList[i].price;
     }
     return sumPrices;
 }
 
     // call function
     const totalPrice = calculateTotal();
     console.log("the total price is:", totalPrice);
 
 
 
 // Exercise 4
 
 /* OPTION 1 - WITHOUT ALL PROPERTIES
  function generateCart() {
     var itemCount = {};
 
     for (var i = 0; i < cartList.length; i++) {
         var itemId = cartList[i].id.toString();
         if (itemCount[itemId]) {
             itemCount[itemId]++;
         } else {
             itemCount[itemId] = 1;
         }
     }
 
     for (var itemId in itemCount) {
         cart.push({ id: itemId, quantity: itemCount[itemId] });
     }
 
     console.log("Current cart: ", cart);
     console.log("cartList after generateCart(): ", cartList);
 } 
 
 /* OPTION 2 - WITH ALL PROPERTIES*/
 
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
                 subtotal: 0,
                 subtotalWithDiscount: 0
             };
         }
     }
 
     var cart = Object.values(itemCount);
 
     console.log("Current cart: ", cart);
     console.log("cartList after generateCart(): ", cartList);
     return cart;
 }
 
 
 //CALL generateCart
 document.getElementById("cartButton").addEventListener("click", function buttonClickHandler() {
     const cart = generateCart(); // Generate the cart first
     const cartWithPromotions = applyPromotionsCart(cart); // Apply promotions and get the modified cart
     console.log("This is the cart with discounts applied: ", cartWithPromotions);
 });
 
 
 
 
 // Exercise 5
 
 
 function applyPromotionsCart(cart) {
 
 
         // COOKING OIL PROMO
         let cookingOilItem = null;
     
         for (let i = 0; i < cart.length; i++) {
             if (cart[i].id === 1 && cart[i].type === 'grocery') {
                 cookingOilItem = cart[i];
                 break;
             }
         }
     
         if (cookingOilItem) {
             // calculate subtotal based on quantity
             let subtotalOil = cookingOilItem.price * cookingOilItem.quantity;
             cookingOilItem.subtotal = subtotalOil;
     
             // calculate subtotal with discount
             let subtotalWithDiscountOil = subtotalOil - 10;
             cookingOilItem.subtotalWithDiscount = subtotalWithDiscountOil;
 
             // send new values to array
             var targetId = 1; // The ID of the object you want to modify
 
             for (var i = 0; i < arr.length; i++) {
                 if (cart[i].id === targetId) {
                     // Update the properties of the target object
                     cart[i].subtotal = subtotalOil;
                     cart[i].subtotalWithDiscount = subtotalWithDiscountOil;
                     break;
                 }
             }
         }
 
     // Instant cupcake mixture PROMO
 
     let cupcakeMixtureItem = null;
     
     for (let i = 0; i < cart.length; i++) {
         if (cart[i].id === 3 && cart[i].type === 'grocery') {
             cupcakeMixtureItem = cart[i];
             break;
         }
     }
 
     if (cupcakeMixtureItem) {
 
         let subtotalCup = cupcakeMixtureItem.price * cupcakeMixtureItem.quantity;
         cupcakeMixtureItem.subtotal = subtotalCup;
 
         // Step 3: Apply the promotion
         let discountCupcake = 0.67;
         let subtotalWithDiscountCup = subtotalCup - (subtotalCup * discountCupcake);
         cupcakeMixtureItem.subtotalWithDiscount = subtotalWithDiscountCup;
 
         // send new values to array
         var targetId = 3; // The ID of the object you want to modify
 
         for (var i = 0; i < arr.length; i++) {
             if (cart[i].id === targetId) {
                 // Update the properties of the target object
                 cart[i].subtotal = subtotalCup;
                 cart[i].subtotalWithDiscount = subtotalWithDiscountCup;
                 break;
             }
         }
 
 
     }
 
 
     return cart;
 }
 
 
 
 
 
 // Exercise 6
 function printCart() {
     // Fill the shopping cart modal manipulating the shopping cart dom
 }
 
 
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

//VERSION 3 DOESNT WORK

// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
   {
        id: 1,
        name: 'cooking oil',
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
//console.log(cartList);

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];
//console.log(cart);

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
    let totalPriceSpan = document.getElementById("total_price");
    totalPriceSpan.textContent = calculateTotal();

}

// Exercise 2
function cleanCart() {

    cartList.length = 0;
    console.log("The cartList has been cleared:", cartList);

}

// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array
    let sumPrices = 0;
    for (let i = 0; i < cartList.length; i++) {
        sumPrices += cartList[i].price;
    }
    return sumPrices;
}

    // call function
    const totalPrice = calculateTotal();
    console.log("the total price is:", totalPrice);



// Exercise 4

/* OPTION 1 - WITHOUT ALL PROPERTIES
 function generateCart() {
    var itemCount = {};

    for (var i = 0; i < cartList.length; i++) {
        var itemId = cartList[i].id.toString();
        if (itemCount[itemId]) {
            itemCount[itemId]++;
        } else {
            itemCount[itemId] = 1;
        }
    }

    for (var itemId in itemCount) {
        cart.push({ id: itemId, quantity: itemCount[itemId] });
    }

    console.log("Current cart: ", cart);
    console.log("cartList after generateCart(): ", cartList);
} 

/* OPTION 2 - WITH ALL PROPERTIES*/

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
                subtotal: item.price * 1,  // Initialize with the price of one item
                subtotalWithDiscount: item.price * 1,  // Initialize with the price of one item
            };
        }
    }

    var cart = Object.values(itemCount);

    console.log("Current cart: ", cart);
    console.log("cartList after generateCart(): ", cartList);
    return cart;
}



//CALL generateCart
document.getElementById("cartButton").addEventListener("click", function buttonClickHandler() {
    generateCart(); // Generate and modify the cart
    applyPromotionsCart(cart); // Apply promotions to the modified cart
    console.log("This is the cart with discounts applied: ", cart);
});






// Exercise 5


function applyPromotionsCart(cart) {
    // COOKING OIL PROMO
    let cookingOilItem = null;
    
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === 1 && cart[i].type === 'grocery') {
            cookingOilItem = cart[i];
            break;
        }
    }
    
    if (cookingOilItem) {
        let subtotalOil = cookingOilItem.price * cookingOilItem.quantity;
        cookingOilItem.subtotal = subtotalOil;

        let subtotalWithDiscountOil = subtotalOil - 10;
        cookingOilItem.subtotalWithDiscount = subtotalWithDiscountOil;
    }

    // Instant cupcake mixture PROMO
    let cupcakeMixtureItem = null;
    
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === 3 && cart[i].type === 'grocery') {
            cupcakeMixtureItem = cart[i];
            break;
        }
    }
    
    if (cupcakeMixtureItem) {
        let subtotalCup = cupcakeMixtureItem.price * cupcakeMixtureItem.quantity;
        cupcakeMixtureItem.subtotal = subtotalCup;

        let discountCupcake = 0.67;
        let subtotalWithDiscountCup = subtotalCup - (subtotalCup * discountCupcake);
        cupcakeMixtureItem.subtotalWithDiscount = subtotalWithDiscountCup;
    }

    return cart;
}




// Exercise 6
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom
}


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
