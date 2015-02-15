var express = require('express');
var router = express.Router();

/* Get userlist */
router.get('/userlist', function (req,res){
	var db = req.db;
	db.collection('userlist').find().toArray(function (err, items){
		res.json(items);
	});
});

/* Post to add user */
router.post('/adduser', function (req, res){
	var db = req.db;
	db.collection('userlist').insert(req.body, function (err, result){
		res.send(
			(err === null) ? { msg : ''} : { msg : err}
		);	
	});
});

/* Delete to to deleteuser */
router.delete('/deleteuser/:id', function(req, res){
	var db = req.db;
	var userToDelete = req.params.id;
	db.collection('userlist').removeById(userToDelete, function(err, result){
		res.send((result === 1) ? { msg: ''} : { msg : 'error' + err});
	})
});
module.exports = router;
