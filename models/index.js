const Sequelize = require('sequelize');
const User = require('./user'); 
const Daily = require('./daily'); 
const Comment = require('./comment'); 
const Mission = require('./mission'); 
const Praise = require('./praise'); 
const PraiseStamp = require('./praiseStamp'); 
const Feeling = require('./feeling'); 
const Stuff = require('./stuff'); 
const Attend = require('./attend');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env]; 
const db = {};


const sequelize = new Sequelize(
    config.database, config.username, config.password, config 
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Daily = Daily;
db.Comment = Comment;
db.Mission = Mission;
db.Praise = Praise;
db.PraiseStamp = PraiseStamp;
db.Feeling = Feeling;
db.Stuff = Stuff;
db.Attend = Attend;

User.init(sequelize); 
Daily.init(sequelize);
Comment.init(sequelize);
Mission.init(sequelize);
Praise.init(sequelize);
PraiseStamp.init(sequelize);
Feeling.init(sequelize);
Stuff.init(sequelize);
Attend.init(sequelize);

User.associate(db); 
Daily.associate(db); 
Comment.associate(db); 
Mission.associate(db); 
Praise.associate(db); 
PraiseStamp.associate(db); 
Feeling.associate(db); 
Stuff.associate(db); 
Attend.associate(db);

module.exports = db;