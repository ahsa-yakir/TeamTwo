const express = require('express');
const models = require('../models');
const router = express.Router();
const Player_info = models.player_info;


router.get('', (req, res, next) => {
    Player_info.findAll({
        attributes: ['user_id', 'name', 'last_login', 'birthdate', 'high_school', 'profile_picture',
    'city', 'state', 'country'],
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
            res.status(200).json({
                user_id: results[0].dataValues.user_id,
                name: results[0].dataValues.name,
                last_login: results[0].dataValues.last_login,
                birthdate: results[0].dataValues.birthdate,
                high_school: results[0].dataValues.high_school,
                profile_picture: results[0].dataValues.profile_picture,
                city: results[0].dataValues.city,
                state: results[0].dataValues.state,
                country: results[0].dataValues.country,
            });
        });  
});


module.exports = router;