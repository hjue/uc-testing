var APIeasy = require('api-easy');
	assert = require('assert');

var suite = APIeasy.describe('技能');


suite.discuss('When using the API Skill')
     
var skillid;
suite.use('uc.csdn.net', 80)
    .setHeader('Content-Type', 'application/json')
	 .post('userskill/getbyusername',{username:"tusiji_accept"})
	    .expect(200)
		.expect('获取用户技能 err 0', function (err, res, body) {
	         	var result = JSON.parse(body);
	         	assert.equal(result.err,0);
	       })
	  .post('userskill/savebyskilliduname',{skillid:0,skillname:"css"+Math.random(),username:"tusiji_accept"})
	    .expect(200)
		.expect('添加用户技能 err 0', function (err, res, body) {
	         	var result = JSON.parse(body);
	         	skillid = result.result.SkillID;
	         	assert.equal(result.err,0);
	       })
	   .next()
	   .post('userskill/savebyskilliduname',{skillid:skillid,skillname:"css"+Math.random(),username:"tusiji_accept"})
	    .expect(200)
		.expect('修改用户技能 err 0', function (err, res, body) {
	         	var result = JSON.parse(body);
	         	assert.equal(result.err,0);
	       })
	   .post('userskill/delbyusername',{username:'tusiji_accept',skillid:skillid})
	    .expect(200)
		.expect('删除用户技能 err 0', function (err, res, body) {
	         	var result = JSON.parse(body);
	         	assert.equal(result.err,0);
	       })
	       

  .export(module);