'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Fight.belongsTo(models.Team)
      Fight.belongsTo(models.User)
      Fight.hasMany(models.Competitor)
      Fight.belongsToMany(models.Restaurant, {through: models.Competitor})
    }
  };
  Fight.init({
    name: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    TeamId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Fight',
  });
  return Fight;
};