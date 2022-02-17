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
    loadFood();
    loadDrink();
    loadReservation();
 } 


// main function for check a specific reservation
function checkOrder(){
    if (localStorage.getItem('reserlist') === null) {
    localStorage.setItem('reserlist', "[]");
    }
    let reserID = parseInt(document.getElementsByTagName("input").reservationid.value);
    let list = JSON.parse(localStorage.getItem('reserlist'));
    
    let menulist = JSON.parse(localStorage.getItem('foodlist'));
    let drinklist = JSON.parse(localStorage.getItem('drinklist'));

    let showfood = document.getElementById("cart-display");
    let showdrink = document.getElementById("cart-display-drink")
    for (let el of list){
        
        if (el.id === reserID){
            showreservationbyid(reserID);
            // show the food that client ordered
            if (el.food != null){
                showfood.querySelectorAll('*').forEach(n => n.remove());
                for (let fid of JSON.parse(el.food)) {
                    let p = menulist.findIndex(n=>n.foodid === fid)
                    console.log(p)
                    let d = document.createElement("div")
                    d.innerHTML = menulist[p].name + "  -- " + menulist[p].price;
                    showfood.appendChild(d);
                } 
            }
            // show the drink that client ordered
            if (el.drink != null){
            showdrink.querySelectorAll('*').forEach(n => n.remove());
            for (let Drinkid of JSON.parse(el.drink)) {
                let p = drinklist.findIndex(n=>n.foodid === Drinkid)
                let d = document.createElement("div")
                d.innerHTML = drinklist[p].name + "  -- " + drinklist[p].price;
                showdrink.appendChild(d);
                }
            }
        }
    }
    alert("show the order")
}

// delete a resrvation by given a reservation id
function deleteReser(id){
    var index = parseInt(id);
    console.log(index);
    axios.get('http://awsl.hestech.cn/API/reservation/delete/'+ index)
    .then(function(response) {
    console.log("OK");
    console.log(response);
    loadReservation();
    let myreservation = document.getElementById("reser-info");
    let showfood = document.getElementById("cart-display");
    let showdrink = document.getElementById("cart-display-drink");
    showfood.querySelectorAll('*').forEach(n => n.remove());
    showdrink.querySelectorAll('*').forEach(n => n.remove());
    myreservation.innerHTML = "";
    alert("Reservation deleted successfully!");
    })
    .catch(function(error) {
        console.log(error);
    });
}


// function deleteReser(idx){
//     if (localStorage.getItem("reservationlist") === null) {
//         localStorage.setItem("reservationlist", "[]");
//     }
//     let cart = JSON.parse(localStorage.getItem("reservationlist"));
//     console.log(idx);
//     cart.splice(idx,1);
//     console.log(cart);
//     localStorage.setItem("reservationlist", JSON.stringify(cart));
//     let n = parseInt(JSON.parse(localStorage.getItem("reserNum")));
//     n --;
//     localStorage.setItem("reserNum", JSON.stringify(n))
//     checkOrder(idx);
//     showreservationbyid(idx);
//     alert("Reservation deleted.");
// }


// helper function for checkorder() to show the reservation info
function showreservationbyid(id) {
    console.log(id);
    let cart = JSON.parse(localStorage.getItem("reserlist"));
    let myreservation = document.getElementById("reser-info");
    myreservation.innerHTML = "";
    if (cart != null) {
        for (var i = 0; i < cart.length; i++) {
            if(cart[i].id ==id){
                let info =  "Reservation ID: " + cart[i].id + 
                            "<br>email:" +cart[i].emailnum +
                            "<br>Card number:"+cart[i].card +
                            "<br>date: " + cart[i].date + 
                            "<br>name: " + cart[i].firstname + " " + cart[i].secondname + 
                            "<br>party size: " + cart[i].partysize + 
                            "    location: " + cart[i].setlocate + 
                            "<br><button class=delReser id="+ cart[i].id +" onclick = deleteReser("+ cart[i].id +")> delete reservation</button>"+"<br><br>";
                myreservation.innerHTML += info;
                info = "";
            }
        }
    }
}

