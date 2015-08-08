var express = require('express'),
	swig    = require('swig'),
	cons    = require('consolidate'),
	fs      = require('fs'),
	uuid    = require('node-uuid'),
	mongoose = require('mongoose'),
	database = require('./config/database'),
	_ = require('underscore'),
	multer  = require('multer'),
	Post = require('./app/models/post');



// configuration ===============================================================
mongoose.connect(database.url, function(err, res){
	if(err) {
		console.log('ERROR: connecting to Database. ' + err);
	} else {
		console.log('Connected to Database');
	}
}); 	// connect to mongoDB database on modulus.io


var env = "dev";
//var env = "prod";

var app      = express(),
	baseData = fs.readFileSync('./base-data.json').toString(),
	server   = require('http').createServer(app),
	io       = require('socket.io').listen(server);

var data = JSON.parse(baseData);

swig.init({
	cache : false
});

// View engine
app.engine('.html', cons.swig);
app.set('view engine', 'html');
app.set('views', './app/views');

// Add POST, PUT, DELETE methods to the app
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.methodOverride());

// Static files
app.use( express.static('./public') );

//Configure the multer
app.use(multer({ dest: './uploads/',
    rename: function (fieldname, filename) {
	    return filename+Date.now();
	},
	onFileUploadStart: function (file) {
	  console.log(file.originalname + ' is starting ...')
	},
	onFileUploadComplete: function (file) {
	  console.log(file.fieldname + ' uploaded to  ' + file.path)
	  done=true;
	}
}));

// Routes
app.get('/posts/', function(req, res){

	Post.find({})
	.exec(function(err, posts){
		var postsAsJson = _.map(posts, function(post){
			return post.toJSON();
		});


		res.send(posts);
		//res.send(data);

		/*res.render('app', {
			user: req.session.passport.user,
			users: users,
			posts: posts
		});*/
	});

	//res.send(data);
});

app.post('/posts', function (req, res){
	req.body.id = uuid.v1();
	//req.body.votes = 0;
	//req.body.image = "/img/img3.jpg";
	//req.body.user  = "Siedrix";

	var post = new Post({
		id: 	    req.body.id,
		title: 	    req.body.title,
		image:		req.body.image,
		username: 	req.body.username,
		tag: 	    req.body.tag,
		votes:	    req.body.votes,
		content: 	req.body.content
	});

	post.save(function(err){
		//debugger;
		if(err){
			console.log('Error al guardar --> '+err);
			res.send(500, err);
		}

		/*app.io.broadcast('post', {
			content: post.content,
			user: req.user.toJSON()
		});
		res.redirect('/app');*/

		data.push(req.body);
		console.log('posts::create', req.body);
		io.sockets.emit('posts::create', req.body);
		res.send(200, {status:"Ok", id: req.body.id});
	});
	
});

app.put('/posts/', function (req, res){
	console.log('Updating', req.body);
	var post;

	for (var i = data.length - 1; i >= 0; i--) {
		post = data[i];

		if(post.id === req.body.id){
			data[i] = req.body;
		}
	}

	console.log('posts::update', req.body);

	io.sockets.emit('posts::update', req.body);

	res.send(200, {status:"Ok"});
});

var home = function (req, res) {
	//debugger;
	res.render('index',{
		posts : data,
		env   : env
	});
};

app.get('/', home);
app.get('/post/:id', home);


server.listen(3000);
console.log('escuchando puerto 3000');