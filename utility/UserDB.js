var mongoose = require("mongoose");
var User = require('../model/User');
var UserProfile = require('../model/UserProfile');

var userDB = {};

userDB.getUsers = function () {
    return new Promise((resolve, reject) =>{
        User.find({}).then(function(users) {
            resolve(users);
        }).catch(function(err) {
            console.log("Error:", err);
            return reject(err); 
        });
    })
};

userDB.getUser =  function (userId) {
    return new Promise((resolve, reject) =>{
        User.findOne({userId: userId}).then(function(user) {
            resolve(user);
        }).catch(function(err) {
            console.log("Error:", err);
            return reject(err); 
        });
    })
};

userDB.getUserProfile = function (userId) {
    return new Promise((resolve, reject) =>{
        UserProfile.findOne({userId: userId}).then(function(userProfile) {
            resolve(userProfile);
        }).catch(function(err) {
            console.log("Error:", err);
            return reject(err); 
        });
    })
};

userDB.addUserItem = function(userId,userItem){
    return new Promise((resolve, reject) =>{
        UserProfile.findOneAndUpdate({userId: userId}, {$push: {userItemList: userItem}}, {new: true}).then(function(userProfile) {
            resolve(userProfile);
        }).catch(function(err) {
            console.log("Error:", err);
            return reject(err); 
        });
    })
};

userDB.addItemRating = function (itemCode, userId, rating){
    return new Promise((resolve, reject) =>{
        UserProfile.findOne({userId: userId}).then(function(userProfile) {
            for (let index = 0; index < userProfile.userItemList.length; index++) {
                if(itemCode==userProfile.userItemList[index].itemCode){
                    userProfile.userItemList[index].rating = rating;
                }
            }
            userProfile.save();
            resolve(userProfile);
        }).catch(function(err) {
            console.log("Error:", err);
            return reject(err); 
        });
    })
};

userDB.addMadeIt = function (itemCode, userId, madeIt){
    return new Promise((resolve, reject) =>{
        UserProfile.findOne({userId: userId}).then(function(userProfile) {
            for (let index = 0; index < userProfile.userItemList.length; index++) {
                if(itemCode==userProfile.userItemList[index].itemCode){
                    userProfile.userItemList[index].madeIt = madeIt;
                }
            }
            userProfile.save();
            resolve(userProfile);
        }).catch(function(err) {
            console.log("Error:", err);
            return reject(err); 
        });
    })
};

userDB.deleteUserItem = function(itemCode, userId){
    return new Promise((resolve, reject) =>{
        UserProfile.findOne({userId: userId}).then(function(userProfile) {
            for (let index = 0; index < userProfile.userItemList.length; index++) {
                if(itemCode==userProfile.userItemList[index].itemCode){
                    userProfile.userItemList.splice(index, 1);
                }
            }
            userProfile.save();
            resolve(userProfile);
        }).catch(function(err) {
            console.log("Error:", err);
            return reject(err); 
        });
    })
};

module.exports = userDB;



