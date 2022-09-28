/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Eliza Weng Student ID: 106800204 Date: 2022/09/30
*
*  Online (Cyclic) Link: ________________________________________________________
*
********************************************************************************/ 
var express = require("express");
const path = require("path");
var app = express();
var HTTP_PORT = process.env.PORT || 8080;

app.use(express.static('public'));

function onHttpStart(){
    console.log("Express http server listening on " + HTTP_PORT);
}
// setup a route to the default page
app.get("/", (req, res) => {
    res.redirect("/about");
});

// setup a route to the about path
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);