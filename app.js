const path = require('path');

const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const { sequelize } = require('./models');

const passport = require('passport');
const passportConfig = require('./passport');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const dailyRouter = require('./routes/daily');
const commentRouter = require('./routes/comment');
const missionRouter = require('./routes/mission');
const praiseRouter = require('./routes/praise');
const praiseStampRouter = require('./routes/praiseStamp');
const feelingRouter = require('./routes/feeling');
const stuffRouter = require('./routes/stuff');
const attendRouter = require('./routes/attend');
const indexRouter = require('./routes');

dotenv.config();
passportConfig();

const app = express();
app.set('port', process.env.PORT || 3000);

sequelize.sync({ force: false }) 
  .then(() => console.log('데이터베이스 연결 성공'))
  .catch(err => console.error(err));

app.use( 
    morgan('dev'), 
    express.static(path.join(__dirname, 'public')),
    express.json(),
    express.urlencoded({ extended: false }), 
    cookieParser(process.env.SECRET),
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SECRET,
        cookie: {
            httpOnly: true,
            secure: false
        },
        name: 'session-cookie'
    })
);

app.use(passport.initialize());
app.use(passport.session()); 

app.use('/auth', authRouter); 
app.use('/user', userRouter);
app.use('/daily', dailyRouter);
app.use('/comment', commentRouter);
app.use('/mission', missionRouter);
app.use('/praise', praiseRouter);
app.use('/praiseStamp', praiseStampRouter);
app.use('/feeling', feelingRouter);
app.use('/stuff', stuffRouter);
app.use('/attend', attendRouter);
app.use('/', indexRouter);

app.use((req, res, next) => {
    if (req.user) res.send(`${req.user.name}님  안녕!`);
    else res.send(`로그인은 사랑!`);
});

app.use((err, req, res, next) => { 
    console.error(err);
    res.status(500).send(err);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
