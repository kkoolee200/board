const Sequelize = require('sequelize'); 

module.exports = class Praise extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      praise: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Praise',
      tableName: 'praises', 
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    });
  }

  static associate(db) {
    db.Praise.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
  }
};