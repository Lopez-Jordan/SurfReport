const router = require('express').Router();
const loginRoutes = require('./login');
const locationRoutes = require('./locations');   // still need to import

router.use(loginRoutes);
router.use(locationRoutes);

module.exports = router;


