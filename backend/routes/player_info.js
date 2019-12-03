const express = require('express');
const models = require('../models');
const router = express.Router();
const multer = require('multer');
const getFields = multer();
const checkAuth = require('../middleware/check-auth');

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
            console.log(results);
            // noinspection JSUnresolvedVariable
            res.status(200).json(results[0].dataValues);
        });
});

router.post(
    '/:add',
    getFields.any(),
    checkAuth,
    ///:add added for testing purposes
    (req, res, next) => {
        Player_info.create({
            user_id: req.userData.user_id,
            name: req.body.name,
            last_login: req.body.last_login,
            birthdate: req.body.birthdate,
            high_school: req.body.high_school,
            profile_picture: req.body.profile_picture,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
        })
            .catch(err => {
                res.status(500).json({
                    error: err,
                });
            })
            .then(results => {
                res.status(201).json({
                    message: 'Player Info Added!',
                    player_info: {
                        user_id: results.dataValues.user_id,
                        name: results.dataValues.name,
                        last_login: results.dataValues.last_login,
                        birthdate: results.dataValues.birthdate,
                        high_school: results.dataValues.high_school,
                        profile_picture: results.dataValues.profile_picture,
                        city: results.dataValues.city,
                        state: results.dataValues.state,
                        country: results.dataValues.country,
                    },
                });
            });
    }
);

//update
router.put('/:user_id', getFields.any(), checkAuth, (req, res, next) => {
    Player_info.update(
        {
            user_id: req.userData.user_id,
            name: req.body.name,
            last_login: req.body.last_login,
            birthdate: req.body.birthdate,
            high_school: req.body.high_school,
            profile_picture: req.body.profile_picture,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
        },
        {
            where: {
                user_id: req.userData.user_id,
            },
        }
    )
        .catch(err => {
            res.status(500).json({
                error: err,
            });
        })
        .then(result => {
            if (result[0] > 0) {
                res.status(200).json({
                    message: 'Player Info updated successfully',
                });
            } else {
                res.status(401).json({
                    message: 'Not Authorized!',
                });
            }
        });
});

module.exports = router;
