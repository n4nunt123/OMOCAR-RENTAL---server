'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    static associate(models) {
      Bookmark.belongsTo(models.User, {
        foreignKey: "UserId"
      });
      Bookmark.belongsTo(models.Transportation, {
        foreignKey: "TransportationId"
      });
    }
  }
  Bookmark.init({
    UserId: DataTypes.INTEGER,
    TransportationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bookmark',
  });
  return Bookmark;
};