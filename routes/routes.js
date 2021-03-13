// Create an express router object "router" and a "GET" request route handler to call controller "sayHello"

const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers');

router.get('/sayHello', controllers.sayHello);

module.exports = router;
