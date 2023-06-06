const express = require('express');
const Stuff = require('../models/stuff');

const { isLoggedIn } = require('./helpers');

const router = express.Router();

 router.route('/')    
    // stuff 등록 - http://localhost:3000/stuff/
    .post(isLoggedIn, async (req, res, next) => {
        const { stuff } = req.body;
        const userId = req.user.id;

        try {
            await Stuff.create({ userId, stuff }); 
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
//stuff 정보 수정 - http://localhost:3000/stuff/update/
router.post('/update', isLoggedIn, async (req, res, next) => {
    try {
        const result = await Stuff.update({ 
            stuff: req.body.stuff
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

// stuff 정보 삭제 - http://localhost:3000/stuff/delete/a
router.get('/delete', isLoggedIn, async (req, res, next) => {
    try {
        const result = await Stuff.destroy({ 
            where: { userId: req.params.userId }
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

// 사용자 stuff 정보 - http://localhost:3000/stuff/a
router.get('/my', isLoggedIn, async (req, res, next) => {
    try {
        const stuff = await Stuff.findAll({
            where: { userId: req.user.id },
            attributes: ['id','userID','stuff'] 
        });
        res.json(stuff);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
