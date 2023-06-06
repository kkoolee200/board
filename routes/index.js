const express = require('express');
const { User, Daily, Comment, PraiseStamp, Feeling, Praise, Stuff, Mission, Attend } = require('../models');

const router = express.Router();

//info page - http://localhost:3000/users
router.get('/users', async (req, res, next) => {
    try {
        const users = await User.findAll({ 
            attributes: ['id', 'name', 'description']
        });
        res.json(users); 
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//info page - http://localhost:3000/dailys
router.get('/dailys', async (req, res, next) => {
    try {
        const dailys = await Daily.findAll({}); //daily 모든 값 찾음
        res.json(dailys);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//info page - http://localhost:3000/comments
router.get('/comments', async (req, res, next) => {
    try {
        const comments = await Comment.findAll({}); //comment 모든 값 찾음
        res.json(comments);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//info page - http://localhost:3000/missions
router.get('/missions', async (req, res, next) => {
    try {
        const missions = await Mission.findAll({}); //mission 모든 값 찾음
        res.json(missions);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//info page - http://localhost:3000/praises
router.get('/praises', async (req, res, next) => {
    try {
        const praises = await Praise.findAll({}); //praise 모든 값 찾음
        res.json(praises);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//info page - http://localhost:3000/praiseStamps
router.get('/praiseStamps', async (req, res, next) => {
    try {
        const praisesStamps = await PraiseStamp.findAll({}); //praiseStamp 모든 값 찾음
        res.json(praisesStamps);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//info page - http://localhost:3000/attends
router.get('/attends', async (req, res, next) => {
    try {
        const attends = await Attend.findAll({}); //attend 모든 값 찾음
        res.json(attends);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//info page - http://localhost:3000/feelings
router.get('/feelings', async (req, res, next) => {
    try {
        const feelings = await Feeling.findAll({}); //feeling 모든 값 찾음
        res.json(feelings);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//info page - http://localhost:3000/stuffs
router.get('/stuffs', async (req, res, next) => {
    try {
        const stuffs = await Stuff.findAll({}); //stuff 모든 값 찾음
        res.json(stuffs);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//info page - http://localhost:3000/boards 
router.get('/boards', async (req, res, next) => { //모든 게시판 정보
    try {
        const users = await User.findAll({ 
            attributes: ['id', 'name', 'description'],
            include: [
                {
                    model: Attend
                },
                {
                    model: Daily
                }, 
                {
                    model: Mission
                },
                {
                    model: Praise
                },
                {
                    model: PraiseStamp
                },
                {
                    model: Feeling
                },
                {
                    model: Stuff
                }
            ]
        });
        res.json(users);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
