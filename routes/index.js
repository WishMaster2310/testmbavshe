var express = require('express');
var router = express.Router();
var sdata = require("../datasource/sdata.json");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {ctx: sdata});
});

router.get('/evolution', function(req, res, next) {
  res.render('evolution', {ctx: sdata});
});

router.get('/conditions', function(req, res, next) {
  res.render('conditions', {ctx: sdata});
});

router.get('/intensive', function(req, res, next) {
  res.render('intensive', {ctx: sdata});
});


router.get('/contacts', function(req, res, next) {
  res.render('contacts', {ctx: sdata});
});


router.get('/speakers', function(req, res, next) {
  res.render('speakers', {ctx: sdata});
});


router.get('/schedule', function(req, res, next) {
  res.render('schedule', {ctx: sdata});
});


router.get('/reg', function(req, res, next) {
  res.render('reg', { title: 'Express'});
});

router.get('/faq', function(req, res, next) {
  res.render('faq', {ctx: sdata});
});

router.get('/events', function(req, res, next) {
  res.render('events', {ctx: sdata});
});

router.get('/location', function(req, res, next) {
  res.render('location', {ctx: sdata});
});


router.get('/partners', function(req, res, next) {
  res.render('partners', {ctx: sdata});
});
module.exports = router;
