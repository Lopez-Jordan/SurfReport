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
router.post('/locations', async (req, res) => {
    try{
        let userId = req.session.UserId;
        let newLocation = await Location.create({
            title : req.body.title,
            description : req.body.description,
            stars : req.body.stars,
            lat : req.body.lat,
            long : req.body.long,
            userId : userId
        })
        res.status(200).json(newLocation );
    } catch (error){
        res.status(500).json({message : error});
    }
});

// update /locations/:locationId 
    // Allows a user to update an existing location associated with their account. (Send the user ID through the req.body)
    router.put('/locations/:id', async (req, res) => {
        try {
            const locationId = req.params.id;
            const currLocation = await Location.findOne({
                where: {
                    id: locationId
                }
            });
            if (!currLocation) {
                return res.status(404).json({ message: 'Location not found' });
            }
            const locationUpdates = {};
            if (req.body.title && req.body.title !== currLocation.title) {
                locationUpdates.title = req.body.title;
            }
            if (req.body.description && req.body.description !== currLocation.description) {
                locationUpdates.description = req.body.description;
            }
            if (req.body.stars && req.body.stars !== currLocation.stars) {
                locationUpdates.stars = req.body.stars;
            }
            const updatedLocation = await currLocation.update(locationUpdates);
            res.status(200).json(updatedLocation);
        } catch (error) {
            res.status(500).json(error);
        }
    });
    

// delete /locations/:locationId
    // Allows a user to delete an existing location associated with their account. (Send the user ID through the req.body)
router.delete('/locations/:id', async (req, res) => {
    try {
        let deletedLocation = await Location.destroy({
            where: {
                id: req.params.id
            }
        });
        if (deletedLocation) {
            res.status(200).json({message : 'successful deletion'});
        } else {
            res.status(404).json({ message: 'No location found to delete :/' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});
    

module.exports = router;
