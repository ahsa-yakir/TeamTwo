const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const postRoutes = require('./routes/posts');
const player_infoRoutes = require('./routes/player_info');
const statRoutes = require('./routes/stats');
const userRoutesasdad = require('./routes/user');

const app = express();
const Sequelize = require('sequelize');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});

app.use('/api/posts', postRoutes);
app.use('/api/player_info', player_infoRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
