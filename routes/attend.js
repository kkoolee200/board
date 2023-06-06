const dayjs = require('dayjs');
const express = require('express');
const Attend = require('../models/attend');

const { isLoggedIn } = require('./helpers');

const router = express.Router();

router.route('/')
    // Attend 등록 - http://localhost:3000/attend/
    .get(isLoggedIn, async (req, res, next) => {
        const userId = req.user.id;

        const user = await Attend.findOne({ where: { userId } });
        if (user) {
            res.send({
                result: 'fail',
                error: ('해당 아이디는 출석 수를 이미 세고 있습니다.')
            })
            return;
        }

        try {
            await Attend.create({
                userId,
                attendCount: 1,
                dayTime: dayjs().format("YYYY. MM. DD HH:mm:ss")
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

//Attend 값 증가 - http://localhost:3000/attend/update/
router.get('/update', isLoggedIn, async (req, res, next) => {
    try {
        const userId = req.user.id;
        let count = await Attend.findOne({
            where: { userId },
            attributes: ['attendCount']
        });

        const result = await Attend.update({
            dayTime: dayjs().format("YYYY. MM. DD HH:mm:ss"),
            attendCount: count.attendCount + 1
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
                error: ('No updated!')
            })
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// Attend 정보 삭제 - http://localhost:3000/attend/delete/a
router.get('/delete', isLoggedIn, async (req, res, next) => {
    try {
        const result = await Attend.destroy({ //해당 id값과 관련된 정보 삭제
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

// 사용자 attend 정보 - http://localhost:3000/attend/my
router.get('/my', isLoggedIn, async (req, res, next) => {
    try {
        const attend = await Attend.findAll({
            where: { userId: req.user.id }
        });
        res.json(attend);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
