#meanauthapp

#Tutorial 1

Rest Api – nodejs/express
token gen and auth.
CORS – cross origin resource sharing ( frontend on angularjs and backend on nodejs, both have different oringin, any req from front end requires CORS enabling)
Mongoose ODM(obj doc mapper)

###Frontend
* Angular 2 / Angular CLI (stable)
* Angular Router, hTTP module 
* Angular-JWT ( handling tokens, fetch token from server and store in database, jwt checks if it is expired or not )
* Auth guard 
*Angular flash message module ( pop up msg after log out )
* comply and deploy

#Tutorial 2
####Installing nodejs
+++++++++++++++
** https://tecadmin.net/install-latest-nodejs-npm-on-ubuntu/ **
sudo apt-get install python-software-properties
$ curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install nodejs
####Installing Mongodb
* ** https://www.howtoforge.com/tutorial/install-mongodb-on-ubuntu-16.04/ **
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get install -y mongodb-org
####start mongodb service
* `sudo service mongod start`
####check the running server
 * `netstat -plutn`
 * To se the changes getting reflected on making request at the hosted port install `nodemon`

* use `nodemon filename.js` instead of ` node filename.js `



##Routing
- When the user types localhost/user/xyz, we need to create a route 
 check out folder route/user.js
  - A router object is created and various method like 'get', 'post' , 'del' is used with first parmeter as the name of the route and the second  is a callback.
  
- then the object routes is expoted to be used in other files
- In the file app.js we use the settings we had done in routes/user.js by
```
	const user = require('./routes/users.js');
	app.use('/USERS' , user);
	
```
##Connecting server to the MongoDb
```
//Connecting server to Db Mongo ========================
const mongo = require('mongoose');
const config = require('./config/database.js');
mongo.connect(config.db_path);//param will contain the path of database
mongo.connection.on('connected',()=>{
  console.log("Db connected");
})
mongo.connection.on('error',(err)=>{
  console.log("Db err"+err);
})
```
#T3
###creating a database model
here we will be creating a schema of the databse
- checkout models folder  


#T4
####Frontend
Install Angular-cli 
- It is a tool for developing angular more conveniently

`
	 sudo npm install -g angular-cli 
`
` ng new name_of_file `
the above line creates the folder containing allt he necessary dependencies and files needed for angular of name name_of_file .

- Checkout that the same thing was done in angular tutorial by cloning the git repo.

To run the applicaation go the name_of_file folder and type ` ng serve` this will host the website on the port 4200

#t5
* use cmd ` ng g component comp_name ` to add component navbar, similarly
* using ng cmd it automaticaly adds to app.module.ts

- we import RouterMOdule 
- and then we mntion the module in @NgModule wirh the routes object as param 
- after that usr ` <router-outlet></router-outlet> ` to enable routes

- use ` [routerLink]="['/login']" ` instead of href for routing 

#t6
- use [(ngModel)] = variable_name and name = variable_name to store the user input on the form in the variable variable_name 
- check register.component.html 
- after that define the variable in te class in .ts file
- make a event litener attached to submit button that stores the user input to the variable name 
- here we gonna make an object which can be paased on to various function 
```
	const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }
```
####creating service
- Now we need to validate fields in the form so we will create a service
` ng g service service_name `
- by default ng doesnt add the service to app.module.ts 
- so import the class andadd the class to the provider array 

- In the file .ts of validate.service add fns that takes an object (here 'user' containing form data ) 

####using service 
-To use service validate 
- we need to pass the class as an argument is the constructor (pta nhi q)



#T9
angula2-jwt 
check if we are logged in by checking if token has expiresd or not 
- also we can make the links showor ide depending upon logged in and out
- import canActivate from the Router and put it in the router where we have to put it
- here we put it in the dashbosrd
- install in the src folde rof angular2 
` npm install angular2-jwt --save`

#Social strategy
`npm install passport-facebook`
`npm install passport-google` 
server wale folder me type krna h


#Integrating sequelize
In paksage.json
  "sequelize": "^3.30.4"
  "mysql": "^2.11.1",

###starting Mysql
`mysql -u root -p` 
pwd - 1234



 