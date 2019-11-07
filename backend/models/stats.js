/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "stats",
    {
      goals: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      assists: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      games_played: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      }
    },
    {
      tableName: "stats"
    }
  );
};
