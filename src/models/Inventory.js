const Sequelize = require('sequelize');

class Inventory extends Sequelize.Model {
  static init (sequelize, DataTypes) {
    return super.init(
      {
        // (id field is done automatically by Sequelize)
        chocolate: DataTypes.INTEGER,
        coffee: DataTypes.INTEGER,
        milk: DataTypes.INTEGER,
        sugar: DataTypes.INTEGER
      },
      {
        // Conventient options; otherwise our table in MySQL would be called 'inventories'
        freezeTableName: true,
        timestamps: false,
        sequelize
      }
    )
  }
}

module.exports = Inventory;
