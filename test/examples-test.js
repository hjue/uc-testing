var APIeasy = require('api-easy'),
  assert = require('assert');

var suite = APIeasy.describe('api');

suite.discuss('Test Post Json String')     
    .use('127.0.0.1', 8000)
    .setHeader('Content-Type', 'application/json')
    .post('/tests', {a:1})
      .expect(200, {a:1})
      
suite.discuss("Test Post Key-Value")
    .use('127.0.0.1', 8000)
    .setHeader('Content-Type', 'application/x-www-form-urlencoded')    
    .post('/tests', {a:1})
      .expect(200, {a:1})    
      .expect('check body', function (err, res, body) {
          assert.include(body, 'a');
      })

suite.export(module);


