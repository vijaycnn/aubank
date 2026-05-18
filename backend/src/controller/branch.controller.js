var momentz = require('moment-timezone');
const responder = require('../utils/responder');
const branchService = require('../services/branch.service');
const moment = require('moment');

let BranchController = {
    //use this for frontend list
    getList: async (request, response, next) => {
        try {
            let data = await branchService.getBranchList(request);
            
            let dataList =  { 'totalRecord': data.count, 'list': data.rows };
            return responder.sendFilterResponse(response, 200, "success", dataList, "List retrieved successfully.");
        } catch (error) {
            return next(error);
        }
    },
    //use this for backend list
    getBranchList: async (request, response, next) => {
        try {
            let userType = request.user.userType;
            let userId = request.user.userId;
            let branchIds = request.user.branchIds;
            
            let data = await branchService.getBranchList(request, true, userType, branchIds);
            // console.log('lit >>>>>>>:::', data);
                            
            let dataList =  { 'totalRecord': data.count, 'list': data.rows };
            return responder.sendFilterResponse(response, 200, "success", dataList, "List retrieved successfully.");
        } catch (error) {
            return next(error);
        }
    },
    checkValidBranch: async (request, response, next) => {
        try {
            console.log('validate controller reached', request.body);
            let checkIfExist = false;
            let branchId = request.body.branchId ? request.body.branchId : 0;
            checkIfExist = await branchService.checkExistBranch(request.body.branchCode, branchId);
            if (checkIfExist == true) {
                return responder.sendResponse(response, 200, "error", '', "Branch Already Exist");
            } else {
                return responder.sendResponse(response, 200, "success", '', "No match found");
            }
        } catch (error) {
            return next(error);
        }
    },  
    createBranch: async (request, response, next) => {
        try {
            // console.log('create controller reached', request.body, request.user);
            if(request.body.branchCode.trim() == ''){
                return responder.sendResponse(response, 200, "error", '', "Missing Required!");
            }
            if(request.body.serialNumber.trim() == ''){
                return responder.sendResponse(response, 200, "error", '', "Missing Required!");
            }
            // const regex = /^[a-zA-Z0-9\s./()-]+$/;
            const regex = /^[a-zA-Z0-9\s._()-]+$/;

            if (!regex.test(request.body.branchCode)) {
                return responder.sendResponse(response, 200, "error", '', "Invalid BranchCode!");
            }
            if (!regex.test(request.body.serialNumber)) {
                return responder.sendResponse(response, 200, "error", '', "Invalid SerialNumber!");
            }
            let checkIfExist = false; let checkIfSerialNumberExist = false;
            checkIfExist = await branchService.checkExistBranch(request.body.branchCode);
            if (checkIfExist == true) {
                return responder.sendResponse(response, 200, "error", '', "Branch Already Exist");
            }
            checkIfSerialNumberExist = await branchService.checkExistBranchSerialNumber(request.body.serialNumber);
            if (checkIfSerialNumberExist == true) {
                return responder.sendResponse(response, 200, "error", '', "SerialNumber Already Exist");
            }

            if(checkIfExist !== true && checkIfSerialNumberExist !== true) {
                const BranchData = {
                    branchCode: request.body.branchCode.trim(),
                    serialNumber: request.body.serialNumber ? request.body.serialNumber.trim() : '',
                    category: 'Form',
                    createdBy: request.user.userId
                };
                let branchCreate = await branchService.createBranch(BranchData);
                return responder.sendResponse(response, 200, "success", branchCreate, "Branch created successfully.");                
            }
        } catch (error) {
            return next(error);
        }
    },
    getBranchById:async(request, response, next) =>{
        try {
            let branchId = request.params.branchId;
            console.log('getById controller reached', request.params, request.user);

            const dataList = await branchService.getBranchById(branchId);
            if(dataList){
                // console.log('fileUrl :::', dataList.fileUrl);
                return responder.sendResponse(response, 200, "success", dataList, "Branch retrieved successfully.");
            }else{
                return responder.sendResponse(response, 200, "error", {}, "No Branch found");
            }
        } catch (error) {
            return next(error);
        }
    },
    updateBranch: async (request, response, next) => {
        try {
            // console.log('update controller reached', request.body, request.user);
            if(request.body.branchCode.trim() == ''){
                return responder.sendResponse(response, 200, "error", '', "Missing Required!");
            }
            if(request.body.serialNumber.trim() == ''){
                return responder.sendResponse(response, 200, "error", '', "Missing Required!");
            }
            // const regex = /^[a-zA-Z0-9\s./()-]+$/;
            const regex = /^[a-zA-Z0-9\s._()-]+$/;

            if (!regex.test(request.body.branchCode)) {
                return responder.sendResponse(response, 200, "error", '', "Invalid BranchCode!");
            }
            if (!regex.test(request.body.serialNumber)) {
                return responder.sendResponse(response, 200, "error", '', "Invalid SerialNumber!");
            }
            let checkIfExist = false; let checkIfSerialNumberExist = false;
            checkIfExist = await branchService.checkExistBranch(request.body.branchCode, request.body.branchId);

            if (checkIfExist == true) {
                return responder.sendResponse(response, 200, "error", '', "Branch Already Exist");
            }
            checkIfSerialNumberExist = await branchService.checkExistBranchSerialNumber(request.body.serialNumber, request.body.branchId);
            if (checkIfSerialNumberExist == true) {
                return responder.sendResponse(response, 200, "error", '', "SerialNumber Already Exist");
            }

            if(checkIfExist !== true && checkIfSerialNumberExist !== true) {
                const BranchData = {
                    branchCode: request.body.branchCode.trim(),
                    serialNumber: request.body.serialNumber ? request.body.serialNumber.trim() : '',
                    updatedBy: request.user.userId,
                    updatedAt: new Date(),
                };
                let branchUpdate = await branchService.updateBranch(BranchData, request.body.branchId);
                return responder.sendResponse(response, 200, "success", branchUpdate, "Branch updated successfully.");
                
            }
        } catch (error) {
            return next(error);
        }
    },
    changeBranchStatus: async (request, response, next) => {
        try {
            // console.log('changeStatus reached', request.body, request.user);        
            const BranchData = {
                status: request.body.status,
                branchId: request.body.branchId,
            };
            let BranchUpdate = await branchService.changeBranchStatus(BranchData);
            return responder.sendResponse(response, 200, "success", BranchUpdate, "Branch updated successfully.");            
        } catch (error) {
            return next(error);
        }
    },
    deleteBranch: async (request, response, next) => {
        try {
            // console.log('deleteBranch reached', request.body, request.user);        
            let BranchUpdate = await branchService.deleteBranch(request.body.branchId);
            return responder.sendResponse(response, 200, "success", BranchUpdate, "Branch deleted successfully.");            
        } catch (error) {
            return next(error);
        }
    },

    //////Branch Details ///////////////////////
    getDetailsById:async(request, response, next) =>{
        try {
            let userType = request.user.userType;
            let branchIds = request.user.branchIds;
            let branchId = request.params.branchId;
            let userBranchIds = request?.user?.branchIds;

            if(userType == 'branch'){
                if(!userBranchIds.includes(Number(branchId))){
                    console.log('getDetailsById controller reached', request.params, request.user);
                    return responder.sendResponse(response, 200, "error", {}, "No BranchDetails found");
                }
            }
            
            const dataList = await branchService.getDetailsById(branchId);
            if(dataList){
                // console.log('fileUrl :::', dataList.fileUrl);
                return responder.sendResponse(response, 200, "success", dataList, "BranchDetails retrieved successfully.");
            }else{
                return responder.sendResponse(response, 200, "error", {}, "No BranchDetails found");
            }
        } catch (error) {
            return next(error);
        }
    },
    updateBranchInfo: async (request, response, next) => {
        try {
            // console.log('update controller reached', request.body);
            const branchId = request.body.branchId;
            const detailId = request.body?.detailId;
            const formData = request.body?.data;

            let checkIfExist = false;
            checkIfExist = await branchService.checkExistBranchInfo(request.body.branchId);
            if (checkIfExist == true) {     //for Edit
                let branchData = {...formData, updatedBy: request.user.userId, updatedAt: new Date() };

                let branchUpdate = await branchService.updateBranchDetails(branchData, detailId);

                return responder.sendResponse(response, 200, "success", branchUpdate, "BranchInfo updated successfully");
            } else {        // For create

                let branchData = {...formData, branchId: branchId, createdBy: request.user.userId };
                let branchCreate = await branchService.createBranchDetails(branchData);

                return responder.sendResponse(response, 200, "success", branchCreate, "BranchInfo saved successfully");                
            }
        } catch (error) {
            return next(error);
        }
    },
    getBranchDetailById:async(request, response, next) =>{
        try {
            let branchId = request.params.branchId;
            // console.log('getDetailsById controller reached', request.params, request.user);
            
            const dataList = await branchService.getDetailsById(branchId);
            if(dataList){
                // console.log('fileUrl :::', dataList.fileUrl);
                return responder.sendResponse(response, 200, "success", dataList, "BranchDetails retrieved successfully.");
            }else{
                return responder.sendResponse(response, 200, "error", {}, "No BranchDetails found");
            }
        } catch (error) {
            return next(error);
        }
    },

};

module.exports = BranchController;
