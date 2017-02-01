var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'ELO Plays',
    blueImage: 'images/testgif1.gif',
    redImage: 'images/testgif1.gif'
   });
});

module.exports = router;
