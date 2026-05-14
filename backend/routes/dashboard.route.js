const express = require('express');
const router = express.Router();
const dashboardController = require('../src/controller/dashboard.controller');
const auth = require('../middleware/auth');


///////////////////////////// Dashboard Count /////////////////////
router.get('/getCount', [auth.login], function (request, response, next) {
    console.log('route reached', request.user)
    dashboardController.getCount(request, response, next);
});

module.exports = router;
