var express = require('express')
var path = require('path')
var port = process.env.PORT || 3000
var bodyParser = require('body-parser')
var app = express()
var mongoose = require('mongoose')
var logger = require('morgan') ;
var cookieParser = require('cookie-parser')
var cookieSession = require('cookie-session')
//var mongoStore = require('connect-mongo')(cookieSession) ;
var dbUrl = 'mongodb://localhost/movie' ;
var multipart = require('connect-multiparty')
var fs = require('fs') ; 

mongoose.connect(dbUrl) ; 
app.set('views','./app/views/pages')
app.use(express.static(path.join(__dirname , 'public')))  //加载静态资源
//app.use(bodyParser.urlencoded({extended:true}))   //用于表单提交时数据的格式化

app.use(bodyParser())
//models loading
var models_path = __dirname + '/app/models' ; 
var walk = function(path){
	fs
		.readdirSync(path)
		.forEach(function(file){
			var newPath = path + '/' + file ; 
			var stat = fs.statSync(newPath) ;

			if(stat.isFile()){
				if(/(.*)\.(js|coffee)/.test(file)) {
					require(newPath) ; 
				}
			}
			else if(stat.isDirectory()) {
				walk(newPath) ; 
			}
		})
}
walk(models_path) ; 
app.use(multipart())
app.use(bodyParser.json())
app.locals.moment = require('moment')
app.set('view engine' , 'jade')
app.use(cookieSession({
	name: 'session' ,
	keys:['key1','key2'] 
})) ;
//配置生产环境下的控制台打印信息
if( 'development' === app.get('env')){
	//console.log(' development enviroment is coming') ;
	app.set('showStackError' , true) ;
	//express 4.0之后logger中间件已经分离出来，现在名叫morgan
	//app.use(express.logger(':method :url :status')) ;
	app.use(logger()) ;
	app.locals.pretty = true ; //设置浏览器观看源码没有压缩
	mongoose.set('debug' , true) ; 
}
require('./config/route')(app) ; 
app.listen(port) ;
console.log('moview start on ' + port);



