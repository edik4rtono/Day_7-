'use strict';

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_at',
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at',
    },
  }, {
    timestamps: false,
    underscored: true,
    defaultScope: {
      attributes: {
        exclude: ['password']
      },
    }
  });
  user.associate = function(models) {
    user.hasMany(models.article, {
      foreignKey: 'user_id'
    })

    user.hasOne(models.profile, {
      foreignKey: 'email'
    })
  };
  return user;
};
