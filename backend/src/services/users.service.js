const { QueryTypes } = require('sequelize');
let userDataProvider = {

  loginUser: async (userdata) => {
    return new Promise(function (resolve, reject) {
      conn.Users.findOne({
        where: userdata,
        attributes: { exclude: ['password'] },        
      })
        .then(data => {
          resolve(data);
        }).catch(err => {
          reject(err);
        });
    });
  },
  checkExistByEmail: async (userEmail) => {
    return new Promise(function (resolve, reject) {
      conn.Users.findOne({
        where: { userEmail: userEmail },
      })
        .then(data => {
          if (data == null) {
            resolve(null);
          } else {
            resolve(data);
          }
        }).catch(err => {
          reject(err);
        });
    });
  },
  createFotgotPasswordLink: async (data) => {
    console.log("edited data ",data)
    let userId=data.userId;
    return new Promise( async function (resolve, reject) {
      await conn.RestPasswords.update({resetPasswordExpires: new Date(),status:0}, { where: {userId:userId} });
      conn.RestPasswords.create(data)
        .then(data => {
          resolve(data);
        }).catch(err => {
          reject(err);
        });
    });
  },
  verifyForgotToken: async (token) => {
    return new Promise(function (resolve, reject) {
      conn.RestPasswords.findOne({
        where: { resetPasswordToken: token,  resetPasswordExpires: {
          [Op.gt]: conn.sequelize.literal("NOW()"),
        },status:1},
        attributes:['id','resetPasswordToken','userId','email']
      })
        .then(data => {
          if (data == null) {
            resolve(null);
          } else {
            resolve(data);
          }
        }).catch(err => {
          reject(err);
        });
    });
  },
  updateForgotPassword: async (editData, whereCon,userId,resetPasswordToken) => {

    return new Promise( async function (resolve, reject) {
      const t = await  conn.sequelize.transaction();
      try {
      
       console.log(userId,"udate reset pass word data",resetPasswordToken)
       let userData= await conn.Users.update(editData, { where: whereCon }, { transaction: t });
       await conn.RestPasswords.update({resetPasswordExpires: new Date(),status:0}, { where: {userId:userId,resetPasswordToken:resetPasswordToken} }, { transaction: t });
           
        await t.commit();
        resolve(userData);
      }
      catch (e) {
        console.log("error thrown", e);
        await t.rollback();
        reject(e);
      }
      conn.Users.update(editData, { where: whereCon })
        .then(data => {
          resolve(data);
        }).catch(err => {
          reject(err);
        });
    });
  },
  ////User CRUD
  getUsersCount: async () => {
    try {
      const result = await conn.Users.findAll({
        attributes: [
          "userRole",
          [
            conn.Sequelize.literal(
              `COUNT(*) FILTER (WHERE "status" = 1 and "isDeleted" = 0)`
            ),
            "activeCount",
          ],
          [
            conn.Sequelize.literal(
              `COUNT(*) FILTER (WHERE "status" = 0 and "isDeleted" = 0)`
            ),
            "inactiveCount",
          ],
        ],
        where:{ userType: 'branch'},
        group: ["userRole"],
        order: [["userRole", "ASC"]],
        raw: true,
        // logging: console.log
      });

      return result.map((item) => ({
        userRole: item.userRole,
        activeCount: Number(item.activeCount) || 0,
        inactiveCount: Number(item.inactiveCount) || 0
      }));
      
    } catch (error) {
      throw error;
    }
  },

  getUserList: async (req, all = false) => {
    return new Promise(async function (resolve, reject) {
      // console.log('search', search);
      let offset = req.query.offset;
      let limit = req.query.perPage;
      
      let filter = { isDeleted: 0, userType: 'branch' };
      let columns = ["id", "name", "userName", "userRole", "userEmail", "userMobile", "employeeId", "status", "createdAt"];
      if(!all){
        columns = ["id", "name", "userName", "userRole", "userEmail", "userMobile", "employeeId", ];
        filter = {...filter, status:1 }
      }
      await conn.Users.findAndCountAll({
        attributes:columns,
        where: filter,
        limit:limit,
        offset:offset,
        order: [ ['id', 'DESC']],
        // raw: true,
        // logging:console.log
      })
        .then(async data => {
          resolve(data);
        }).catch(err => {
          reject(err);
        });
    });
  },
  createUser: async (body) => {
    return new Promise(function (resolve, reject) {
      conn.Users.create(body)
        .then(data => {
          resolve(data);
        }).catch(err => {
          reject(err);
        });
    });
  },
  checkExistUserName: async (userName, id = 0) => {
    return new Promise(function (resolve, reject) {
      conn.Users.findOne({
        where: { 
          [conn.Sequelize.Op.or]: [
            {userName : userName.trim() },
            { userEmail : userName.trim() }, 
          ],           
          isDeleted : 0,
          id: { [Op.not]: id }       
        },
        // logging: console.log
      })
        .then(data => {
          if (data == null) {
            resolve(false);
          } else if (id && data.length == 1) {
            resolve(false);
          } else {
            resolve(true);
          }
        }).catch(err => {
          reject(err);
        });
    });
  },
  checkExistUserEmail: async (userEmail, id = 0) => {
    return new Promise(function (resolve, reject) {
      conn.Users.findOne({
        where: { 
          userEmail : userEmail.trim(),  
          isDeleted : 0,
          id: { [Op.not]: id }       
        },
      })
        .then(data => {
          if (data == null) {
            resolve(false);
          } else if (id && data.length == 1) {
            resolve(false);
          } else {
            resolve(true);
          }
        }).catch(err => {
          reject(err);
        });
    });
  },
  checkExistEmployeeId: async (employeeId, id = 0) => {
    return new Promise(function (resolve, reject) {
      conn.Users.findOne({
        where: { 
          employeeId : employeeId.trim(),  
          isDeleted : 0,
          id: { [Op.not]: id }       
        },
      })
        .then(data => {
          if (data == null) {
            resolve(false);
          } else if (id && data.length == 1) {
            resolve(false);
          } else {
            resolve(true);
          }
        }).catch(err => {
          reject(err);
        });
    });
  },
  getUserById: async (userId) => {
    return new Promise(function (resolve, reject) {
      conn.Users.findOne({
        attributes: [ "id", "name", "userName", "userRole", "userEmail", "userMobile", "employeeId", "status", "branchIds", "createdAt"],
        where: { id: userId },
        raw:true
      })
        .then(data => {
          if (data !== null) {
            resolve(data);
          } else {
            reject(false);
          }
        }).catch(err => {
          reject(err);
        });
    });
  },
  updateUser: async (body, userId) => {
    return new Promise(function (resolve, reject) {
      conn.Users.update(body, {
        where: { id: userId },
      })
        .then(data => {
          resolve(data);
        }).catch(err => {
          reject(err);
        });
    });
  },
  
  //Use this service to soft delete purpose
  changeUserStatus: async (body) => {
    return new Promise(function (resolve, reject) {
      conn.Users.update({
        status: body.status
      }, {
        where: { id: body.userId },
      })
        .then(data => {
          resolve(data);
        }).catch(err => {
          reject(err);
        });
    });
  },
  deleteUser: async (userId) => {
    return new Promise(function (resolve, reject) {
      conn.Users.update({
        isDeleted : 1
      },{
        where: { id: userId, userType : 'branch' },
      })
        .then(data => {
          if (data !== null) {
            resolve(data);
          } else {
            reject('No Record found');
          }
        }).catch(err => {
          reject(err);
        });
    });
  },

  ////////
}

module.exports = userDataProvider;
