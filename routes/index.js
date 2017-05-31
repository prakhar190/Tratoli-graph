var express = require('express');
var router = express.Router();
var superagent = require('superagent');
var alasql = require('alasql');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tratoli graph' });
});

router.get('/packagebehaviour_api', function(req, res, next) {
  const data = superagent.get('https://www.tratoli.com/packagebehaviour_api/?days=1')
    data.send().then(response => {
      // console.log(response.body);
      // res.json(response.body);
      var data = alasql('SELECT ip, COUNT(*) AS occuring FROM ? GROUP BY ip', [response.body]);
      res.json(data)
      console.log('>>>>>>>>.');
      console.log(data);
      console.log('>>>>>>>>>');
    }, err => {
      console.log(err.response.body);
    });
});

module.exports = router;
