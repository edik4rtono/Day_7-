const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const Op = require('sequelize').Op

const User = require('../models').user
const Profile = require('../models').profile
const Article = require('../models').article
const sequelize = require('../models').sequelize

/* GET users listing. */

router.post('/login', async (req, res, next) => {
  if (req.body.username === 'mul14' && req.body.password === 'secret') {
    res.json({
      message: 'Authentication success',
      data: {
        username: 'mul14',
        name: 'Mulia',
        level: 'satpam',
        menus: [
          {path: '/', label: 'Home'},
          {path: '/camera', label: 'Camera'},
          {path: '/gudang', label: 'Gudang'},
        ]
      }
    })
  } else {
    res.status(401).json({
      message: 'Unauthorized'
    })
  }
})

router.get('/', async (req, res, next) => {
  const result = await User.findAll({
    include: Article
  })

  // const result = await Article.findAll({
  //   include: User
  // })

  // const result = await Profile.findAll({
  //   include: User
  // })

  setTimeout(() => {
    res.json(result)
  })
});

router.post('/', async (req, res, next) => {
  // Prepared statement
  const sql = `INSERT INTO users
              (name, email, password, created_at, updated_at)
              VALUES (?, ?, ?, ?, ?) RETURNING *`


  const [[result]] = await sequelize.query(sql, {
    replacements: [
      req.body.name,
      req.body.email,
      req.body.password,
      new Date,
      new Date
    ],
    type: sequelize.QueryTypes.INSERT,
  })

  console.log(result)

  // const user = await User.create({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: bcrypt.hashSync(req.body.password),
  //   created_at: new Date,
  //   updated_at: new Date
  // })

  setTimeout(() => {
    res.json(result)
  }, 5000)
});

module.exports = router;
