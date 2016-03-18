var express = require('express');
var path = require('path');
var compress = require('compression');
var cors = require('express-cors');
var graph = require('fbgraph');
var config = require('./../config');
var request = require('request');


var access_token;
var fbUrl = 'https://graph.facebook.com/';

graph.setVersion("2.5");
var app = express();

app.use(cors({origin: 'http://localhost:3000'}));
app.use(compress());
app.use(express.static(path.join(__dirname + './../')));



app.get('/', (req, res) => {
	res.sendFile('index.html');
})

app.listen(4000, () => {
	console.log('server spinning on port 4000!');
})

app.get('/auth/facebook', (req, res) => {

	if (!req.query.code) {
	    var authUrl = graph.getOauthUrl({
	        "client_id":     config.client_id,
	        "redirect_uri":  config.redirect_uri,
    	});
	
		if (!req.query.error) { 
	      res.redirect(authUrl);
	    } else { 
	      res.send('access denied');
	    }
	    return;
	}

	graph.authorize({
	      "client_id":      config.client_id,
	      "client_secret":  config.client_secret,
	      "redirect_uri":   config.redirect_uri,
	      "code":           req.query.code
	  }, (err, facebookRes) => {
	  	if(facebookRes.access_token){
		  	access_token = facebookRes.access_token;
		  	console.log('FB RES1: ', access_token);
	  	}
	    res.redirect('/fb');
	  }
	);
})

app.get('/fb', (req, res) => {
	// console.log('fb res2: ', res)
	var headers = {Authorization: 'OAuth ' + access_token}
	var options = {
		url: fbUrl + 'search/?q='+req.query.q+'&type=page',
		headers: headers
	}
	
	new Promise((resolve, reject) => {
		request(options, (error, response, body) => {
			var pages = JSON.parse(body).data;
			resolve(pages);
		})
	})
	.then((pages) => {
		var images = pages.map((element) => {
				var options2 = {
					url: fbUrl + '/' + element.id +'/?fields=photos{images}',
					headers: headers
				}
				request(options2,  (error, response, body) => {
					console.log('in images res: ', JSON.parse(body));
					return body;
				})
			})
		if(images.length === pages.length){
			return images;
		}
	})
	.then((images) => {
		console.log(images)
		res.send(images)
	})
})















