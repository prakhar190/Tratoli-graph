var express = require('express');
var router = express.Router();
var superagent = require('superagent');
var alasql = require('alasql');
var each = require('async-each-series');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tratoli graph' });
});

router.get('/packagebehaviour_api', function(req, res, next) {
  const request = superagent.get('https://www.tratoli.com/packagebehaviour_api/?days=' + req.query.days)
    request.send().then(response => {
      var ipData = alasql('SELECT ip AS keyData, COUNT(*) AS occuring FROM ? GROUP BY ip', [response.body]);
      var locationData = alasql('SELECT location AS keyData, COUNT(*) AS occuring FROM ? GROUP BY location', [response.body]);
      var customerData = alasql('SELECT customer_name AS keyData, COUNT(*) AS occuring FROM ? GROUP BY customer_name', [response.body]);
      var clickDate = []
      each(response.body, function(value, next) {
        clickDate.push({clickDate: value.click_time.split(' ')[0]});
        next();
      }, function (err) {
        console.log('finished');
        var clickDateData = alasql('SELECT clickDate AS keyData, COUNT(*) AS occuring FROM ? GROUP BY clickDate', [clickDate]);
        res.json({ipData: ipData, locationData: locationData, customerData: customerData, clickDateData:clickDateData})
      });
    }, err => {
      console.log(err.response.body);
    });
});

module.exports = router;
