const fs = require("fs");

var posts = [];
var categories = [];


module.exports.initialize = function(){   
    return new Promise((resolve, reject)=>{
        fs.readFile('./data/posts.json', (err, data)=>{ 
            if(err){
                reject(err);
            }else{
                posts = JSON.parse(data); 
                resolve();
            }
        })       
    })
}

module.exports.getAllPosts() = function(){
    return new Promise((resolve,reject)=>{
        if(posts.length == 0){
            reject("File is empty, no posts returned");
        }else{
            resolve(posts);
        }
    })
}

module.exports.getPublishedPosts() = function(){
    return new Promise((resolve,reject)=>{
        var filteredPosted = [];
        for(let i = 0; i < posts.length; i++){
            if(posts[i].published == true){
                filteredPosted.push(posts[i]);
            }
        }
        if(filteredPosted.length == 0){
            reject("No published posts found");
        }else{
            resolve(filteredPosted);
        }
    })
}

module.exports.getCategories() = function(){
    return new Promise((resolve,reject)=>{
        if(categories.length == 0){
            reject("File is empty, no categories returned");
        }else{
            resolve(posts);
        }
    })
}