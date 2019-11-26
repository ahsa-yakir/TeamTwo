const express = require('express');
const models = require('../models');
const router = express.Router();
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
            console.log(results);
            res.status(200).json(results[0].dataValues);
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

module.exports = router;
