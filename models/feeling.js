const Sequelize = require('sequelize'); 

module.exports = class Feeling extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      feeling: {
        type: Sequelize.STRING(100),
        allowNull: false
      }
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Feelings',
      tableName: 'feelings',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    });
  }

  static associate(db) {
    db.Feeling.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
  }
};