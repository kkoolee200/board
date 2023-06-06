const express = require('express');
const Comment = require('../models/comment');
const router = express.Router();

router.route('/')
    // daily 포스트 등록 - http://localhost:3000/comment/
    .post(async (req, res, next) => {
        const {dailyId, comment } = req.body;
    try {
        await Comment.create({ dailyId, comment });
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

//comment 정보 수정 - http://localhost:3000/comment/update/
router.post('/update', async (req, res, next) => {
    try {
        const result = await Comment.update({ 
            comment: req.body.comment
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

// comment 정보 삭제 - http://localhost:3000/comment/delete/a
router.get('/delete/:id', async (req, res, next) => {
    try {
        const result = await Comment.destroy({ 
            where: { id: req.params.id  } 
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

module.exports = router;