/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "player_preferred_institutions",
    {
      player_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "player_info",
          key: "user_id"
        }
      },
      institution_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {
      tableName: "player_preferred_institutions"
    }
  );
};
