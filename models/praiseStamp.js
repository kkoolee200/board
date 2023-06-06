const Sequelize = require('sequelize'); 

module.exports = class PraiseStamp extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      praiseStamp: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    }, {
      sequelize,
      timestamps: false,
      modelName: 'PraiseStamp',
      tableName: 'praiseStamps',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    });
  }

  static associate(db) {
    db.PraiseStamp.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
  }
};