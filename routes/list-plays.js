var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  req.playRepository.findAll((error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      console.log(results);
      res.render('list-plays', { plays: results });
    }
  });
});

module.exports = router;
