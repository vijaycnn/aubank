const express = require('express');
const Joi = require('joi')
const router = express.Router();
const userController = require('../src/controller/users.controller');
const uservalidate = require('../middleware/validate.middelware');
const auth = require('../middleware/auth');  

const schemas = {
    updateForgotPassword: Joi.object({    
        emailId: Joi.string().regex(/^[ A-Za-z0-9_@./#&+-]*$/).required()
        .messages({
            'string.pattern.base': `Enter valid email id`
        }),   
        resetPasswordToken: Joi.string().required(),
        newPassword: Joi.string().required().messages({
            'string.pattern.base': `Password Required`
        }),
        confirmPassword: Joi.string().required().messages({
            'string.pattern.base': `Password Required`
        }), 
    }),

}
router.post('/login', function (request, response, next) {
    userController.loginUser(request, response, next);
});
router.post('/regenerateToken', function (request, response, next) {
    userController.regenerateToken(request, response, next);
});

router.post('/generateForgotPasswordLink', function (request, response, next) {
    userController.generateForgotPasswordLink(request, response, next);
});
router.get('/forgotPasswordLinkVerify/:id', function (request, response, next) {
    userController.forgotPasswordLinkVerify(request, response, next);
});
router.post('/updateForgotPassword',[uservalidate(schemas.updateForgotPassword,'')], function (request, response, next) {
    userController.updateForgotPassword(request, response, next);
});

///////////////////////////// Users CRUD /////////////////////
router.get('/list',  [auth.login], function (request, response, next) {
    // console.log('list route reached', request.body);
    userController.getUserList(request, response, next);
});
router.post("/valid", [auth.login], function (request, response, next) {
    userController.checkValidUser(request, response, next)
});
router.post("/create", [auth.login], function (request, response, next) {
    userController.createUser(request, response, next)
});
router.get("/getById/:userId", [auth.login], function (request, response, next) {
    userController.getUserById(request, response, next)
});
router.post("/update", [auth.login], function (request, response, next) {
    userController.updateUser(request, response, next)
});
router.post("/changeStatus", [auth.login], function (request, response, next) {
    userController.changeUserStatus(request, response, next)
});
router.post("/delete", [auth.login], function (request, response, next) {
    userController.deleteUser(request, response, next)
});

router.post("/assign-branches/:userId", [auth.login], function (request, response, next) {
    userController.assignBranches(request, response, next)
});

module.exports = router;
