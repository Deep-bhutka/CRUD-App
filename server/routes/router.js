const express = require('express');
const axios = require('axios')
const route = express.Router()
const controller = require('../controller/controller');

route.get('/',(eq,res)=>{
    axios.get('http://localhost:4000/api/users')
        .then(function(response){
            res.render('index', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })
});

route.get('/add-user',(req,res)=>{
    res.render('add_user');
})

route.get('/update-user',(req,res)=>{
    axios.get('http://localhost:4000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
})


route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);


module.exports = route