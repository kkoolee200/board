const Sequelize = require('sequelize'); 

module.exports = class Stuff extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      stuff: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Stuff',
      tableName: 'stuffs', 
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    });
  }

  static associate(db) {
    db.Stuff.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
  }
};