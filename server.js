/*
ini planing belum selesai :D
*/

const app = require('express')();
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
	console.log(req.params);
	console.log(req.query);
	res.send("<h1>Hello World!</h1>");
});

//endpoin bot-api : yourappname.herokuapp.com/bot<tokem>/methodName
//endpoin user-api : yourappname.herokuapp.com/user<tokem>/methodName
app.get('/:token/:method', (req, res) => {
	console.log(req.params);
	console.log(req.query);
	res.send("<h1>Hello World!</h1>");
});

app.post('/', (req, res) => {
	console.log(req);
});

app.listen(process.env.PORT || 5000);