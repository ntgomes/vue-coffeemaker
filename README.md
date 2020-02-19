# vue-coffeemaker
## Build Setup

First, using MySQL Workbench, create a MySQL local instance at localhost port 3306. The username should be root and the password can be anything you want. Then create a database schema and name it `cm-vue`<br><br>
Then, inside the vue-coffeemaker/src folder, create a folder called props. Inside that folder, create a file called `secureInfo.properties`. Copy the following contents into that file:
```properties
[sequelize]
db.password = myDatabasePassword
```
Replace `myDatabasePassword` with the password of your MySQL local instance that you created earlier.<br>
Finally, open Command Prompt/Terminal and navigate into vue-coffeemaker. Then run the following commands:

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

In a separate Command Prompt/Terminal window, run the follow commands in the same directory:
``` bash
node ./src/server
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
<hr>
Vue-CoffeeMaker is a simple single-page CRUD application that manages coffee recipes and inventory counts to a MySQL database. Once authenticated, users can update the inventory, add recipes, delete recipes, edit recipes, and make coffee orders using existing recipes and inventory counts.

This project is based on NCSU CSC326 staff's CoffeeMaker implementation from Spring 2020. Their original CoffeeMaker project was made using the following set of technologies:
  * AngularJS
  * Thymeleaf
  * Spring MVC
  * Hibernate ORM
  * MySQL
  * Apache Tomcat

While almost entirely different in code structure, Vue-CoffeeMaker intends to follow the functionality as the original CoffeeMaker implementation while using a different set of technologies for frontend and backend:
  * VueJS
  * BootstrapVue
  * Node.js
  * Sequelize.js
  * Finale.js
  * MySQL
  * Okta JWT Authentication

