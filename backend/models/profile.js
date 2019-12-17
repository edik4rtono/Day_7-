'use strict';

module.exports = (sequelize, DataTypes) => {
  const profile = sequelize.define('profile', {
    email: {
      type: DataTypes.STRING,
      references: 'profile',
      referencesKey: 'email',
    },
    data: DataTypes.TEXT,
  }, {
    timestamps: false,
    underscored: true,
  });
  profile.associate = function(models) {
    profile.belongsTo(models.user, {
      foreignKey: 'email'
    })
  };
  return profile;
};
