var reservationurl = 'http://awsl.hestech.cn/API/reservation'
// var reservationurl = 'http://127.0.0.1:5000/reservation'

// get reservation info from server
function loadReservation() {
    axios.get(reservationurl)
    .then(function(res){
        // handle success
        let reserlist =res.data;
        localStorage.setItem('reserlist',JSON.stringify(reserlist));
        showreservation();
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
    loadReservation();
 } 


/***
 * a function for check some special value in a String
checkString: String
aimChar: character
return: A boolean value
***/
function checkValue(checkString,aimChar){
    test_temp = false;
    for (var i =0;i<checkString.length;i++){
        if(checkString[i]==aimChar){
            test_temp=true;
        }
    }
    return test_temp;
}


// create reservation
function storeReservation() {
    
    // read user input
    var cardnum = parseInt(document.getElementsByTagName("input").cardnum.value);
    var password = document.getElementsByTagName("input").psw.value;
    var email = document.getElementsByTagName("input").email.value;
    var exdate = document.getElementsByTagName("input").exDate.value;
    var scode = document.getElementsByTagName("input").scode.value;
    var firstNam = document.getElementsByTagName("input").fname.value;
    var secondNam = document.getElementsByTagName("input").lname.value;
    var size = parseInt(document.getElementsByTagName("input").partysize.value);
    var locate = document.getElementsByTagName("input").seats.value;
    var time = document.getElementsByTagName("input").input_date.value;
    var id = parseInt(JSON.parse(localStorage.getItem("reservationid")));
    
    if (firstNam.length > 0 && secondNam.length > 0 && time.length > 0 && size > 0 &&
        cardnum > 0 && password.length > 0 && checkValue(email,'@') && exdate.length > 0 && scode.length > 0)
    {
        // axios.post('http://127.0.0.1:5000/reservation/add', {
        axios.post('http://awsl.hestech.cn/API/reservation/add', {
            card: cardnum,
            emailnum:email,
            psw:password,
            exdate:exdate,
            scode:scode,
            date: time,
            firstname: firstNam,
            secondname: secondNam,
            partysize: size,
            setlocate: locate
        })
        .then(function(response) {
            console.log("OK");
            console.log(response);
            alert("Reservation created! \n Your reservation id: " + response.data[0]);
        })
        .catch(function(error) {
            console.log(error);
            alert("Creating reservation failed, some info is missing or invalid.")
        });
    }
    else
    {
        alert("Creating reservation failed, some info is missing.")
    }
}

// show the reservation on the page
function showreservation() {

    let cart = JSON.parse(localStorage.getItem("reserlist"));
    let myreservation = document.getElementById("reser-info");
    myreservation.innerHTML = "";
    if (cart != null) {
        for (var i = 0; i < cart.length; i++) {
            let info = "Reservation ID: " + cart[i].id + 
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

// delete the speific reservation by id in the databse 
function deleteReser(id){
    var index = parseInt(id);
    console.log(index);
    axios.get('http://awsl.hestech.cn/API/reservation/delete/'+ index)
    .then(function(response) {
    console.log("OK");
    console.log(response);
    loadReservation();
    alert("Reservation deleted successfully!");
    })
    .catch(function(error) {
        console.log(error);
    });
}

// delete all reservation
function clearReser(){
    axios.get('http://awsl.hestech.cn/API/reservation/deleteall')
    .then(function(response) {
    console.log("OK");
    console.log(response);
    loadReservation();
    alert("All Reservation deleted successfully!");
    })
    .catch(function(error) {
        console.log(error);
    });
}







// function storeReservation() {
    // if (localStorage.getItem("reservationlist") === null) {
    //     localStorage.setItem("reservationlist", "[]");
    // }
    // if (localStorage.getItem("reservationid") === null) {
    //     localStorage.setItem("reservationid", "1");
    // }
//     var cardnum = parseInt(document.getElementsByTagName("input").cardnum.value);
//     var password = document.getElementsByTagName("input").psw.value;
//     //incorrect info notisfication when the password less than 1
//      if(password.length <= 1){
//         console.log("The password is invalid, that less than 1 character");
//     }
//     var email = document.getElementsByTagName("input").email.value;
//     if(!checkValue(email,'@')){
//         console.log("The email format is invalid");
//     }
//     var exdate = document.getElementsByTagName("input").exDate.value;
//     var scode = document.getElementsByTagName("input").scode.value;
//     var firstNam = document.getElementsByTagName("input").fname.value;
//     var secondNam = document.getElementsByTagName("input").lname.value;
//     var size = parseInt(document.getElementsByTagName("input").partysize.value);
//     var locate = document.getElementsByTagName("input").seats.value;
//     var time = document.getElementsByTagName("input").input_date.value;
//     var id = parseInt(JSON.parse(localStorage.getItem("reservationid")));
    
//     console.log(cardnum,email,password,exdate,scode,time,firstNam,secondNam,size,locate,id);
//     if (firstNam.length > 0 && secondNam.length > 0 && time.length > 0 && size > 0 &&
//         cardnum > 0 && password.length > 0 && checkValue(email,'@') && exdate.length > 0 && scode.length > 0)  
//         {
//         let reservation = {
//             card: cardnum,
//             emailnum:email,
//             psw:password,
//             exdate:exdate,
//             scode:scode,
//             date: time,
//             firstname: firstNam,
//             secondname: secondNam,
//             partysize: size,
//             setlocate: locate,
//             id: id,
//             food:[],
//             drink:[]
//         };
//         id ++;
//         localStorage.setItem("reservationid",JSON.stringify(id));
//         let cart = JSON.parse(localStorage.getItem("reservationlist"));
//         cart.push(reservation)
//         localStorage.setItem("reservationlist", JSON.stringify(cart));
//         let numReser = JSON.parse(localStorage.getItem("reserNum"));
//         numReser++;
//         localStorage.setItem("reserNum", JSON.stringify(numReser));
        
//         console.log("***Testing for inputting reservation information.***");
//         console.log(reservation);

//         alert("Reservation created, Reservation id: "+ reservation.id);
//     }else{
//         alert("Creating reservation failed, some info is missing.")
//     }
    
// }


// function deleteReser(idx){
//     if (localStorage.getItem("reservationlist") === null) {
//         localStorage.setItem("reservationlist", "[]");
//     }
//     let cart = JSON.parse(localStorage.getItem("reservationlist"));
    
//     console.log("***Testing for deleteReser(idx)***");
//     console.log("1. Testing before deleting");
//     console.log(cart);
    
//     cart.splice(idx,1);
    
//     console.log("2. Testing after deleting");
//     console.log(cart);
    
//     localStorage.setItem("reservationlist", JSON.stringify(cart));
//     let n = parseInt(JSON.parse(localStorage.getItem("reserNum")));
//     n --;
//     localStorage.setItem("reserNum", JSON.stringify(n))
//     showreservation();
//     alert("Reservation deleted.");
// }

// function clearlocal(){
//     localStorage.clear();
//     console.log("***Testing for clearlocal(). (Should be null.)***");
//     console.log(localStorage.getItem("reservationlist"));
//     showreservation();
// }



