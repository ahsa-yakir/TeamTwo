const express = require('express');
const models = require('../models');
const router = express.Router();
const Player_info = models.player_info;

router.get('', (req, res, next) => {
    Player_info.findAll({
        attributes: [
            'user_id',
            'name',
            'last_login',
            'birthdate',
            'high_school',
            'profile_picture',
            'city',
            'state',
            'country',
        ],
    })
        .catch(err => {
            res.status(500).json({
                error: err,
            });
        })
        .then(result => {
            res.status(201).json({
                message: 'Player_info fetched successfully',
                player_info: result,
            });
        });
});

router.get('/:user_id', (req, res, next) => {
    Player_info.findAll({
        where: {
            user_id: req.params.user_id,
        },
    })
        .catch(err => {
            res.status(500).json({
                error: err,
            });
        })
        .then(results => {
            // noinspection JSUnresolvedVariable
            res.status(200).json(results[0].dataValues);
        });
});

module.exports = router;
