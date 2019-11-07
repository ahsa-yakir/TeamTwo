/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('player_info', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 'nextval(player_user_id_seq::regclass)',
      primaryKey: true,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    high_school: {
      type: DataTypes.STRING,
      allowNull: true
    },
    profile_picture: {
      type: "BYTEA",
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'player_info'
  });
};
