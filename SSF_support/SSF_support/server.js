'use strict';
var http = require('http');
var querystring = require('querystring');
var util = require('util');
var port = process.env.PORT || 1339;


http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.url == '/'  && req.method == 'GET') {
        res.writeHeader(200, { 'Content-Type': 'text/html;charset=utf-8' });
        res.end('Here are NCKU SSF\'s support server\n');
    }
    else if (req.url == '/json') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ message: "json servr test" }));
        res.end();
    }
    else if ( req.method == 'POST') {
        if (req.url == '/getTable') {
            let post = '';

            // �q?req��data�ƥ�?�v��?�A�C?������?�D�^��?�u�A�N�֥[��post?�q��
            req.on('data', function (chunk) {
                post += chunk;
            });

            // �bend�ƥ��D?�Z�A�q?querystring.parse?post�ѪR?�u����POST?�D�榡�A�M�Z�V��?�ݪ�^�C
            req.on('end', function () {
                post = querystring.parse(post);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                console.log(post['file']);
                res.end(util.inspect(post));
            });
        }
        else if (req.url == '/getImg') {
            let post = '';

            // �q?req��data�ƥ�?�v��?�A�C?������?�D�^��?�u�A�N�֥[��post?�q��
            req.on('data', function (chunk) {
                post += chunk;
            });

            // �bend�ƥ��D?�Z�A�q?querystring.parse?post�ѪR?�u����POST?�D�榡�A�M�Z�V��?�ݪ�^�C
            req.on('end', function () {
                post = querystring.parse(post);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                console.log(post['file']);
                res.end(util.inspect(post));
            });
        }
    }
}).listen(port);
