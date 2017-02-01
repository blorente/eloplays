var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  req.playRepository.addPlay('Faker me', 'images/testgif1.gif', (error, inserted) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(JSON.stringify(inserted));
    }
  });
});

module.exports = router;
