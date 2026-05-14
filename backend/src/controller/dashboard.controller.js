var momentz = require('moment-timezone');
const responder = require('../utils/responder');
const branchService = require('../services/branch.service');
const userService = require('../services/users.service');
const moment = require('moment');

let DashboardController = {
    //use this for backend list
    getCount: async (request, response, next) => {
        try {
            // console.log('user >>>>>>>:::', request.user);
            let userType = request.user.userType;
            let userId = request.user.userId;
            let branchIds = request.user.branchIds;
            
            let data = await branchService.getBranchCount(userType, branchIds);
            let userdata = await userService.getUsersCount();
            
            let dataList =  { 'branchData': data[0], 'userData': userdata };
            // console.log('user >>>>>>>:::', dataList);
            return responder.sendResponse(response, 200, "success", dataList, "Data retrieved successfully.");
        } catch (error) {
            return next(error);
        }
    },    

};

module.exports = DashboardController;
