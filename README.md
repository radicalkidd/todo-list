Todo-List 

This is a todo list web application. You can either stay on the home route or make your own route for which day you'll be making the todo list for. For an example you want a todo list for work. Change your url end to "/work" and your list will be saved on that route. You can create and delete todos as you go. 


Getting Started with MAC
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system. 

Prerequisites

a. In terminal > project folder directory "npm install boostrap ejs express lodash mongoose" to install dev-dependencies 
b. To see the mongoDB shell you need to install it.
    Mongo Shell with HomeBrew installation guide: https://treehouse.github.io/installation-guides/mac/mongo-mac.html
    Install and Run MongoDB with Homebrew

Open the Terminal app and type brew update.
After updating Homebrew brew install mongodb
After downloading Mongo, create the “db” directory. This is where the Mongo data files will live. You can create the directory in the default location by running mkdir -p /data/db
Make sure that the /data/db directory has the right permissions by running

> sudo chown -R `id -un` /data/db
> # Enter your password

Run the Mongo daemon, in one of your terminal windows run mongod. This should start the Mongo server.
Run the Mongo shell, with the Mongo daemon running in one terminal, type mongo in another terminal window. This will run the Mongo shell which is an application to access data in MongoDB.
To exit the Mongo shell run quit()
To stop the Mongo daemon hit ctrl-c

------------------------------------------------------------------------------------------------------------------------------

1. To get started run "nodemon app.js" in your terminal to listen on to port 3000
2. Visit localhost:3000 on your browser to visit local application
3. This app uses MongoDB as it's database. As you're creating and deleting items on the web application itself. MongoDB is doing the CRUD operation for you.
    a. To see this you can simply run your mongo shell
    b. Use mongo shell commands to see your database and data entries as you add and update the todolist on the app.
        https://docs.mongodb.com/manual/crud/
        
This App is Built With
EJS - HTML markup with javascript
Bootstrap - Library used for layout 
CSS - Page styling
Node.js - Server-side 
MongoDB - database
Mongoose - Along with MongoDB, An Object Data Modeling Asynchronous tool used in Node JS.

License
This project is licensed under the MIT License - see the LICENSE.md file for details
