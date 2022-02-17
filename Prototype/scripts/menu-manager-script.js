var foodurl  =  'http://awsl.hestech.cn/API/food'
var drinkurl =  'http://awsl.hestech.cn/API/drink'

// download the menu info from the server (food and drink)
function loadFood() {
    axios.get(foodurl)
    .then(function(res){
        // handle success
        let foodlist =res.data;
        localStorage.setItem('foodlist',JSON.stringify(foodlist));
        generatemenu_manager();
    })
    .catch(function(error) {
        // handle error
        console.log(error);
    })
    .then(function() {
        // always executed
    });
}

function loadDrink() {
    axios.get(drinkurl)
    .then(function(res){
        // handle success
        let drinklist =res.data;
        localStorage.setItem('drinklist',JSON.stringify(drinklist));
        generatedrink_manager();
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
    loadFood();
    loadDrink();
 }  


// display the menu info in html
function generatemenu_manager() {
    
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
        
        //Deletion
        let a = document.createElement("div");
        a.className = "order-one";
        a.innerHTML = "<button>DELETE</button>";
        a.id = el.foodid;
        a.addEventListener('click',deleteItem);
        menuSection.appendChild(a);
        
    }
    
};

//Delete menu item function
function deleteItem()
{
    var index = parseInt(this.id);

    console.log(index);
    axios.get('http://awsl.hestech.cn/API/food/delete/'+ index)
    .then(function(response) {
    console.log("OK");
    console.log(response);
    loadFood();
    })
    .catch(function(error) {
        console.log(error);
    });
}

// display the drink into the html
function generatedrink_manager() {
    
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
        
        //Deletion
        let a = document.createElement("div");
        a.className = "order-one";
        a.innerHTML = "<button>DELETE</button>";
        a.id = el.foodid;
        a.addEventListener('click',deleteItemDrink);
        drinkSection.appendChild(a);
        
    }
};



//Delete drinkmenu item function
function deleteItemDrink()
{
    var index = parseInt(this.id);

    console.log(index);
    axios.get('http://awsl.hestech.cn/API/drink/delete/'+ index)
    .then(function(response) {
    console.log("OK");
    console.log(response);
    loadDrink();
    })
    .catch(function(error) {
        console.log(error);
    });
}

// adding dish into the database (food or drink)
function additem() {
    console.log("run the add");
    let foodlist = JSON.parse(localStorage.getItem("foodlist"));
    let drinklist = JSON.parse(localStorage.getItem("drinklist"));
    
    var type = document.getElementsByTagName("select").Itemtype.value;
    var iname = document.getElementsByTagName("input").Itemname.value;
    var iprice = document.getElementsByTagName("input").itemprice.value;
    var img = "./images/" + document.getElementsByTagName("input").ItemImg.value;
    var des = document.getElementsByTagName("textarea").itemdescribution.value;
    
    console.log("input: ",type, iname, iprice, img, des);
    console.log(iname.length , iprice.length, des.length ,img.length);

    if (iname.length > 0 && iprice.length > 0 && des.length > 0 && img.length > 0) {
    
         if (type == "Food"){
            axios.post('http://awsl.hestech.cn/API/food/add', {
                    name: iname,
                    price: iprice,
                    ingre:des,
                    menuimg:img
                })
                .then(function(response) {
                    console.log("OK");
                    console.log(response);
                    loadFood();
                })
                .catch(function(error) {
                    console.log(error);
                });
            
         }else{
            axios.post('http://awsl.hestech.cn/API/drink/add', {
                    name: iname,
                    price: iprice,
                    ingre:des,
                    menuimg:img
                })
                .then(function(response) {
                    console.log("OK");
                    console.log(response);
                    loadDrink(); 
                })
                .catch(function(error) {
                    console.log(error);
                });
            
         }
    }
}




// function additem(){
    
//     if (localStorage.getItem("newdishfood") === null) {
//         localStorage.setItem("newdishfood", "[]");
//     }
//     if (localStorage.getItem("newdishdrink") === null) {
//         localStorage.setItem("newdishdrink", "[]");
//     }

    
//     var type = document.getElementsByTagName("select").Itemtype.value;
//     var iname = document.getElementsByTagName("input").Itemname.value;
//     var iprice = document.getElementsByTagName("input").itemprice.value;
    
//     if (type == "Drink"){
//         var id = drinklist.length + 1;
//     }else{
//         var id = foodlist.length + 1
//     };
    
//     var img = "./images/" + document.getElementsByTagName("input").ItemImg.value;
    
//     var des = document.getElementsByTagName("textarea").itemdescribution.value;
    
//     console.log("input: ",type, iname, iprice, id, img, des);
//     console.log(iname.length , iprice.length , id.length ,des.length ,img.length);

//     if (iname.length > 0 && iprice.length > 0 && id > 0 && des.length > 0 && img.length > 0) {
//         let newfood = {
//             name:iname,
//             price:iprice,
//             ingre:des,
//             foodid:id,
//             menuimg:img
//         };
//     console.log(newfood);
    
//     if (type == "Drink"){
        
//         let foodlist1 = JSON.parse(localStorage.getItem("newdishdrink"));
//         foodlist1.push(newfood);
//         localStorage.setItem("newdishdrink", JSON.stringify(foodlist1));
//     }else{
//         let foodlist1 = JSON.parse(localStorage.getItem("newdishfood"));
//         foodlist1.push(newfood);
//         localStorage.setItem("newdishfood", JSON.stringify(foodlist1));
//     }
//         addtolist();
        
//     }
// }


// function checkValue(check,target){
//     test_temp = false;
//     for (let i =0;i<target.length;i++){
//         if(check.foodid == target[i].foodid || check.name === target[i].name){
//             test_temp=true;
//             return test_temp;
//         }
//     }
//     return test_temp;
// }


// function addtolist(){
//     if (localStorage.getItem("newdishfood") === null) {
//         localStorage.setItem("newdishfood", "[]");
//     }
//     if (localStorage.getItem("newdishdrink") === null) {
//         localStorage.setItem("newdishdrink", "[]");
//     }
//     let foodlist1 = JSON.parse(localStorage.getItem("newdishfood"));

//     let foodlist2 = JSON.parse(localStorage.getItem("newdishdrink"));
    
//     let drink = [];
//     let food = [];
    
//     for(let ell of foodlist1){
//         if (!checkValue(ell,foodlist)){
//             food.push(ell)
//         }
//     }
//     for(let el of foodlist2){
//         if(!checkValue(el,drinklist)){
//             drink.push(el)
//         }
//     }
//     if (drink.length>0){
//     for (let i of drink){
//         drinklist.push(i)
//         }
    
//     }
//     if (food.length>0){
//         for(let x of food){
//             foodlist.push(x)
//         }
//     }
// generatedrink_manager()
// generatemenu_manager()
// }










