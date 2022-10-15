/*********************************************************************************
*  WEB322 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Eliza Weng Student ID: 106800204 Date: 2022/10/14
*
*  Online (Cyclic) Link: https://courageous-eel-cummerbund.cyclic.app
*
********************************************************************************/ 
var express = require("express");
const path = require("path");
const data = require("./blog-service.js");
var app = express();
var HTTP_PORT = process.env.PORT || 8080;
const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const upload = multer(); // no { storage: storage } since we are not using disk storage
cloudinary.config({
    cloud_name: 'dzapdrt5j',
    api_key: '446862876139938',
    api_secret: 'B2JYvCw62iiIvSi3zG6C1RJQOVA',
    secure: true
});

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

app.get("/posts", (req, res)=>{
    if(req.query.category){
        data.getPostsByCategory(req.query.category).then((data=>{    //then: callback function for case of promise
            res.json(data);
        })).catch(err=>{                    //catch: for reject case
            res.json({message:err});
        })
    }else if(req.query.minDate){
    data.getPostsByMinDate(req.query.minDate).then((data=>{    //then: callback function for case of promise
        res.json(data);
    })).catch(err=>{                    //catch: for reject case
        res.json({message:err});
    })}else{
    data.getAllPosts().then((data=>{    //then: callback function for case of promise
        res.json(data);
    })).catch(err=>{                    //catch: for reject case
        res.json({message:err});
    });
}
});

app.get("/blog", (req, res)=>{
    data.getPublishedPosts().then((data=>{
        res.json(data);
    })).catch(err=>{ 
        res.json({message:err});
    });
});

app.get("/categories", (req, res)=>{
    data.getCategories().then((data=>{
        res.json(data);
    })).catch(err=>{ 
        res.json({message:err});
    });
});

app.get("/posts/add", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/addPost.html"));
});

app.post("/posts/add", upload.single("featureImage"), (req,res)=>{
    if(req.file){
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );
    
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };
    
        async function upload(req) {
            let result = await streamUpload(req);
            console.log(result);
            return result;
        }
    
        upload(req).then((uploaded)=>{
            processPost(uploaded.url);
        });
    }else{
        processPost("");
    }

    function processPost(imageUrl){
        req.body.featureImage = imageUrl;

        data.addPost(req.body).then(post=>{
            res.redirect("/posts");
        }).catch(err=>{
            res.status(500).send(err);
        })
    }   
});

app.get("/posts/value", (req, res) => {
    data.getPostById().then((data=>{
        res.json(data);
    })).catch(err=>{ 
        res.json({message:err});
    });
});

data.initialize().then(function(){
    // setup http server to listen on HTTP_PORT
    app.listen(HTTP_PORT, onHttpStart);
}).catch(function(err){
    console.log("Cannot start server: " + err);
});