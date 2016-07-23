var Movie = require('../app/controllers/movie');
var User = require('../app/controllers/user');
var Index = require('../app/controllers/index');
var Comment = require('../app/controllers/comment');
var Category = require('../app/controllers/category');
	module.exports = function(app){
	
	//pre handler user
	app.use(function(req , res , next){
		//console.log(req.session.user) ;
		var _user = req.session.user ; 
	
		app.locals.user = _user ;
		
		next() ; 
	})


	//index
	app.get('/' , Index.index) ;
	app.get('/results' , Index.search) ; 
	//User
	app.get('/login' , User.showLogin) ;
	app.get('/signup' , User.showSignup) ;
	app.post('/user/signup' , User.signup) ;
	app.post('/user/login' , User.login) ;
	app.get('/admin/user/list' , User.loginRequired , User.adminRequired , User.list) ;
	app.get('/logout' , User.logout) ;
	//Movie
	app.get('/detail/:id' , Movie.detail) ;
	app.get('/admin/movie/list' , User.loginRequired , User.adminRequired , Movie.list) ;
	app.get('/admin' , User.loginRequired , User.adminRequired , Movie.new) ;
	app.get('/admin/movie/update/:id' , User.loginRequired , User.adminRequired , Movie.update) ;
	app.post('/admin/movie' , User.loginRequired , User.adminRequired ,Movie.savePoster ,  Movie.save) ;
	app.delete('/admin/movie/delete/' , User.loginRequired , User.adminRequired , Movie.del) ;
	//Comment
	app.post('/user/comment' , User.loginRequired , Comment.saveComment) ;
	//Category
	app.get('/admin/category/new', User.loginRequired, User.adminRequired, Category.new);
  	app.post('/admin/category', User.loginRequired, User.adminRequired, Category.save);
  	app.get('/admin/category/list', User.loginRequired, User.adminRequired, Category.list);
}