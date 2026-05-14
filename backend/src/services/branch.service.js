const { QueryTypes } = require('sequelize');

let BranchDataProvider = {

  getBranchCount: async (userType =false, branchIds =false) => {
    try {
      // console.log('search', search);
      let filter = { isdeleted: 0 };
      if(userType != 'admin'){   
        filter = {...filter,
          id : { [conn.Sequelize.Op.in]: branchIds }
         }
      }

      const result = await conn.BankBranches.findAll({
        attributes: [
          "status",
          [
            conn.Sequelize.literal(
              `COUNT(*) FILTER (WHERE "status" = 1 and "isdeleted" = 0)`
            ),
            "activeCount",
          ],
          [
            conn.Sequelize.literal(
              `COUNT(*) FILTER (WHERE "status" = 0 and "isdeleted" = 0)`
            ),
            "inactiveCount",
          ],
        ],
        where: filter,
        group: ["status"],
        raw: true,
        // logging: console.log
      });

      return result.map((item) => ({
        activeCount: Number(item.activeCount) || 0,
        inactiveCount: Number(item.inactiveCount) || 0
      }));
    } catch (error) {
      throw error;
    }
  },
  
  getBranchList: async (req, all = false, userType =false, branchIds =false) => {
    return new Promise(async function (resolve, reject) {
      // console.log('search', search);
      let offset = req.query.offset;
      let limit = req.query.perPage;
      
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
        limit:limit,
        offset:offset,
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
  checkExistBranchSerialNumber: async (serialNumber, id = 0) => {
    return new Promise(function (resolve, reject) {
      conn.BankBranches.findOne({
        where: { 
          serialNumber : serialNumber.trim(),
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
  
  ///////BranchDetails ///////////
  getDetailsById: async (branchId) => {
    return new Promise(function (resolve, reject) {
      conn.BranchDetails.findOne({
        attributes: [ "*"],
        where: { branchId: branchId, isdeleted: 0 },
        raw:true
      })
        .then(data => {
          if (data !== null) {
            resolve(data);
          } else {
            resolve(false);
          }
        }).catch(err => {
          reject(err);
        });
    });
  },
  checkExistBranchInfo: async (branchId) => {
    return new Promise(function (resolve, reject) {
      conn.BranchDetails.findOne({
        where: { 
          branchId : branchId,
          isdeleted: 0,     
        },
      })
        .then(data => {
          if (data == null) {
            resolve(false);
          } else if (branchId && data) {
            resolve(true);
          }
        }).catch(err => {
          reject(err);
        });
    });
  },
  createBranchDetails: async (body) => {
    return new Promise(function (resolve, reject) {
      conn.BranchDetails.create(body)
        .then(data => {
          resolve(data);
        }).catch(err => {
          reject(err);
        });
    });
  },
  updateBranchDetails: async (body, detailId) => {
                console.log('postBody Service', detailId);

    return new Promise(function (resolve, reject) {
      conn.BranchDetails.update(body, {
        where: { id: detailId },
      })
        .then(data => {
          resolve(data);
        }).catch(err => {
          reject(err);
        });
    });
  },
  

};
module.exports = BranchDataProvider;
