const fs = require('fs')
const path = require('path')
const util = require('util');
const mkdir = util.promisify(fs.mkdir);
const nodemailer = require("nodemailer");
const Queue = require('bull');
const csvParse = require('csv-parse/lib/sync')


const sequelize = require('../models').sequelize

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/mail-queue', async (req, res) => {

  const mailQueue = new Queue('mail queue')

  mailQueue.add({
    from: req.body.from || 'mul14.net@gmail.com',
    to: req.body.to || 'mul14.net@gmail.com',
    subject: req.body.subject || 'Lorem ipsum',
    text: req.body.message || 'Hello World!',
    // html: "<b>Hello world?</b>" // html body
  })

})


router.post('/mail', async (req, res) => {


  console.log('asup email euy')
  const transporter = nodemailer.createTransport({
    // host: "localhost",
    // port: 2525,

    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "2c1ca6b34c599b",
      pass: "c14170b535335d"
    }
  });

  const info = await transporter.sendMail({
    from: req.body.from || 'mul14.net@gmail.com',
    to: req.body.to || 'mul14.net@gmail.com',
    subject: req.body.subject || 'Lorem ipsum',
    text: req.body.message || 'Hello World!',
    // html: "<b>Hello world?</b>" // html body
  }).catch((err, info) => {
    console.error(err)
    console.info(info)
  });

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.json(
    nodemailer.getTestMessageUrl(info)
  )


})


router.post('/upload', async (req, res) => {

  req.files.file.map((file, index) => {
    console.log(index)

    const filename = req.body.name[index]
    const ext = path.extname(file.name)
    const targetFilename = filename + ext

    file.mv('uploads/' + targetFilename, (err) => {
      if (err)
        return res.status(500).send(err);
    })
  })

  res.json({
    message: 'File has been uploaded!',
    // data: req.files,
  });
});



router.get('/download/:filename', async (req, res) => {
  // await mkdir('folder')

  res.sendFile(process.cwd() + '/uploads/' + req.params.filename)
})

router.get('/download-pdf', async (req, res) => {
  res.download(process.cwd() + '/uploads/dummy.pdf')
})

router.get('/preview-pdf', async (req, res) => {
  res.sendFile(process.cwd() + '/uploads/dummy.pdf')
})


router.get('/csv', async (req, res) => {

  const file = fs.readFileSync(process.cwd() + '/uploads/master_personil.csv')

  const csvContent = file.toString()

  const parsed = csvParse(csvContent)

  console.log(parsed)

  for (let i = 1; i < parsed.length; i++) {
    $sql = 'INSERT INTO master_personil (npp, nama_lengkap, email_internet) VALUES (?, ?, ?)'
    const [[result]] = await sequelize.query($sql, {
      replacements: [parsed[i][0], parsed[i][1], parsed[i][21]],
      type: sequelize.QueryTypes.INSERT
    })

    console.log(result)
  }

  res.end()
})

router.get('/view-html', async (req, res) => {
  const html = `
    <div>NAMA ORANG: ME</div>
    <div>AGE: 322</div>
    <div>NAMA ORANG: ME</div>
    <div>NAMA ORANG: ME</div>
  `
  res.send(html)
})

router.get('/create-pdf', async (req, res) => {

  const { spawn } = require('child_process');
  const pdf = spawn('/usr/local/bin/wkhtmltopdf', [
    'http://localhost:3000/view-html',
    process.cwd() + '/uploads/output' + Date.now() + '.pdf'
  ]);

  pdf.on('close', code => {
    console.log(`child process exited with code ${code}`);
  });

  res.end()
})


module.exports = router;
