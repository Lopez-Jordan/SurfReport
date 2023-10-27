const router = require('express').Router();
const { User } = require('../models');      // CHECK IF IT WORKS

// post /signup
// allow creation of an account
router.post('/signup', async (req, res) => {
    try{
        // check for existing user
        let existingUser = await User.findOne({
            where : {
                name : req.body.name
            }
        });
        if (existingUser){
            res.status(200).json({message: 'User already exists with that name'})
        } else {
            let newUser = await User.create({
                name : req.body.name,
                password : req.body.password
            })
            req.session.save(() => {
                req.session.UserId = newUser.id;
                req.session.loggedIn = true;
                res.status(200).json(newUser);
            });
        }
    } catch (error){
        res.status(400).json({message : error})
    }
});

// post /login
    // allow login

// post /logout
    // allow logout




module.exports = router;