const router = require('express').Router();
const { User } = require('../models');


// route just to check if the user is logged in or not
router.get('/api/login', async (req, res) => {
    try {
        if (req.session.loggedIn){
            res.status(200).json({
                loggedIn: true,
                name: req.session.name
            });
        } else {
            res.status(200).json({loggedIn: false});
        }
    } catch (error) {
        res.status(500).json(error)
    }
});

// post /signup
// allow creation of an account
router.post('/api/signup', async (req, res) => {
    try{
        // check for existing user
        let existingUser = await User.findOne({
            where : {
                name : req.body.name
            }
        });
        if (req.body.name == "") {
            res.status(400).json({error: "You must input a username"})
        }
        else if (existingUser){
            res.status(400).json({error: 'User already exists with that name :/'})
        }
        else if (req.body.password === ""){
            res.status(400).json({error: "You must input a password"})

        }
        else {
            let newUser = await User.create({
                name : req.body.name,
                password : req.body.password
            })
            req.session.save(() => {
                req.session.UserId = newUser.id;
                req.session.loggedIn = true;
                req.session.name = newUser.name;
                res.status(200).json(newUser);
            });
        }
    } catch (error){
        res.status(400).json({message : error})
    }
});

// post /login
// allow login
router.post('/api/login', async (req,res) =>{
    try {
        let existingUser = await User.findOne({
            where : {
                name : req.body.name
            }
        });
        if (!existingUser) {
            res.status(400).json({ "error": 'No user found with that name.' });
            return;
        }
        
        let valid = await existingUser.checkPassword(req.body.password);
        if (valid) {
            req.session.save(() => {
                req.session.UserId = existingUser.id;
                req.session.loggedIn = true;
                req.session.name = existingUser.name;
                res.status(200).json({ user: existingUser });
            });
        } else {
            res.status(400).json({ "error": 'Incorrect password.' });
        }
    } catch (error){
        res.status(500).json(error);
    }
});

// post /logout
// allow logout

router.post('/api/logout', async (req,res)=>{
    if (req.session.loggedIn){
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
});

module.exports = router;