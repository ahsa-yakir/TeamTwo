/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('institution_info', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'institution_info'
  });
};
