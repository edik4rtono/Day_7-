'use strict';

module.exports = (sequelize, DataTypes) => {
  const article = sequelize.define('article', {
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
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
  });
  article.associate = function(models) {
    article.belongsTo(models.user, {
      foreignKey: 'user_id'
    })
  };
  return article;
};
