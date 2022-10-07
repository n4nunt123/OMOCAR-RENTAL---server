'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transportation extends Model {
    static associate(models) {
      // define association here
      Transportation.belongsTo(models.User, {
        foreignKey: "authorId"
      });
      Transportation.belongsTo(models.Type, {
        foreignKey: "typeId"
      });

      Transportation.hasMany(models.Bookmark, {
        foreignKey: "TransportationId"
      });
    }
  }
  Transportation.init({
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
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Description is required`
        },
        notEmpty: {
          msg: `Description is required`
        }
      }
    },
    imgUrl: DataTypes.STRING,
    location: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Price is required`
        },
        notEmpty: {
          msg: `Price is required`
        },
        min: {
          args: 250000,
          msg: `Minimal price is 250000`
        }
      }
    },
    typeId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    status: {
      allowNull: false,
      type:DataTypes.STRING,
      validate: {
        notNull: {
          msg: `Status is required`
        },
        notEmpty: {
          msg: `Status is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Transportation',
  });
  return Transportation;
};
