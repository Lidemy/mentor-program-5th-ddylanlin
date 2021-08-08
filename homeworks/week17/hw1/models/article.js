// eslint-disable-next-line
'use strict';
const {
  Model // eslint-disable-next-line
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Article.belongsTo(models.User)
    }
  }
  Article.init({
    category: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    username: DataTypes.STRING,
    is_deleted: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'Article'
  })
  return Article
}
