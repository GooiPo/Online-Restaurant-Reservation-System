// get the menu JSON file url from server
var foodurl  =  'http://awsl.hestech.cn/API/food'
var drinkurl =  'http://awsl.hestech.cn/API/drink'
var reservationurl = 'http://awsl.hestech.cn/API/reservation'


// get the Menu Info from the server
// food part
function loadFood() {
    axios.get(foodurl)
    .then(function(res){
        // handle success
        let foodlist =res.data;
        localStorage.setItem('foodlist',JSON.stringify(foodlist));
        generatemenu();
    })
    .catch(function(error) {
        // handle error
        console.log(error);
    })
    .then(function() {
        // always executed
    });
}
// drink part
function loadDrink() {
    axios.get(drinkurl)
    .then(function(res){
        // handle success
        let drinklist =res.data;
        localStorage.setItem('drinklist',JSON.stringify(drinklist));
        generatedrink();
    })
    .catch(function(error) {
        // handle error
        console.log(error);
    })
    .then(function() {
        // always executed
    });
}

// get reservation info from server
function loadReservation() {
    axios.get(reservationurl)
    .then(function(res){
        // handle success
        let reserlist =res.data;
        localStorage.setItem('reserlist',JSON.stringify(reserlist));
    })
    .catch(function(error) {
        // handle error
        console.log(error);
    })
    .then(function() {
        // always executed
    });
}

function init(){
    localStorage.setItem("shoppingcart", "[]");
    localStorage.setItem("shoppingcart-drink", "[]");

    loadFood();
    loadDrink();
    loadReservation();
 } 


// show the menu on the menu page
function generatemenu() {

    let foodlist = JSON.parse(localStorage.getItem("foodlist"));
    
    let menuSection = document.getElementById("menudetail");
    
    menuSection.querySelectorAll('*').forEach(n => n.remove());
    
    for (let el of foodlist) {
        
        let hoder = document.createElement("div")
        hoder.id = "menuitemhoder";
        
        let mi = document.createElement("div");
        mi.className = "menu-item";
        
        let ig = document.createElement("div");
        ig.className = "menu-item-des";
    
        
        let ii = document.createElement("img");
        ii.className = "menuimg";
        ii.src = el.menuimg;
        ig.innerHTML = el.ingre;
        mi.innerHTML = el.name + " - " + el.price;
        
        
        mi.appendChild(ig);
        hoder.appendChild(ii);
        
        hoder.appendChild(mi);
        
        
        menuSection.appendChild(hoder);
        
        let buyme = document.createElement("div");
        buyme.className = "order-one";
        buyme.innerHTML = "<button>order</button>";
        buyme.id = el.foodid;
        buyme.addEventListener("click", buyItem);
        menuSection.appendChild(buyme);
    }
    showCart();
};


function generatedrink() {
    
    let drinklist = JSON.parse(localStorage.getItem("drinklist"));
 
    let drinkSection = document.getElementById("drinkdetail");
    
    drinkSection.querySelectorAll('*').forEach(n => n.remove());
    
    for (let el of drinklist) {
        
        let hoder = document.createElement("div")
        hoder.id = "menuitemhoder";
        
        let di = document.createElement("div");
        di.className = "menu-item";
        di.innerHTML = el.name + " - " + el.price;
        let dg = document.createElement("div");
        dg.className = "menu-item-des";
        dg.innerHTML = el.ingre;
        
        let dii = document.createElement("img");
        dii.className = "menuimg";
        dii.src = el.menuimg;
        
        di.appendChild(dg);
        
        hoder.appendChild(dii);
        
        hoder.appendChild(di);
        
        drinkSection.appendChild(hoder);
        
        
        
        let buyme = document.createElement("div");
        buyme.className = "order-one";
        buyme.innerHTML = "<button>order</button>";
        buyme.id = el.foodid;
        buyme.addEventListener("click", buyItemDrink);
        
        drinkSection.appendChild(buyme);
    }
    showCartDrink();
};

// adding food into the shopping cart
function buyItem() {
    if (localStorage.getItem("shoppingcart") === null)
        localStorage.setItem("shoppingcart", "[]")
    let cart = JSON.parse(localStorage.getItem("shoppingcart"));
    let newItem = parseInt(this.id);
    cart.push(newItem);
    localStorage.setItem("shoppingcart", JSON.stringify(cart));
    
    showCart();
}

// adding drinks into the shopping cart
function buyItemDrink() {
    if (localStorage.getItem("shoppingcart-drink") === null)
        localStorage.setItem("shoppingcart-drink", "[]")
    let cart = JSON.parse(localStorage.getItem("shoppingcart-drink"));
    let newItem = parseInt(this.id);
    cart.push(newItem);
    localStorage.setItem("shoppingcart-drink", JSON.stringify(cart));
    
    showCartDrink();
};


