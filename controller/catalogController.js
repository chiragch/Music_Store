var express = require('express');
var router = express.Router();
var itemDb = require('../utility/ItemDB');
var userDB = require('../utility/UserDB');
var bodyParser = require('body-parser');
var session = require('express-session');
var User = require('../model/User');
var UserProfile = require('../model/UserProfile');
var UserItem = require('../model/UserItem');
var ProfileController = require('./ProfileController');

router.use(bodyParser.json());

router.use(bodyParser.urlencoded({extended: false}));

var user = null;
var userProfile = null;

router.use(function getSession(req,res,next){
    if(req.session.theUser){
        user = req.session.theUser;
        userProfile = req.session.userProfile;
    }else{
        user = null;
        userProfile = null;
    }
    next();
});

router.all('/', function(req, res){
    var data = {
        title: 'Index',
        path: req.url,
        user: user
    };
    res.render('index',{data: data});
});

router.get('/categories',async function(req, res) {
    var itemData = await itemDb.getItems();
    var categories =await  itemDb.getCategories();
    var data= {
        title:'Categories',
        path: req.url,
        categories: categories,
        items: itemData,
        user: user
    };
    res.render('categories',{data: data});
});

router.get('/contact', function(req, res) {
    var data= {
        title:'Contact',
        path: req.url,
        user: user
    };
    res.render('contact',{data: data});
});

router.get('/about', function(req, res) {
    var data= {
        title:'About',
        path: req.url,
        user: user
    };
    res.render('about',{data: data});
});

router.get('/myItems',async function(req, res) {
    if (req.session.theUser) {
        var data = {
            title: 'myItems',
            path: req.url,
            user: user,
            userProfile: userProfile
        };
        res.render('myItems', {
            data: data
        });
    } else {
        var users = await userDB.getUsers();
        var user1 = users[Math.floor(Math.random() * users.length)];
        req.session.theUser = user1;
       // req.session.userProfile = userDB.getUserProfile(user1.userId);
        res.redirect('/myItems');
    }
});

router.get('/categories/item/:itemCode',async function(req, res) {
    var exist = await itemDb.isExist(req.params.itemCode);
    if(exist){
        var itemData = await itemDb.getItem(req.params.itemCode);
        var index = -1;
        if(req.session.userProfile){
            index = ProfileController.getSelectedItem(req.session.userProfile.userItemList, req.params.itemCode);
        }
        var data= {
            title:'Item',
            path: req.url,
            item: itemData,
            user: user,
            userProfile: userProfile,
            index: index
        };
        res.render('item',{data: data});
    }else{
        res.redirect('/categories');
    }
});

router.get('/categories/item/:itemCode/feedback',async function(req, res) {
    var itemData = await itemDb.getItem(req.params.itemCode);
    var data= {
        title:'Feedback',
        path: req.url,
        item: itemData,
        user: user
    };
    res.render('feedback',{data: data});
});

router.get('/*',function(req,res){
    var data= {
        title:'Error',
        path: req.url
    };
    res.render('error',{data: data});
});

module.exports = router;