const Sequelize = require('sequelize'); // user 테이블에 대응되는 시퀄라이즈 모델 생성

//user 테이블
module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {//칼럼
                type: Sequelize.STRING(100),
                allowNull: false,
                primaryKey: true
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.User.hasMany(db.Daily, { foreignKey: 'userId', sourceKey: 'id', onDelete: 'cascade' });
        db.User.hasMany(db.Mission, { foreignKey: 'userId', sourceKey: 'id', onDelete: 'cascade' });
        db.User.hasMany(db.Praise, { foreignKey: 'userId', sourceKey: 'id', onDelete: 'cascade' });
        db.User.hasOne(db.PraiseStamp, { foreignKey: 'userId', sourceKey: 'id', onDelete: 'cascade' });
        db.User.hasMany(db.Feeling, { foreignKey: 'userId', sourceKey: 'id', onDelete: 'cascade' });
        db.User.hasMany(db.Stuff, { foreignKey: 'userId', sourceKey: 'id', onDelete: 'cascade' });
        db.User.hasOne(db.Attend, { foreignKey: 'userId', sourceKey: 'id', onDelete: 'cascade' });
    }
};
