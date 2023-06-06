const express = require('express');
const Feeling = require('../models/feeling');

const { isLoggedIn } = require('./helpers');

const router = express.Router();

router.route('/')
    // feeling 포스트 등록 - http://localhost:3000/feeling/
    .post(isLoggedIn, async (req, res, next) => {
        const {feeling} = req.body;
        const userId = req.user.id;

        try {
            await Feeling.create({ userId, feeling }); 
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

//feeling 정보 수정 - http://localhost:3000/feeling/update/
router.post('/update', isLoggedIn, async (req, res, next) => {
    try {
        const result = await Feeling.update({ //update
            feeling: req.body.feeling
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

// feeling 정보 삭제 - http://localhost:3000/feeling/delete/
router.get('/delete', isLoggedIn, async (req, res, next) => {
    try {
        const result = await Feeling.destroy({ 
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

// 사용자 feeling 정보 - http://localhost:3000/feeling/my
router.get('/my', isLoggedIn, async (req, res, next) => {
    try {
        const feeling = await Feeling.findAll({
            where: { userId: req.user.id },
            attributes: ['id','userID','feeling'] 
        });
        res.json(feeling);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
