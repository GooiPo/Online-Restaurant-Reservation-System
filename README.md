# Online-Restaurant-Reservation-System

## Table of contents
* [1. Product Vision](#1-product-vision)
* [2. Architecture](#2-architecture)
* [3. Personas](#3-personas)
* [4. Epics](#4-epics)
* [5. User Stories implemented](#5-user-stories-implemented)
* [6. Quality Assurance Plan](#6-quality-assurance-plan)
* [7. Acceptance test results](#7-acceptance-test-results)

## 1. Product Vision

* The product we have developed is a restaurant website. The main user group are the customers and the restaurant manager or employee.  From the customer's perspective, they can browse information about this restaurant and make reservations. Each reservation included their ordered foods which can be modified after the reservation is made. From the restaurant manager perspective, they can see the reservation in a list form. If some reservations are invalid, they can modify or even cancel it. On the other hand, the manager can modify the menu page information. Add or delete the menu item, change the menu item image exc. 

* For more detail check out out project [Domain Diagram, ](https://git.cs.usask.ca/cmpt370/cmpt370-unname-project/-/wikis/Milestone-4)[Class Diagram, ](uploads/5ebba3b5ff41c65a7d548411843c1a8b/CMPT370_M6_ClassDiagram.pdf)[Sequence Diagram](uploads/671d60a65f2aaff010294a62d60c1a51/CMPT370_M6__Interaction_Diagram.pdf)

## 2. Architecture
* As the picture showed, We used the standard web architecture - restful architecture. 
* The most important parts are the webserver, the API server, and the database server. 
* The web server is our front-end. it contains all HTML, CSS, and javascript files, deployed on an Nginx server.
* And our backend contains the API server, which uses the flask package in python as the framework and the database created by MySQL. In our database, it stores the reservation and menu information.
* The connection between the front-end and the database is implemented by the API server. 
* Once the Frontend sends a request to the API server, the API server will respond a JSON file to the User (Browser), 
which means, the API server will transfer the data in the database to a JSON file, and send it to local.
* In the same way, Using the ‘post’ method, we could also update the data to the database, which the user or managers created. This time, the API server will transfer the local JSON data to objects and use SQLite language to store them in the database.
.
 * In general, our system architecture follows the restful architectural style. Using API server to implement the connection between front-end and back-end.  

* [Architecture](https://git.cs.usask.ca/cmpt370/cmpt370-unname-project/-/wikis/uploads/9a5b22b454eb53ff86fcfad8eedce9e9/CMPT370_M5.pdf)

## 3. Personas

* We collected the personas and roles base on following people:
  * Mario - employee in the restaurant
  * Jie Ge - The manager of the restaurant
  * Luigi - Customer
  * Shawn - Manager of the Restaurant
  * Bob - employee in the restaurant

## 4. Epics
* [Epics Graph](uploads/041d3a2ba3c90b6f5f51c15b0670a5be/CMPT355_M5_EPICS_GRAPH.pdf)
* As Mario, I want the reservation system to check the user type-in.
* As a worker in the restaurant, the website can tell people what this restaurant about. Provide information about the restaurant.

* As Jie Ge, I wish I can use this website to let more people know about this wonderful place so that more people will come here. 
* As Jie Ge, I wish I can write about this restaurant so that I could update the website every week.

* As the user, I hope I can get information about the menu
* As Luigi, I hope the Website can provide restaurant information.

* As Shawn, I want to manage the reservations so that the efficiency will be increased.
* As Shawn, I want to be able to edit the existing information about the restaurant so that it is convenient to update the information in time.

* As Bob, I want to be able to check the information about the restaurant so that the information can help me make a decision about whether to choose it.
* As Bob, I want to be able to edit my reservation information so that it is good for updating my reservation in time for the recent situation.

## 5. User Stories implemented

1. checking the reservation system with user type-in

2. Pop-up box on invalid enter

3. Information display on the page

4. Menu bar/Navigation bar

5. Animation layout and performance of the page

6. Connection/anchor connection/operation smoothy

7. Available to check/ change the reservation info (with reserve id)

8. The page is robust, can perform well on different environments  (different browsers, under different resolution)

9. Administer can perform easy steps to updating info onto the page(menu, info, special)

10. The website can be searched with certain keywords

11. Administer can perform easy steps to updating Reservation Storage

12. Set up the server and know how to operate it

## 6. Quality Assurance Plan

1. We add some comments in the js files, each function has a description comments.
2. All the modifying function could modify the database now, instead of just changing local
3. Functions needed to be implemented in the API part have been updated.
4. Most bad code formats have been updated.
5. Functions that could modify the database(update data or insert new data) could throw exceptions if something goes wrong.
Test [report](uploads/1fe241a0f3eb128278aae90ccd0ec13e/test.pdf) after Code inspection. 

## 7. Acceptance test results

**1. As a web user,**
* I wish the website could show me what this restaurant is. So that users could find some information about the restaurant that they want. Scenario: The user opened the restaurant website. Given that I am in the role of manager or customer user When I am using the website. Then the homepage will show a navigation bar at the top of the page. When I click the options, like “menu”, the homepage will jump to the menu page, and I will see the food info.

* On the home page, users can easily find information including its description and location about the restaurant. The navigation bar is done, and the user can use it to jump to different pages. This is acceptable and all of the requirements are met.

**2. As a web user,**
* I wish the website could show me what food the restaurant has online. So that I could make online orders instead of calling the restaurant Scenario: the user opened the ‘menu’ page given that the menu page will show the food with image, name, price, ingredient, and detailed description. When I click the button ‘order’ next to the food, this food will be added to the shopping cart showing after the menu list. Then if I want to delete food in the shopping cart, just go to the shopping cart block and click the ‘delete’ button next to that food. When I type my reservation id in the type-in box at the bottom of this page and click ‘submit’, my order will be sent to the server.

* All functions described above have been completed and implemented.
The menu page displays menu items correctly.
Menu items can be ordered along with the reservation.
Ordered foods can be removed when reservation is made.

**3. As a website user,** 
* I want to see some error notifications when I create my reservation incorrectly
So that I notice it soon and do it again.
Scenario: user forgot typing some information when they created a reservation
Given that I am in the role of registered or guest user
When I open the “reservation” page and submit  my reservation by click “submit”
Then a pop-up box jumped out, it said that “creating reservation failed, missing some info ”
After I close that box, I could create a new reservation and don't need to delete the wrong one 

* All functions described above have been completed and implemented. Once a user misses some important type-in info, the reservation won’t be created. Customers could see their reservations on the check-order page. They could delete their reservation as they want, or ask the manager to help them.

**4. As the restaurant manager,** 
* I want to see some Animates or short videos about the restaurant on my homepage
So that the fancy homepage will attract more customers.
Scenario: User opens the homepage, an animate will be automatically played
Given: I am in the role of manager
When I open the homepage the system shows me a short video or an animate

* The animation or short video is not being implemented.
The homepage is implemented without animation or video but still attractive.

**5. As a website user**
* I want to able to check the food I ordered
So that I could delete it if it is not correct
Scenario: user searches for an order by its reservation id
Given that I am a role of registered or guest of user
When I open the “checkOrder” page
Then there is a type-in box asking for my reservation id
And in ‘checkOrder’ page it contains 2 blocks, including ordered food and ordered drinks
When I field the ‘type reservation id’ field with the reservation id in the center of the page
And I click the ‘submit’ button or press the enter key on the keyboard
Then the system shows food and drinks in the ‘my order’ block with the food/drink name and its price.

* All functions described above have been completed and implemented.
After the reservation is made, a reservation ID will generate. Customers can use this id to access their reservation so that they can cancel the food they order.

**6. As a website user**
* I want to check/ change the reservation info 
So that I could delete it if it is not correct
Scenario: user searches for a reservation by its reservation id
Given that I am a role of registered or guest of user
When I open the “reservation” page
Then there is a type-in box asking for my reservation id
And on the ‘reservation’ page it contains 2 blocks, including creating reservations and checking reservations.
When I field the ‘type reservation id’ field with the reservation id at the bottom of the page
And I click the ‘submit’ button or press the enter key on the keyboard
Then the system shows my reservation info after the type-in box
And if I want to delete that reservation, I could click the ‘delete’ button next to that reservation info

* All functions described above have been completed and implemented.
After reservation is made, a reservation ID will generate. Customers can use this id to access their reservation so that they can cancel the reservation they made.

**7. As the manager of the restaurant,**
* I want to see my web on different browsers
So that people could use it with the default browser, like IE
Scenario: User opens the web in IE / Chrome / Firefox / e.t.c.
Given that I am a role of a web user
When I open the homepage in different browsers, they could show the same things on the screen
Then, I click different options in the navigation bars, they will jump to the same pages/blocks
And ‘creating reservation’, ‘checking order’ and ‘submitting order’ all work well. 
When I go to the menu page, all the browsers could show me the menu list correctly.
