/* eslint-disable */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lottery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Lottery.init({
    prize: DataTypes.STRING,
    desc: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    image: DataTypes.STRING,
    probability: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Lottery',
  });
  return Lottery;
};