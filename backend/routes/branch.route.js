const express = require('express');
const router = express.Router();
const branchController = require('../src/controller/branch.controller');
const auth = require('../middleware/auth');

///////////////////////////// Branch /////////////////////
router.get('/getList', function (request, response, next) {
    branchController.getList(request, response, next);
});
router.get('/list',  [auth.login], function (request, response, next) {
    // console.log('list route reached', request.body);
    branchController.getBranchList(request, response, next);
});
router.post("/valid", [auth.login], function (request, response, next) {
    branchController.checkValidBranch(request, response, next)
});
router.post("/create", [auth.login], function (request, response, next) {
    branchController.createBranch(request, response, next)
});
router.get("/getById/:branchId", [auth.login], function (request, response, next) {
    branchController.getBranchById(request, response, next)
});
router.post("/update", [auth.login], function (request, response, next) {
    branchController.updateBranch(request, response, next)
});
router.post("/changeStatus", [auth.login], function (request, response, next) {
    branchController.changeBranchStatus(request, response, next)
});
//////////////////BranchDetails ///////////////
router.get("/getDetailById/:branchId", [auth.login], function (request, response, next) {
    branchController.getDetailsById(request, response, next)
});
router.post("/updateBranchInfo", [auth.login], function (request, response, next) {
    branchController.updateBranchInfo(request, response, next)
});

module.exports = router;
