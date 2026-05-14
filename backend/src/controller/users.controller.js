const md5 = require('md5-nodejs');
const jwt = require('jsonwebtoken');
const moment = require("moment");
var crypto = require("crypto");
const helper = require('../utils/helper');
const responder = require('../utils/responder');
const usersService = require('../services/users.service');

let userController = {

  loginUser: async (request, response, next) => {
    try {
    console.log(":::", request.body)
      let password=  request.body.password;
      let email=  request.body.email;

      if(email == '' || password == ''){
        return responder.sendResponse(response, 400, "error", null, "Password and email can't be empty.");
      }
      let base64string = request.body.password;
      let bufferObj = Buffer.from(base64string, "base64");
      let decodedString = bufferObj.toString("utf8");

     // console.log("decoded data---->",decodedString)
 
      if(decodedString=='' || email=='' || password == '')
       {
        return responder.sendResponse(response, 400, "error", null, "Password and email can't be empty.");
       }
       else{
            // var hash = md5(password).toString();
            var hash = md5(decodedString).toString();
            let email = request.body.email;
            // console.log('has>> ', hash);
            const userData = {
                [conn.Sequelize.Op.or]: [
                  { userName : email.trim() },
                  { userEmail : email.trim() }, 
                ],
                // userEmail      : request.body.email,
                userPassword   : hash,
                isDeleted      :  0, 
                status         :  1
            };
            let findUser = await usersService.loginUser(userData);
            /// console.log("find user ",findUser)
            if((findUser!==null) && (findUser.id!==''))
            {
                if(findUser.status==1){
                    let user={
                        userName  :findUser.userName,
                        userEmail :findUser.userEmail,
                        userType  : findUser.userType,
                        userRole  : findUser?.userRole,
                        branchIds : findUser?.branchIds,
                        userId    : findUser.id,
                    }
                // console.log("USER JWT ::",user)
                let token= await genereateToken(user);

                // let permissions = JSON.parse((findUser.Role).role_permissions);
                let userPermission = {};    //await usersService.findAllPermissionGivenUser(null,permissions);
                return responder.sendResponse(response, 200, "success", {type:"activated",token:token,userName:findUser.userName, userEmail:findUser.userEmail, userId: findUser.id, userPermission:userPermission}, "Valid User login.");
                }else{
                return responder.sendResponse(response, 200, "error", {type:"deactivated"}, "This user deactivated please contact to admin");
                }   
            }
            else{
                return responder.sendResponse(response, 200, "error", {type:"Unauthorized"}, "Unauthorized User.");
            }              
       }    
    } catch (error) {
            console.log(error)
            return next(error);
      }
  },
  regenerateToken: async (request, response, next) => {
    try {
    // console.log("HHHHHHHHHHHHHHHHHHHHHH")
      let refreshToken=  request.body.refreshToken;     
      if(!refreshToken)
       {
        return responder.sendResponse(response, 400, "false", null, "Refresh Token Required");
       }
       else{

         let  refdata= await verifyRefreshToken(refreshToken);
         console.log("refresh token data",refdata)
         let userId= refdata.userId;
         if(userId)
         {
          //const expMin=getTokenExpiresIn(refdata.exp);		  
		  
		let issuedEpoch = parseInt(refdata.iat);
		let expEpoch = parseInt(refdata.exp);
		let currentEpoch = parseInt(moment().unix());
		
		let issuedEpochDiff = currentEpoch - issuedEpoch;
		let expEpochDiff = expEpoch - currentEpoch;

		if(issuedEpochDiff > 60 && expEpochDiff > 0){
            let findUser = await usersService.loginUser(userId);
            console.log("find user ",findUser);
            if((findUser!==null) && (findUser.id!==''))
               {
                    if(findUser.status==1){
                       let user={
                            userName:findUser.userName,
                            userEmail:findUser.userEmail,
                            userId: findUser.id,
                        }
                        let token= await genereateToken(user);
                       
                        // let permissions = JSON.parse((findUser.Role).role_permissions);
                        let userPermission = {};    //await usersService.findAllPermissionGivenUser(null,permissions);
                        // userPermission=userPermission.permissions;
                        return responder.sendResponse(response, 200, "true", {type:"activated",token:token}, "Regenerate token  successfully");
                    }else{
                        return responder.sendResponse(response, 200, "false", {type:"deactivated"}, "This user deactivated please contact to admin");
                    }   
                }
          }
          else{          
            return responder.sendResponse(response, 200, "true", {type:"activated",token:refreshToken}, "Token Not expired");
          }
        }else{
            return responder.sendResponse(response, 200, "false", {type:"Unauthorized"}, "Unauthorized User.");
        }              
       }    
    } catch (error) {
        console.log(error)
        return next(error);
    }
  },
  generateForgotPasswordLink: async (request, response, next) => {
    try {
   
      let emailId=  request.body.emailId;
      let  BackEndBaseUrl = process.env.BASE_URL_BACK_END;
      if(!emailId){
        return responder.sendResponse(response, 400, "false", null, "Email ID  Required");
      }else{
        let  userdata= await usersService.checkExistByEmail(emailId);       
         if(userdata){
             let userId= userdata.id;
             let userName= userdata.userName;
             crypto.randomBytes(20, async function (err, buf) {
             var token = buf.toString("hex");

            //  console.log("generated id ", token);
             if (err) {
               console.log(err);
             } else {
               let userData = {
                 userId: userId,
                 email: userdata.userEmail,
                 resetPasswordGenerated: new Date(),
                 resetPasswordToken: token,
                 status: 1,
                 resetPasswordExpires: moment()
                   .add(24, "hours")
                   .format("YYYY-MM-DD HH:mm:ss"),
               };

               let linkCreated = await usersService.createFotgotPasswordLink(userData);

               if (linkCreated) {
                 let link = BackEndBaseUrl + "/forgot-password-update/" + token;
                 console.log('link ::', link);                 

                 let templateDetails= await conn.Notifications.findOne({where: {stateSlug:'password-reset'}, raw:true});
                 if(templateDetails){
                    let emailTemplate = templateDetails.emailTemplate;
                    let replaceObj={
                      rm_CusName:userName,
                      rm_Link:link,                     
                    }
                    emailTemplate= await helper.stringReplace(emailTemplate,replaceObj)
                    //send mail to all assign mail
                    helper.send_mail_byEmailer(emailId,templateDetails.subjectLine, emailTemplate,[])
                 }
                 return responder.sendResponse(response, 200, "success", { token: token, da: linkCreated }, "Forgot password link sent successfully your registered email.");
               }
               else {
                 return responder.sendResponse(response, 200, "false", { type: "link not created" }, "link not created");
               }
             }

           })
         }
        else{
            return responder.sendResponse(response, 200, "false", {type:"Unauthorized"}, "Unauthorized User.");
        }
              
       }    
    } catch (error) {
      console.log(error)
      return next(error);
    }
  },
  forgotPasswordLinkVerify: async (request, response, next) => {
    try {
   // console.log(request)
      let tokenId=  request.params.id;     
      if(!tokenId)
       {
        return responder.sendResponse(response, 200, "false", {type:"link not valid"}, "Link is not valid");
       }
       else{
        let  userdata= await usersService.verifyForgotToken(tokenId);
      
        if(userdata && userdata.id)
        {            
            return responder.sendResponse(response, 200, "success", {type:"valid",userdata:userdata}, "Forgot Password link is valid");            
        }
        else{
            return responder.sendResponse(response, 200, "false", {type:"expired"}, "Password reset token is invalid or has expired.");
        }
              
       }    
    } catch (error) {
          console.log(error)
          return next(error);
    }
  },
  updateForgotPassword: async (request, response, next) => {
    try {
   
      let resetPasswordToken=  request.body.resetPasswordToken;
      let emailId=  request.body.emailId;
      let newPassword=  request.body.newPassword;
      let confirmPassword=  request.body.confirmPassword;

      // const pwdRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      const pwdRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

      if(!pwdRegex.test(newPassword)){
          return responder.sendResponse(response, 200, "false", null, "Password contains 1 Uppercase letter, 1 lowercase letter, 1 number, 1 special character and minimum length should be 8");
      }
     
      if(newPassword !== confirmPassword)
       {
        return responder.sendResponse(response, 200, "false", null, "New Password and confirm password not matched");
       }
       else{
        let  userdata= await usersService.verifyForgotToken(resetPasswordToken);
         if(userdata)
         {
          let userId= userdata.userId;
            confirmPassword= md5(confirmPassword).toString();
            let userData = {
              userPassword:confirmPassword,
              resetPasswordExpires: new Date(),
            };

            let where = {
              userEmail: emailId,
            };

            let userEdit = await usersService.updateForgotPassword(userData,where,userId,resetPasswordToken);
            if(userEdit)
            {
              return responder.sendResponse(response, 200, "success", {type:"password reset"}, "Password reset successfully");
            }
            else{
              return responder.sendResponse(response, 200, "false", {type:"password not reset"}, "Password not reset please try again");
            }
           
         }else{
            return responder.sendResponse(response, 200, "false", {type:"Unauthorized"}, " This link is not valid");
        }
              
       }    
    } catch (error) {
        console.log(error)
        return next(error);
    }
  },
  //User CRUD
  //use this for backend list
  getUserList: async (request, response, next) => {
      try {
          let data = await usersService.getUserList(request, true);
          // const rows = data.rows.map((r) => r.get({ plain: true }));
                        
          // console.log('lit >>>>>>>:::', users);
          let dataList =  { 'totalRecord': data.count, 'list': data.rows };
          return responder.sendFilterResponse(response, 200, "success", dataList, "User List retrieved successfully.");
      } catch (error) {
          return next(error);
      }
  },
  checkValidUser: async (request, response, next) => {
      try {
          console.log('validate controller reached', request.body);
          let checkIfExist = false;
          let userId = request.body.userId ? request.body.userId : 0;
          checkIfExist = await usersService.checkExistUser(request.body.userName, userId);
          if (checkIfExist == true) {
              return responder.sendResponse(response, 200, "error", '', "User Already Exist for this name");
          } else {
              return responder.sendResponse(response, 200, "success", '', "No match found");
          }
      } catch (error) {
          return next(error);
      }
  },  
  createUser: async (request, response, next) => {
      try {
          console.log('create controller reached', request.body, request.user);
          if(request.body.name.trim() == ''){
              return responder.sendResponse(response, 200, "error", '', "Missing Required!");
          }else if(!request.body.userRole || request.body.userRole.trim() == ''){
              return responder.sendResponse(response, 200, "error", '', "Missing Required!");
          }else if(!request.body.employeeId || request.body.employeeId.trim() == ''){
              return responder.sendResponse(response, 200, "error", '', "Missing Required!");
          }else if(!request.body.userEmail || request.body.userEmail.trim() == ''){
              return responder.sendResponse(response, 200, "error", '', "Missing Required!");
          }else if(!request.body.userPassword || request.body.userPassword.trim() == ''){
              return responder.sendResponse(response, 200, "error", '', "Missing Required!");
          }

          let password=  request.body.userPassword;
          let confirmPassword=  request.body.confirmPassword;
          const pwdRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          if(!pwdRegex.test(password)){
              return responder.sendResponse(response, 200, "error", '', "Password contains 1 Uppercase letter, 1 lowercase letter, 1 number, 1 special character and minimum length should be 8");
          }

          if(password !== confirmPassword)
          {
            return responder.sendResponse(response, 200, "error", '', "Password and confirm password not matched.");
          }

          // let checkIfExistUserName = false; 
          // checkIfExistUserName = await usersService.checkExistUserName(request.body.userName);
          // if (checkIfExistUserName == true) {
          //   return responder.sendResponse(response, 200, "error", '', "Username Already Exist");
          // } 
          let checkExistEmployeeId = false;
          checkExistEmployeeId = await usersService.checkExistEmployeeId(request.body.employeeId);
          if (checkExistEmployeeId == true) {
              return responder.sendResponse(response, 200, "error", '', "Employee Id Already Exist");
          }

          let checkExistEmail = false;
          checkExistEmail = await usersService.checkExistUserEmail(request.body.userEmail);
          if (checkExistEmail == true) {
              return responder.sendResponse(response, 200, "error", '', "Email Already Exist");
          } 
           
          if(!checkExistEmployeeId && !checkExistEmail) {
            var hash = md5(password).toString();
              const userData = {
                  name        : request.body.name.trim(),
                  userRole    : request.body.userRole,
                  employeeId  : request.body.employeeId ? request.body.employeeId.trim() : '',
                  userEmail   : request.body.userEmail ? request.body.userEmail.trim() : '',
                  userMobile  : request.body.userMobile ? request.body.userMobile.trim() : '',
                  userName    : request.body.userEmail ? request.body.userEmail.trim() : '',
                  userPassword: hash,
                  userType    : 'branch',
                  isDeleted   : 0,
                  createdBy   : request.user.userId
              };
            let userCreate = await usersService.createUser(userData);
            return responder.sendResponse(response, 200, "success", userCreate, "User created successfully.");                
          }
      } catch (error) {
          return next(error);
      }
  },
  getUserById:async(request, response, next) =>{
      try {
          let userId = request.params.userId;
          console.log('getById controller reached', request.params, request.user);

          const dataList = await usersService.getUserById(userId);
          if(dataList){
              // console.log('fileUrl :::', dataList.fileUrl);
              return responder.sendResponse(response, 200, "success", dataList, "User retrieved successfully.");
          }else{
              return responder.sendResponse(response, 200, "error", {}, "No User found");
          }
      } catch (error) {
          return next(error);
      }
  },
  updateUser: async (request, response, next) => {
      try {
          // console.log('update controller reached', request.body, request.user);
          if(request.body.name.trim() == ''){
              return responder.sendResponse(response, 200, "error", '', "Missing Required!");
          }else if(!request.body.userRole || request.body.userRole.trim() == ''){
              return responder.sendResponse(response, 200, "error", '', "Missing Required!");
          }else if(!request.body.employeeId || request.body.employeeId.trim() == ''){
              return responder.sendResponse(response, 200, "error", '', "Missing Required!");
          }

          let checkExistEmployeeId = false;
          checkExistEmployeeId = await usersService.checkExistEmployeeId(request.body.employeeId, request.body.userId);
          if (checkExistEmployeeId == true) {
              return responder.sendResponse(response, 200, "error", '', "Employee Id Already Exist");
          } else {
              const userData = {
                name        : request.body.name.trim(),
                userRole    : request.body.userRole,
                employeeId  : request.body.employeeId ? request.body.employeeId.trim() : '',
                userMobile  : request.body.userMobile ? request.body.userMobile.trim() : '',
                updatedBy: request.user.userId,
                updatedAt: new Date(),
              };
              let userUpdate = await usersService.updateUser(userData, request.body.userId);
              return responder.sendResponse(response, 200, "success", userUpdate, "User updated successfully.");
              
          }
      } catch (error) {
          return next(error);
      }
  },
  changeUserStatus: async (request, response, next) => {
      try {
          // console.log('reached', request.body, request.user);        
          const userData = {
              status: request.body.status,
              userId: request.body.userId,
          };
          let userUpdate = await usersService.changeUserStatus(userData);
          return responder.sendResponse(response, 200, "success", userUpdate, "User updated successfully.");            
      } catch (error) {
          return next(error);
      }
  },

  assignBranches: async (request, response, next) => {
      try {
        let userId = request.params.userId;          
        const { branchIds } = request.body;
        console.log('Assign Branch reached', userId, request.body, branchIds);
    
        const userData = {
          branchIds: branchIds,
          updatedBy: request.user.userId,
          updatedAt: new Date(),
        };
        let userUpdate = await usersService.updateUser(userData, userId);
        return responder.sendResponse(response, 200, "success", userUpdate, "Branches assigned successfully");
    
      } catch (error) {
          return next(error);
      }
  },

  ///

};

genereateToken= async (data)=>{
  return new Promise(async function (resolve, reject) {

    // let expTimeData = await conn.Settings.findOne({where: {settingsKey:'token-expiry-time-minutes'}, raw:true});
    let ExpTime=15;
    // if(expTimeData && expTimeData.settingsKey!='' && expTimeData.settingsValue!='')
    // {
    //   ExpTime=expTimeData.settingsValue;
    // }

    jwt.sign(
      data,
      process.env.JWT_KEY,
      {
        expiresIn: ExpTime+"m",
      },(err,token)=>{
          if(err)
          {
            reject(err);
          }
          //store(user.userId, {token:token,blockedToken:null});
         
          resolve(token);
      }
    );
  })
}
genereateRefreshToken= async (data)=>{  
    return new Promise(function (resolve, reject) {
      jwt.sign(
        data,
        process.env.JWT_KEY,
        {
          expiresIn: "1y",
        },(err,token)=>{
            if(err)
            {
              reject(err);
            }
            resolve(token);
        }
      );
    })
}
module.exports = userController;
