const Sequelize = require('sequelize');

class Recipe extends Sequelize.Model {
  static init (sequelize, DataTypes) {
    return super.init(
      {
        // (id field is done automatically by Sequelize)
        chocolate: DataTypes.INTEGER,
        coffee: DataTypes.INTEGER,
        milk: DataTypes.INTEGER,
        name: DataTypes.TEXT,
        price: DataTypes.INTEGER,
        sugar: DataTypes.INTEGER
      },
      {
        timestamps: false,
        sequelize
      }
    )
  }
}

module.exports = Recipe;
