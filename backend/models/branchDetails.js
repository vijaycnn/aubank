'use strict';
const {  Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BranchDetails extends Model {
    
    static associate(models) {
      // define association here
    }
  }
  BranchDetails.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    branchId: {
      allowNull: false,     
      type: DataTypes.INTEGER,
    },
    managerName: {
      allowNull: true, 
      type: DataTypes.STRING,
    },
    managerNameHindi: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    address: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    addressHindi: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    contactNumber: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    contactNumberHindi: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    emailHindi: {
      allowNull: true,
      type: DataTypes.STRING,
    },

    regionalOfficer: {
      allowNull: true, 
      type: DataTypes.STRING,
    },
    regionalOfficerHindi: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    regionalName: {
      allowNull: true, 
      type: DataTypes.STRING,
    },
    regionalNameHindi: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    regionalAddress: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    regionalAddressHindi: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    regionalContactNumber: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    regionalContactNumberHindi: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    regionalEmail: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    regionalEmailHindi: {
      allowNull: true,
      type: DataTypes.STRING,
    },
/////////////////////
    principalOfficer: {
      allowNull: true, 
      type: DataTypes.STRING,
    },
    principalOfficerHindi: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    principalName: {
      allowNull: true, 
      type: DataTypes.STRING,
    },
    principalNameHindi: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    principalAddress: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    principalAddressHindi: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    principalContactNumber: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    principalContactNumberHindi: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    principalEmail: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    principalEmailHindi: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    //////////////
    complainUrl: {
      allowNull: true, 
      type: DataTypes.STRING,
    },
    complainUrlHindi: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    complainEmail: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    complainEmailHindi: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    complainAddress: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    complainAddressHindi: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    ///////////////////////////
    officerName: {
      allowNull: true, 
      type: DataTypes.STRING,
    },
    branchName: {
      allowNull: true, 
      type: DataTypes.STRING,
    },
    branchMangerName: {
      allowNull: true, 
      type: DataTypes.STRING,
    },
    branchMangerContact: {
      allowNull: true, 
      type: DataTypes.STRING,
    },
    branchServiceMangerName: {
      allowNull: true, 
      type: DataTypes.STRING,
    },
    branchServiceMangerContact: {
      allowNull: true, 
      type: DataTypes.STRING,
    },
    policeName: {
      allowNull: true, 
      type: DataTypes.STRING,
    },
    policeContact: {
      allowNull: true, 
      type: DataTypes.STRING,
    },
    fireName: {
      allowNull: true, 
      type: DataTypes.STRING,
    },
    fireContact: {
      allowNull: true, 
      type: DataTypes.STRING,
    },
    hospitalName: {
      allowNull: true, 
      type: DataTypes.STRING,
    },
    hospitalContact: {
      allowNull: true, 
      type: DataTypes.STRING,
    },
    ambulanceName: {
      allowNull: true, 
      type: DataTypes.STRING,
    },
    ambulanceContact: {
      allowNull: true, 
      type: DataTypes.STRING,
    },
    ombudsmanPost: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    ombudsmanPostHindi: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    ombudsmanName: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    ombudsmanNameHindi: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    ombudsmanAddress: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    ombudsmanAddressHindi: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    ombudsmanContact: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    ombudsmanContactHindi: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    ombudsmanEmail: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    ombudsmanEmailHindi: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    status:{
      type:DataTypes.INTEGER,
      defaultValue:1
    },
    isdeleted:{
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    createdBy: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    updatedAt: {
        allowNull: true,
        type: DataTypes.DATE
    },
    updatedBy: {
        allowNull: true,
        type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'BranchDetails',
  });
  return BranchDetails;
};