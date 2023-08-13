const router = require('express').Router();

const userController = require('./controllers/userController');
const logController = require('./controllers/logController');

router.use('/api/users', userController);
router.use('/api/logs', logController);

module.exports = router;