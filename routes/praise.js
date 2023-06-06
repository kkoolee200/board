const express = require('express');
const Praise = require('../models/praise');

const { isLoggedIn } = require('./helpers');

const router = express.Router();

 router.route('/')
    // praise 등록 - http://localhost:3000/praise/
    .post(isLoggedIn, async (req, res, next) => {
        const { praise } = req.body;
        const userId = req.user.id

        try {
            await Praise.create({ userId, praise }); 
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

//praise 정보 수정 - http://localhost:3000/praise/update/
router.post('/update', isLoggedIn, async (req, res, next) => {
    try {
        const result = await Praise.update({ //update
            praise: req.body.praise
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

// praise 정보 삭제 - http://localhost:3000/praise/delete/a
router.get('/delete', isLoggedIn, async (req, res, next) => {
    try {
        const result = await Praise.destroy({ 
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

// 사용자 praise 정보 - http://localhost:3000/praise/my
router.get('/my', isLoggedIn, async (req, res, next) => {
    try {
        const praise = await Praise.findAll({
            where: { userId: req.user.id }
        });
        res.json(praise)
    } catch (err) {
        console.error(err);
        next(err);
    }
});

 module.exports = router;
