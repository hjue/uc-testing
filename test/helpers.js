/*
curl for testing http server:

    curl http://localhost:8000/tests -H "Content-Type:application/json" -d {\"a\":1} 

    curl http://localhost:8000/tests -H "Content-Type:text/html" -d {\"a\":1} 

    curl http://localhost:8000/tests -H "Content-Type:application/x-www-form-urlencoded" -d a=1

*/

var http = require('http'),
  director = require('director');

var helpers = exports;
  

http.ServerResponse.prototype.json = function (code, headers, data) {
  if (!data && typeof headers === 'object') {
    data = headers;
    headers = null;
  }
  
  if (headers && Object.keys(headers).length) {
    for (var key in headers) {
      this.setHeader(key, headers[key]);
    }
  }
  
  this.writeHead(code);
  this.end(data ? JSON.stringify(data) : '');
};

helpers.startServer = function (port) {
  var token, router = new director.http.Router().configure({ 
    strict: false,
    async: true
  });

  router.get('/tests', function () {
    this.res.json(200, {}, { ok: true });
  });
  
  router.post('/tests',function () {
    console.log(this.req.body);
    this.res.json(200, {}, this.req.body);
  });
  
  router.post('/redirect', function () {
    this.res.json(302, { 'Location': 'http://localhost:8000/login' }, this.req.body);
  });
  
  router.post('/upload', function () {
    this.res.json(200, {}, this.req.body);
  });
  
  router.get('/login', function () {
    if (!token) {
      token = Math.floor(Math.random() * 100);
    }
    
    this.res.json(200, {}, { token: token });
  });
  
  router.before('/restricted', function (next) {
    return parseInt(this.req.headers['x-test-authorized'], 10) !== token 
      ? next(new director.http.NotAuthorized())
      : next();
  });
  
  router.get('/restricted', function () {
    this.res.json(200, {}, { authorized: true });
  });
    
  http.createServer(function (req, res) {
    req.body = '';
    req.on('data', function (chunk) { req.body += chunk });
    router.dispatch(req, res, function (err) {
      if (err) {
        res.json(err.status, err.headers, err.body);
      }
    });
  }).listen(port);
};

helpers.startServer(8000);