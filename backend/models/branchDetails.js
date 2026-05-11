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