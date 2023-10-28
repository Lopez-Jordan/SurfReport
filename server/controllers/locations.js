const router = require('express').Router();
const { User, Location } = require('../models');

// get /locations
    // Retrieves all locations associated with a specific user.  (Send the user ID through the req.body)
router.get('/locations', async (req,res)=> {
    try { 
        let userId = req.session.UserId;
        let locationData = await Location.findAll({
            where: {
                userId : userId
            }
        })
        if (locationData.length !== 0){
            res.status(200).json(locationData);
        } else {
            res.status(200).json({message : 'no location data'});
        }
    } catch (error){
        res.status(400).json(error);
    }
});

// post /locations
    // Allows a user to create a new location associated with their account. (Send the user ID through the req.body)
// update /locations/:locationId 
    // Allows a user to update an existing location associated with their account. (Send the user ID through the req.body)
// delete /locations/:locationId
    // Allows a user to delete an existing location associated with their account. (Send the user ID through the req.body)

module.exports = router;
