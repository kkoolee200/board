const Sequelize = require('sequelize');

module.exports = class Mission extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            mission: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            missionResult: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Mission',
            tableName: 'missions',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Mission.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
    }
};