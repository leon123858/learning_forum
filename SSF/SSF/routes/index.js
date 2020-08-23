'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (_req, res) {
    res.render('Page1', { title: '<h1>Express</h1>', num: 3 });
});
router.get('/CB/direct_to_3', function (_req, res) {
    res.render('Page3', { header: "主題", data: [[1348,1864,1684],[1684,68,16,198],[64684,468,4684]], i:0 });
});
router.post('./SAN/sign_in', function (_req, res) {
    res.render('Page1', {});
});
router.post('./SAN/register', function (_req, res) {
    res.render('Page1', {});
});
module.exports = router;
