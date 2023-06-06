const express = require('express');
const PraiseStamp = require('../models/praiseStamp');

const { isLoggedIn } = require('./helpers');

const router = express.Router();

router.route('/')
    // praiseStamp 등록 - http://localhost:3000/praiseStamp/
    .get(isLoggedIn, async (req, res, next) => {
        const userId = req.user.id;

        const user = await PraiseStamp.findOne({ where: { userId } });
        if (user) {
            res.send({
                result: 'fail',
                error: ('해당 아이디는 칭찬도장판이 이미 존재합니다.')
            })
            return;
        }
        try {
            await PraiseStamp.create({
                userId,
                praiseStamp: 1
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

//praiseStamp 값 증가 - http://localhost:3000/praiseStamp/upCount/
router.get('/upCount', isLoggedIn, async (req, res, next) => {
    try {
        const userId = req.user.id;

        let count = await PraiseStamp.findOne({
            where: { userId },
            attributes: ['praiseStamp']
        });

        const result = await PraiseStamp.update({ //update
            praiseStamp: count.praiseStamp + 1 //기존 카운트에서 1 더함
        }, {
            where: { userId }
        });

        if (result) {
            res.send({
                result: 'success',
                error: null
            })
        }
        else {
            res.send({
                result: 'fail',
                error: ('No upCount!')
            })
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// praiseStamp 정보 삭제 - http://localhost:3000/praiseStamp/delete/a
router.get('/delete', isLoggedIn, async (req, res, next) => {
    try {
        const result = await PraiseStamp.destroy({ //해당 id값과 관련된 정보 삭제
            where: { userId: req.user.id }
        });

        if (result) {
            res.send({
                result: 'success',
                error: null
            })
        }
        else {
            res.send({
                result: 'fail',
                error: ('No deleted!')
            })
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 사용자 praiseStamp 정보 - http://localhost:3000/praiseStamp/my
router.get('/my', isLoggedIn, async (req, res, next) => {
    try {
        const praiseStamp = await PraiseStamp.findAll({
            where: { userId: req.user.id }
        });
        res.json(praiseStamp);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
