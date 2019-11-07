/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'player_video_links',
        {
            player_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'player_info',
                    key: 'user_id',
                },
            },
            link: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            order: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            tableName: 'player_video_links',
        }
    );
};