// show what the customer ordered (food)
function showCart() {
    let foodlist = JSON.parse(localStorage.getItem("foodlist"));
    
    if (localStorage.getItem("shoppingcart") === null)
        localStorage.setItem("shoppingcart", "[]")
    let c = document.getElementById("cart-display")
    c.querySelectorAll('*').forEach(n => n.remove());
    c.innerHTML = "My Purchase - food";
    let cart = JSON.parse(localStorage.getItem("shoppingcart"));
    for (let el of cart) {
        let p = foodlist.findIndex(n=>n.foodid === parseInt(el))
        let d = document.createElement("div")
        d.innerHTML = foodlist[p].name + "  -- " + foodlist[p].price + " &nbsp&nbsp";  
        let del = document.createElement("div")
        del.className = "delete-me"
        del.innerHTML = "<button>DELETE</button>"
        d.addEventListener('click',deleteMe);     
        d.appendChild(del)
        c.appendChild(d)
    } 
}


// show what the customer ordered (drink)
function showCartDrink() {
    let drinklist = JSON.parse(localStorage.getItem("drinklist"));
    
    if (localStorage.getItem("shoppingcart-drink") === null)
        localStorage.setItem("shoppingcart-drink", "[]")
    let c = document.getElementById("cart-display-drink")
    c.querySelectorAll('*').forEach(n => n.remove());
    c.innerHTML = "My Purchase - drink";
    let cart = JSON.parse(localStorage.getItem("shoppingcart-drink"));      
    for (let el of cart) {
        let p = drinklist.findIndex(n=>n.foodid === parseInt(el))
        let d = document.createElement("div")
        d.innerHTML = drinklist[p].name + "  -- " + drinklist[p].price + " &nbsp&nbsp";  
        let del = document.createElement("div")
        del.className = "delete-me"
        del.innerHTML = "<button>DELETE</button>"
        d.addEventListener('click',deleteMeDrink);  
        d.appendChild(del)
        c.appendChild(d)
    } 
}

// delete the food ordered in the shopping cart
function deleteMe()
{
    let p = this.parentNode
    console.log(p)
    console.log(this)
    let i = 0
    while (p.children[i] != this)
        i++;
    console.log(i)
    p.removeChild(this)
    let cart = JSON.parse(localStorage.getItem("shoppingcart"));
    
    cart.splice(i,1);
    localStorage.setItem("shoppingcart", JSON.stringify(cart)); 
    showCart();
}

// delete the drink ordered in the shopping cart
function deleteMeDrink()
{
    let p = this.parentNode
    console.log(p)
    console.log(this)
    let i = 0
    while (p.children[i] != this)
        i++;
    console.log(i)
    p.removeChild(this)
    let cart = JSON.parse(localStorage.getItem("shoppingcart-drink"));
    
    cart.splice(i,1);
    localStorage.setItem("shoppingcart-drink", JSON.stringify(cart));
    showCartDrink();
}

function showall(){
    showCart();
    showCartDrink();
}


// helper function 
function toIntList(list){
    let outlist = []
    for (let el of list){
        outlist.push(parseInt(el))
    }
    return outlist
}


// submit the order to the server and store it into the database 
function submitOrder(){
    let drinkcart = JSON.parse(localStorage.getItem("shoppingcart-drink"));
    let foodcart = JSON.parse(localStorage.getItem("shoppingcart"));
    let reserID = parseInt(document.getElementsByTagName("input").reservationid.value);
    let list = JSON.parse(localStorage.getItem("reserlist"));

    for (let el of list){
        if (el.id === reserID){
            // food and drink user ordered
            foodordered = JSON.stringify(toIntList(foodcart));
            drinkordered = JSON.stringify(toIntList(drinkcart));
            console.log(foodordered);
            console.log(drinkordered);
            // upload data 
            axios.post('http://awsl.hestech.cn/API/reservation/update', {
                id: reserID,
                food: foodordered,
                drink: drinkordered
            })
            .then(function(response) {
                console.log("OK");
                console.log(response);
                foodcart =[];
                drinkcart = [];
                localStorage.setItem("shoppingcart", JSON.stringify(foodcart));
                localStorage.setItem("shoppingcart-drink", JSON.stringify(drinkcart));
                showCart();
                showCartDrink();
                alert("order submitted")
            })
            .catch(function(error) {
                console.log(error);
                alert("Creating reservation failed, some info is missing or invalid.")
            });


        }
    }
    localStorage.setItem("reservationlist",JSON.stringify(list));
    showCart();
    showCartDrink();
    
}
