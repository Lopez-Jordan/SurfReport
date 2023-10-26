const router = require('express').Router();
const loginRoutes = require('./login');
// const locationRoutes = require('./locations');

router.use(loginRoutes);
router.use('/locations', locationRoutes);

module.exports = router;


