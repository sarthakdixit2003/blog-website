const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
const blogRoutes = require('./routes/blogRoutes')

const app = express();

const dbURI = 'mongodb+srv://ninja123:ninja123@cluster0.hynl1hm.mongodb.net/blogs?retryWrites=true&w=majority'
mongoose.connect(dbURI)
	.then((result) => {
		console.log("connected");
		app.listen(3000);
	})
	.catch((err) => console.log(err));

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
	res.redirect('/blogs');
});

app.get("/about", (req, res) => {
	app.disable("etag");
	res.statusCode = 200;
	res.render("about", { title: "About" });
});

app.use('/blogs', blogRoutes);

app.use((req, res) => {
	app.disable("etag");
	res.statusCode = 404;
	res.render("404", { title: "Error 404" });
});
