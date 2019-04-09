var express = require('express');
var router = express.Router();
var userDB = require('../utility/UserDB');
var itemDb = require('../utility/ItemDB');
var bodyParser = require('body-parser');
var session = require('express-session');
var User = require('../model/User');
var UserProfile = require('../model/UserProfile');
var UserItem = require('../model/UserItem');

router.use(bodyParser.json());

router.use(bodyParser.urlencoded({extended: false}));

router.post('/login',async function(req, res){
    if(req.session.theUser){
        res.redirect('/');
    }else{
        var users =await  userDB.getUsers();
        var user = users[Math.floor(Math.random()*users.length)];
        req.session.theUser = user;
        req.session.userProfile = await userDB.getUserProfile(user.userId);
        res.redirect('/myItems');
    }
});

router.post('/logout', function(req, res){
    if(req.session.theUser){
        req.session.theUser = null;
        res.redirect('/');
    }
});




router.get('/categories/item/saveIt/:itemCode',async function (req, res) {
    var index = -1;
    if (req.session.theUser) {
        index = getSelectedItem(req.session.userProfile.userItemList, req.params.itemCode);
        if (index == -2) {
            var itemData = await itemDb.getItem(req.params.itemCode);
            var userItem = {
                itemCode: itemData.itemCode, 
                itemName: itemData.itemName, 
                catalogCategory: itemData.catalogCategory, 
                rating: 0, 
                madeIt: false
            };
            var userProfile = await userDB.addUserItem(req.session.theUser.userId,userItem);
            req.session.userProfile = userProfile;
            console.log('seesion userprofile', req.session.userProfile);
            res.redirect('/myItems');
        } else {
            console.log('Item already present');
            res.redirect('/myItems');
        }
    } else {
        res.redirect('/categories/item/' + req.params.itemCode);
    }
});

router.post('/update/feedback/:itemCode',async function (req, res) {
    var index = -1;
    var itemCode = -1;
    if(req.body.itemCode == req.body.itemList){
        itemCode = req.body.itemCode;
        if (req.session.theUser) {
            index = getSelectedItem(req.session.userProfile.userItemList, itemCode);
            if (index == -2) {
               
                res.redirect('/myItems');
            } else {
                if (req.body.feedbackHidden == 'rating') {
                    console.log(req.body.rating);
                     var userProfile = await userDB.addItemRating(itemCode, req.session.theUser.userId, parseInt(req.body.rating, 10));
                    req.session.userProfile = userProfile;
                    res.redirect('/myItems');
                } else if (req.body.feedbackHidden == 'madeIt') {
                    console.log(req.body.madeItRadio);
                    if(req.body.madeItRadio != 'undefined'){
                          var userProfile = await userDB.addMadeIt(itemCode, req.session.theUser.userId, JSON.parse(req.body.madeItRadio));
                            req.session.userProfile = userProfile;
                          res.redirect('/myItems');
                    }
                    var userProfile = await userDB.addMadeIt(itemCode, req.session.theUser.userId, JSON.parse(req.body.madeItRadio));
                    req.session.userProfile = userProfile;
                    res.redirect('/myItems');
                } else {
                    console.log('Incorrect paramter');
                    res.redirect('/categories/item/' + req.params.itemCode + '/feedback');
                }
            }
        } else {
            res.redirect('/categories/item/' + req.params.itemCode + '/feedback');
        }
    }else{
        res.redirect('/categories/item/' + req.params.itemCode + '/feedback');
    }
});


router.get('/myItems/delete/:itemCode',async function(req, res){
    var temp = -1;
    if(req.session.theUser){
        temp = getSelectedItem(req.session.userProfile.userItemList, req.params.itemCode);
        if(temp==-2){
            console.log('Item not present in the users profile');
            res.redirect('/myItems');
        }else{
            var userProfile = await userDB.deleteUserItem(req.params.itemCode,req.session.theUser.userId);
            req.session.userProfile = userProfile;
            res.redirect('/myItems');
        }
    }else{
        res.redirect('/');
    }
});


 var getSelectedItem = function (itemList, itemCode) {
    for (var index = 0; index < itemList.length; index++) {
        if (itemList[index].itemCode == parseInt(itemCode, 10)) {
            return index;
        }
    }
    return -2;
};

module.exports.getSelectedItem = getSelectedItem;

module.exports.router = router;