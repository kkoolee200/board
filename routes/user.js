const express = require('express');
const bcrypt = require('bcrypt')
const User = require('../models/user');
const { Daily, Feeling, Praise, Stuff, PraiseStamp, Mission, Attend } = require('../models');
const { isLoggedIn } = require('./helpers');

const router = express.Router();

router.route('/')
    //사용자 정보 등록 - http://localhost:3000/user/
    .post(async (req, res, next) => {
        const { id, password, name, description } = req.body;

        if (!password) {
            res.send({
                result: 'fail',
                error: ('비밀번호를 입력하세요.')
            })
            return;
        }

        const user = await User.findOne({ where: { id } });
        if (user) {
            res.send({
                result: 'fail',
                error: ('이미 등록된 사용자 아이디입니다.')
            })
            return;
        }

        try {
            const hash = await bcrypt.hash(password, 12);
            await User.create({
                id,
                password: hash,
                name,
                description
            });

            res.send({
                result: 'success',
                error: null
            })
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

//사용자 정보 수정 - http://localhost:3000/user/update/
router.post('/update', isLoggedIn, async (req, res, next) => {
    try {
        const result = await User.update({ //update
            name: req.body.name,
            description: req.body.description
        }, {
            where: { id: req.user.id }
        });

        if (result) {
            res.send({
                result: 'success',
                error: null
            })
            return;
        }
        else {
            res.send({
                result: 'fail',
                error: ('Not updated!')
            })
            return;
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 사용자 정보 삭제 - http://localhost:3000/user/delete
router.get('/delete', isLoggedIn, async (req, res, next) => {
    try {
        const result = await User.destroy({
            where: { id: req.user.id }
        });

        if (result) {
            res.send({
                result: 'success',
                error: null
            })
            return;
        }
        else next('Not deleted!')
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 사용자 포스트 정보 - http://localhost:3000/user/my/dailys
router.get('/my/dailys', isLoggedIn, async (req, res, next) => {
    try {
        const dailys = await Daily.findAll({
            where: { userId: req.user.id }
        });
        res.json(dailys);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 사용자 포스트 정보 - http://localhost:3000/user/my/missions
router.get('/my/missions', isLoggedIn, async (req, res, next) => {
    try {
        const missions = await Mission.findAll({
            where: { userId: req.user.id }
        });
        res.json(missions);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 사용자 포스트 정보 - http://localhost:3000/user/my/praises
router.get('/my/praises', isLoggedIn, async (req, res, next) => {
    try {
        const praises = await Praise.findAll({
            where: { userId: req.user.id }
        });
        res.json(praises);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 사용자 포스트 정보 - http://localhost:3000/user/my/praiseStamps
router.get('/my/praiseStamps', isLoggedIn, async (req, res, next) => {
    try {
        const praiseStamps = await PraiseStamp.findAll({
            where: { userId: req.user.id }
        });
        res.json(praiseStamps);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 사용자 포스트 정보 - http://localhost:3000/user/my/feelings
router.get('/my/feelings', isLoggedIn, async (req, res, next) => {
    try {
        const feelings = await Feeling.findAll({
            where: { userId: req.user.id }
        });
        res.json(feelings);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 사용자 포스트 정보 - http://localhost:3000/user/my/stuffs
router.get('/my/stuffs', isLoggedIn, async (req, res, next) => {
    try {
        const stuffs = await Stuff.findAll({
            where: { userId: req.user.id }
        });
        res.json(stuffs);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 사용자 포스트 정보 - http://localhost:3000/user/my/attends
router.get('/my/attends', isLoggedIn, async (req, res, next) => {
    try {
        const attends = await Attend.findAll({
            where: { userId: req.user.id }
        });
        res.json(attends);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//사용자 정보 - http://localhost:3000/user/my
router.get('/my', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findAll({
            where: { id: req.user.id },
            attributes: ['id', 'name', 'description']
        });
        res.json(user);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
