var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function() {
	return {
		show:function(req, res) {
			User.findOne({email: req.params.email}, function(err, results) {
				if(err) {
					console.log(err);
				} else {
					res.json(results);
				};
			});
		},
		add: function(req, res) {
			User.create(req.body, function (err, results){
				if(err){
					console.log('something went wrong');
				} else {
					res.json(results);
				};
			});
		}
	};
})();