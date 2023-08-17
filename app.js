const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const {
  render, redirect
} = require("express/lib/response");
const mongoose = require("mongoose");
const _ = require('lodash');
const { toPlainObject } = require("lodash");

const homeContent = "Dreams are mysterious things. Whether they're good or bad, tricks of memory or flights of fantasy, humans have been studying dreams and what they mean for a long time. Today, dreams play a role in the work of psychologists, scientists, artists, and even mathematicians! What role do dreams play in your life? You might be able to figure that out if you start keeping a dream journal.";

const contactContent = "Having journaling ideas that you can use to write in your daily journal is important. Everyone gets writer's block from time to time, so having a list of ideas can help you to jump start your creativity.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-karina:112545@cluster0.gbw5o.mongodb.net/journalDB?retryWrites=true&w=majority");

// mongodb+srv://admin-karina:112545@cluster0.gbw5o.mongodb.net/journalDB  original
// mongodb+srv://admin-karina:112545@cluster0.gbw5o.mongodb.net/journalDB?retryWrites=true&w=majority


const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);


app.get('/', function (req, res) {

  Post.find({}, function (err, posts) {
    res.render("home", {
      startingContent: homeContent,
      posts: posts
    })
  });
});

app.get('/why-write', function (req, res) {
  res.render('why-write')
});

app.get('/contact', function (req, res) {
  res.render('contact', {
    contactContent: contactContent
  })
});

app.get('/compose', function (req, res) {
  res.render('compose')
});

app.post('/compose', function (req, res) {
  const post = new Post({
    title: req.body.newTitle,
    content: req.body.newPost
  });

  post.save(function (err) {
    if (!err) {
      res.redirect('/');
    }
  })
});

app.get("/posts/:postId", (req, res) => {
  
  Post.findOne(
    {_id: req.params.postId}, (err, post) => {
    res.render("post", {
      title: post.title,
      content: post.content
    })
  });
});

// app.post('/posts/:id/delete', (req, res) => {
  
//   Post.deleteOne(
//     {_id: req.params.id})
//    res.redirect('/')
// });


app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
