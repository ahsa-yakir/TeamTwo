/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'institution_scout_cross_table',
        {
            scout_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'scout_info',
                    key: 'user_id',
                },
            },
            institution_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            tableName: 'institution_scout_cross_table',
        }
    );
};
