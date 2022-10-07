'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    static associate(models) {
      // define association here
      Type.hasMany(models.Transportation, {
        foreignKey: "typeId"
      });
    }
  }
  Type.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Name is required`
        },
        notEmpty: {
          msg: `Name is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Type',
  });
  return Type;
};