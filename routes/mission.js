const express = require('express');
const Mission = require('../models/mission');

const { isLoggedIn } = require('./helpers');

const router = express.Router();

router.route('/')

    // mission 등록 - http://localhost:3000/mission/
    .post(isLoggedIn, async (req, res, next) => {
        const { mission } = req.body;
        const userId = req.user.id;

        try {
            await Mission.create({
                userId,
                mission,
                missionResult : false
            });
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

//mission 결과 업데이트 - http://localhost:3000/mission/update/
router.get('/update/:id', isLoggedIn, async (req, res, next) => {
    try {
        const id = req.params.id;
        let mission = await Mission.findOne({ 
            where: { id }, 
            attributes: ['missionResult']
        });

        const result = await Mission.update({ 
            missionResult: !mission.missionResult
        }, {
            where: { id } 
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

// mission 정보 삭제 - http://localhost:3000/mission/delete/a
router.get('/delete', isLoggedIn, async (req, res, next) => {
    try {
        const result = await Mission.destroy({ 
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

// 사용자 mission 정보 - http://localhost:3000/mission/my
router.get('/my', isLoggedIn, async (req, res, next) => {
    try {
        const mission = await Mission.findAll({
            where: { userId: req.user.id }
        });
        res.json(mission);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
