const Sequelize = require('sequelize'); 

module.exports = class Daily extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      }
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Daily',
      tableName: 'dailies', 
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    });
  }

  static associate(db) {
    db.Daily.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
    db.Daily.hasMany(db.Comment, { foreignKey: 'dailyId', sourceKey: 'id', onDelete: 'cascade' });
  }
};