var users = require('./../controllers/users.js')

module.exports = function(app) {
	app.get('/getcustomer/:email', function(req, res) {
		users.show(req, res);
	})
	app.post('/addUser', function(req, res){
		users.add(req, res);
	});
}
