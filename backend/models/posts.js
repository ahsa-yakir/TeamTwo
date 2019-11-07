/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'posts',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            imagepath: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            userid: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            tableName: 'posts',
        }
    );
};
