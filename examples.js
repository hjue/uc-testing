var APIeasy = require('api-easy'),
  assert = require('assert');;
var suite = APIeasy.describe('api');

suite.discuss('Test Post Json String')     
    .use('local.my.csdn.net', 80)
    .setHeader('Content-Type', 'application/json')
    .post('/test.php', {a:1})
      .expect(200, {a:1})
      
suite.discuss("Test Post Key-Value")
    .use('local.my.csdn.net', 80)
    .setHeader('Content-Type', 'application/x-www-form-urlencoded')    
    .post('/test.php', {a:1})
      .expect(200, {a:1})    
      .expect('check body', function (err, res, body) {
          assert.include(body, 'a');
      })

suite.export(module);