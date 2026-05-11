const { QueryTypes } = require('sequelize');

let BranchDataProvider = {

  getBranchList: async (all = false, userType =false, branchIds =false) => {
    return new Promise(async function (resolve, reject) {
      // console.log('search', search);
      let filter = { isdeleted: 0 };
      let columns = ["id", "branchCode", "serialNumber", "category", "status", "createdAt"];
      if(!all){
        columns = ["id", "branchCode", "serialNumber", "category"];
        filter = {...filter, status:1 }
      }else if(userType != 'admin'){    //apply this only for pageList section
        filter = {...filter,
          id : { [conn.Sequelize.Op.in]: branchIds }
         }
      }
      await conn.BankBranches.findAndCountAll({
        attributes:columns,
        where: filter,
        order: [['id', 'DESC']],
        raw: true,
        logging:console.log
      })
        .then(async data => {
          resolve(data);
        }).catch(err => {
          reject(err);
        });
    });
  },
  createBranch: async (body) => {
    return new Promise(function (resolve, reject) {
      conn.BankBranches.create(body)
        .then(data => {
          resolve(data);
        }).catch(err => {
          reject(err);
        });
    });
  },
  checkExistBranch: async (branchCode, id = 0) => {
    return new Promise(function (resolve, reject) {
      conn.BankBranches.findOne({
        where: { 
          branchCode : branchCode.trim(),
          isdeleted: 0,
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
  getBranchById: async (branchId) => {
    return new Promise(function (resolve, reject) {
      conn.BankBranches.findOne({
        attributes: [ "*"],
        where: { id: branchId },
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
  updateBranch: async (body, branchId) => {
    return new Promise(function (resolve, reject) {
      conn.BankBranches.update(body, {
        where: { id: branchId },
      })
        .then(data => {
          resolve(data);
        }).catch(err => {
          reject(err);
        });
    });
  },
  
  //Use this service to soft delete purpose
  changeBranchStatus: async (body) => {
    return new Promise(function (resolve, reject) {
      conn.BankBranches.update({
        status: body.status
      }, {
        where: { id: body.branchId },
      })
        .then(data => {
          resolve(data);
        }).catch(err => {
          reject(err);
        });
    });
  },
  deleteBranch: async (branchId) => {
    return new Promise(function (resolve, reject) {
      conn.BankBranches.update({
        isdeleted : 1
      },{
        where: { id: branchId },
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
  
  
};
module.exports = BranchDataProvider;
