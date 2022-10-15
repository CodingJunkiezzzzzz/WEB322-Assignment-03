const fs = require("fs");

var posts = [];
var categories = [];

module.exports.initialize = function () {
  return new Promise((resolve, reject) => {
    fs.readFile("./data/posts.json", (err, data) => {
      if (err) {
        reject(err);
      } else {
        posts = JSON.parse(data);
        
        fs.readFile("./data/categories.json", "utf8", (err, data) => {
          if (err) {
            reject(err);
          } else {
            categories = JSON.parse(data);
            resolve();
          }
        });
      }
    });
  });
};

module.exports.getAllPosts = function () {
  return new Promise((resolve, reject) => {
    (posts.length > 0) ? resolve(posts): reject("no results returned");
  });
};
module.exports.getPostsByCategory = function (category) {
  return new Promise((resolve, reject) => {
    let foundPosts = [];
    for(let i=0; i < posts.length; i++){
      if(posts[i].categories == category){
        foundPosts = posts[i];
      }
    }
    if(!foundPosts){
      reject("no results returned");
    }
    resolve(foundPosts);
  });
};
module.exports.getPostsByMinDate = function (minDateStr) {
  return new Promise((resolve, reject) => {
    let foundPosts = [];
    for(let i=0; i < posts.length; i++){
      if(new Date(posts[i].postDate) >= new Date(minDateStr)){
        foundPosts = posts[i];
    }
  }
    if(!foundPosts){
      reject("no results returned");
    }
    resolve(foundPosts);
  });
};
module.exports.getPostById = function (id) {
  return new Promise((resolve, reject) => {
    let foundPosts = [];
    for(let i=0; i < posts.length; i++){
      if(new posts[i].id==id){
        foundPosts = posts[i];
    }
  }
    if(!foundPosts){
      reject("no results returned");
    }
    resolve(foundPosts);
  });
};

module.exports.getPublishedPosts = function () {
  return new Promise((resolve, reject) => {
    (posts.length > 0)? resolve(posts.filter(posts => posts.published)):reject("no results returned");   //filter: shallow copy of filtered element 

    // var filteredPosted = [];
    // for (let i = 0; i < posts.length; i++) {
    //   if (posts[i].published == true) {
    //     filteredPosted.push(posts[i]);
    //   }
    // }
    // if (filteredPosted.length == 0) {
    //   reject("No published posts found");
    // } else {
    //   resolve(filteredPosted);
    // }
  });
};

module.exports.getCategories = function () {
  return new Promise((resolve, reject) => {
    (categories.length > 0)? resolve(categories):reject("no results returned");

    // if (categories.length == 0) {
    //   reject("File is empty, no categories returned");
    // } else {
    //   resolve(categories);
    // }
  });
};

module.exports.addPost = function (postData) {
  return new Promise((resolve, reject) => {
    postData.id = posts.length + 1;
    postData.published = (postData.published)?true:false;   //checked or not
    posts.push(postData);
    resolve();
  });
};
