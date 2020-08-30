const express = require('express');
const app = express();
const user = require('./../models/User');

//registrar usuario
app.post('/user/register', async (req, res) => {
    const {name, email, password} = req.body;
    const newUser = user({name, email, password});
    newUser.save((err, userDB) => {
        if(err){
            return res.status(400).json({
                'success': false,
                'message' : err,
                'data' : []
            });
        }
        return res.json({
            'success': true,
            'message' : 'User created successfully',
            'data' : [userDB]
        })
    });
});


app.post('/user/login', (req, res) => {
    let data = req.body;
    const { name, password } = data;

    user.find({ name, password }).exec((err, userval) => {

        if (!userval.length) {
            return res.json({
                'success': false,
                'message' : 'User or password incorrect'

            })
        }

        return res.json({
            'success': true,
            'message' : 'User found. Your information is:',
            'data': [userval]

        })
    })
})

module.exports = app;