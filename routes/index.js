var express = require('express');
var router = express.Router();

/* GET home page. */
router
  .get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  })
  .post('/', function (req, res) {
    res.send('Got a POST request')
  })
  .put('/', function (req, res) {
    res.send('Got a PUT request at /user')
  })
  .delete('/', function (req, res) {
    res.send('Got a DELETE request at /user')
  })

module.exports = router;
