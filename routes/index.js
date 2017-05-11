var express = require('express');
var fs = require('file-system');
var router = express.Router();
var mongo = require('mongodb');
var monk = require('monk');


var watson = require('watson-developer-cloud');

var conversation = watson.conversation({
  username: 'caf2c86f-70f8-4e83-8a3b-31409d5dea56',
  password: 'jd1dFOGQjkTT',
  version: 'v1',
  version_date: '2017-04-14'
});


var context = {};

router.get('/firstcall', function(req, res, next) {
	
  					conversation.message({
  					workspace_id: '43f286ca-2146-428f-af8d-f20e96f57b91',
  				 	input: {'text': "" },
  						
						},  function(err, response) {
  										if (err)
    										console.log('error:', err);
  										else
										{
										  i = 0 ;
										  context = response.context;
										  response.output.text = response.output.text + " ";
    									  res.send(response.output);										  
										}
									     });

                                       
					});
					

					
router.post('/consecutivecalls', function(req, res) {
					console.log("request received");
					conversation.message({
  					workspace_id: '43f286ca-2146-428f-af8d-f20e96f57b91',
  				 	input: {'text': req.body.question },
  						context: context
						},  function(err, response) {
  										if (err)
    										console.log('error:', err);
  										else
										{
										  context = response.context;
										  console.log("server hit");
										  response.output.text = response.output.text + " ";
    									  res.send(response.output);
										}
						});
});

    									  
										  
router.get('/', function(req,res,next) { 
	res.render('conversation1') ;
});
module.exports = router;
