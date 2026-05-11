'use strict';
const {  Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BankBranches extends Model {
    
    static associate(models) {
      // define association here
    }
  }
  BankBranches.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    branchCode: {
      allowNull: false,     
      type: DataTypes.STRING,
    },
    serialNumber:{
      allowNull: false,     
      type: DataTypes.STRING,
    },
    category: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'Form',
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
    modelName: 'BankBranches',
  });
  return BankBranches;
};