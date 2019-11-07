/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'scout_info',
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'user',
                    key: 'user_id',
                },
            },
            institution_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            tableName: 'scout_info',
        }
    );
};
