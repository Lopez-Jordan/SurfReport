const router = require('express').Router();
const { User } = require('../models');

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
router.post('/login', async (req,res) =>{
    try {
        let existingUser = await User.findOne({
            where : {
                name : req.body.name
            }
        });
        if (!existingUser){
            res.status(200).json({message: 'no user found with that name :/'});
            return;
        }
        let valid = await existingUser.checkPassword(req.body.password);
        if (valid){
            req.session.save(() => {
                req.session.UserId = existingUser.id;
                req.session.loggedIn = true;
                res.status(200).json({ user: existingUser});
              });
        } else {
            res.status(400).json({message: 'incorrect password'});
        }
    } catch (error){
        res.status(500).json(error);
    }
});

// post /logout
// allow logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

router.post('/logout', async (req,res)=>{
    if (req.session.loggedIn){
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
});

module.exports = router;