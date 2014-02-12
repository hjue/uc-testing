var APIeasy = require('api-easy');
	assert = require('assert');

var suite = APIeasy.describe('用户标记');


suite.discuss('When using the API mark')
     
var mark_id = 0;
suite.use('uc.csdn.net', 80)
    .setHeader('Content-Type', 'application/json')
    .post('UserMark/getbyusername',{username:'tusiji_accept'})
	    .expect(200)
		.expect('查询标记 err 0', function (err, res, body) {
	         	var result = JSON.parse(body);
	         	assert.equal(result.err,0);
	       })
	.post('UserMark/savebyusername',{username:'tusiji_accept',markid:0,markname:'oschina',marktype:10,markurl:'http://www.oschina.net'})
	    .expect(200)
		.expect('添加标记 err 0', function (err, res, body) {
	         	var result = JSON.parse(body);
	         	assert.equal(result.err,0);
	         	mark_id = result.markid;
	       })
	 .next()
	 .post('UserMark/savebyusername',{username:'tusiji_accept',markid:mark_id,markname:'github',marktype:10,markurl:'http://www.oschina.net'})
	    .expect(200)
		.expect('编辑标记 err 0', function (err, res, body) {
	         	var result = JSON.parse(body);
	         	assert.equal(result.err,0);
	       })
	 .next()
	 .post('UserMark/delbyusername',{username:'tusiji_accept',markid:mark_id,marktype:10})
	    .expect(200)
		.expect('删除标记 err 0', function (err, res, body) {
	         	var result = JSON.parse(body);
	         	assert.isTrue(result.err>0);
	       })
       
  .export(module);