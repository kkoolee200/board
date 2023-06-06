const express = require('express');
const Daily = require('../models/daily');

const { isLoggedIn } = require('./helpers');

const router = express.Router();

router.route('/')
    // daily 포스트 등록 - http://localhost:3000/daily/
    .post(isLoggedIn, async (req, res, next) => {
        const { content } = req.body;
        const userId = req.user.id;

        try {
            await Daily.create({ userId, content }); 
            res.send({
                result: 'success',
                error: null
            })
        } catch (err) {
            res.send({
                result: 'fail',
                error: '실패하였습니다.'
            })
        }
    });

//daily 정보 수정 - http://localhost:3000/daily/update/
router.post('/update', isLoggedIn, async (req, res, next) => {
    try {
        const result = await Daily.update({ 
            content: req.body.content
        }, {
            where: { id: req.body.id }
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
                error: ('No updated!')
            })
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// daily 정보 삭제 - http://localhost:3000/daily/delete
router.get('/delete', isLoggedIn, async (req, res, next) => {
    try {
        const result = await Daily.destroy({ 
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

// 사용자 daily 정보 - http://localhost:3000/daily/my
router.get('/my', isLoggedIn, async (req, res, next) => {
    try {
        const daily = await Daily.findAll({
            where: { userId: req.user.id }
        });
        res.json(daily);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
