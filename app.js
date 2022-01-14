//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const {
  render
} = require("express/lib/response");
const {
  forEach,
  lowerCase
} = require("lodash");
const _ = require('lodash');



const homeStartingContent = "Dreams are mysterious things. Whether they're good or bad, tricks of memory or flights of fantasy, humans have been studying dreams and what they mean for a long time. Today, dreams play a role in the work of psychologists, scientists, artists, and even mathematicians! What role do dreams play in your life? You might be able to figure that out if you start keeping a dream journal.";

const contactContent = "Having journaling ideas that you can use to write in your daily journal is important. Everyone gets writer's block from time to time, so having a list of ideas can help you to jump start your creativity.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));



let posts = [];

app.get('/', function (req, res) {
  res.render('home', {
    homeContent: homeStartingContent,
    postContent: posts
  });
});

app.get('/why-write', function (req, res) {
  res.render('why-write')
})

app.get('/contact', function (req, res) {
  res.render('contact', {
    contactContent: contactContent
  })
})

app.get('/compose', function (req, res) {
  res.render('compose')
})

app.post('/compose', function (req, res) {
  const post = {
    title: req.body.newTitle,
    body: req.body.newPost
  }

  posts.push(post);
  res.redirect('/');
})

app.get('/posts/:postName', function (req, res) {

  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(post => {
    const storedTitle = _.lowerCase(post.title);

    if (_.kebabCase(storedTitle) === _.kebabCase(requestedTitle)) {
      res.render('post', {
        title: post.title,
        content: post.body
      })
    }
  });
});


app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
