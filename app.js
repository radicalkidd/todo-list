//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//1. create a database
mongoose.connect("mongodb+srv://Admin:test123@cluster0-uk7k4.mongodb.net/todolistDB", {useNewUrlParser: true});

//2. create new Schema
const itemsSchema = {
  name: String
}

//3. create new mongoose model based on the schema
const Item = mongoose.model("Item", itemsSchema);

//4. create 3 new item documents
const item1 = new Item({
  name: "Wake Up"
});

const item2 = new Item({
  name: "Eat"
});

const item3 = new Item({
  name: "Sleep"
});

const defaultItems = [item1, item2, item3]

const listSchema = {
  name: String,
  items: []
}

const List = mongoose.model("List", listSchema);

//5. insert documents into db
// Item.insertMany(defaultItems, function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully Inserted documents into Items Collection")
//   }
// });


app.get("/", function(req, res) {

Item.find({}, function(err, foundItems){

  if (foundItems.length === 0) {
    Item.insertMany(defaultItems, function(err){
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully Inserted documents into Items Collection")
      }
    });
    res.redirect("/");
  } else {
    res.render("list", {listTitle: "Today", newListItems: foundItems});
  }

});
});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });
  
  if (listName === "Today") {
    item.save();
    //to show on to our list at homepage
    res.redirect("/");
  } else {
    List.findOne({name: listName}, function(err, foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});

app.get("/:customListName", function(req, res) {
  const customListName = _.capitalize(req.params.customListName);
  

  List.findOne({name: customListName}, function(err, foundList) {
    if(!err){
      if (!foundList) {
        //Create a new list
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        //show an existing list
        res.render("list", {listTitle: foundList.name, newListItems: foundList.items})
      }
    }
  });

});

app.post("/delete", function(req, res) {
  const checkedItemId = req.body.checkBox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully deleted item")
      }
    });
    res.redirect("/")
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList) {
      if(!err) {
        res.redirect("/" + listName);
      }
    });
  }

});

app.get("/about", function(req, res){
  res.render("about");
});

let port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Server started successfully!");
});
