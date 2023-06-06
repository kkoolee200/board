const Sequelize = require('sequelize');

module.exports = class Attend extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            attendCount: {
                type: Sequelize.INTEGER,
                allowNull: false
              },
            dayTime: {
                type: Sequelize.TEXT,
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Attend',
            tableName: 'attends', 
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Attend.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
    }
};