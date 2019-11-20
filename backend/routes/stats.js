const express = require('express');
const models = require('../models');
const router = express.Router();
const multer = require('multer');
const getFields = multer();
const checkAuth = require('../middleware/check-auth');

const Stat = models.stats;

router.get('/:user_id', (req, res, next) => {
    Stat.findAll({
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
                goals: results[0].dataValues.goals,
                assists: results[0].dataValues.assists,
                games_played: results[0].dataValues.games_played,
                user_id: results[0].dataValues.user_id,
            });
        });
});

router.get('', (req, res, next) => {
    Stat.findAll({
        attributes: ['goals', 'assists', 'games_played', 'user_id'],
    })
        .catch(err => {
            res.status(500).json({
                error: err,
            });
        })
        .then(result => {
            res.status(201).json({
                message: 'Stats fetched successfully',
                stats: result,
            });
        });
});

router.post(
    '/:add',
    getFields.any(),
    checkAuth,
    ///:add added for testing
    (req, res, next) => {
        Stats.create({
            goals: req.body.goals,
            assists: req.body.assists,
            games_played: req.body.games_played,
            user_id: req.userData.user_id,
        })
            .catch(err => {
                res.status(500).json({
                    error: err,
                });
            })
            .then(results => {
                res.status(201).json({
                    message: 'Stats Added!',
                    stats: {
                        goals: results.dataValues.goals,
                        assists: results.dataValues.assists,
                        games_played: results.dataValues.games_played,
                        user_id: results.dataValues.user_id,
                    },
                });
            });
    }
);

//update
router.put('/:user_id', getFields.any(), checkAuth, (req, res, next) => {
    Stats.update(
        {
            goals: req.body.goals,
            assists: req.body.assists,
            games_played: req.body.games_played,
            user_id: req.userData.user_id,
        },
        {
            where: {
                user_id: req.userData.user_id,
                //or user_id: req.userData.userId ?
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
                    message: 'Stats updated successfully',
                });
            } else {
                res.status(401).json({
                    message: 'Not Authorized!',
                });
            }
        });
});

module.exports = router;
