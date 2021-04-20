'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Competitor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Competitor.belongsTo(models.User)
      Competitor.belongsTo(models.Restaurant)
      Competitor.belongsTo(models.Fight)
    }
  };
  Competitor.init({
    usedAt: DataTypes.DATE,
    points: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    RestaurantId: DataTypes.INTEGER,
    FightId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Competitor',
  });
  return Competitor;
};