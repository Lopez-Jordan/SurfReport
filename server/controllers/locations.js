const router = require('express').Router();
const { User, Location } = require('../models');


// get /:userId/locations
    // Retrieves all locations associated with a specific user.
// post /:userId/locations
    // Allows a user to create a new location associated with their account.
// update /:userId/locations/:locationId 
    // Allows a user to update an existing location associated with their account.
// delete /:userId/locations/:locationId
    // Allows a user to delete an existing location associated with their account.

