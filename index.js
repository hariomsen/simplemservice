let express = require('express')
let app = express();

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/neo');

let CommentService = require('./service/comment-service');

let commentService = new CommentService();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/comment/:articleId', (req, res) => {
  commentService.getComments(req.params.articleId)
                .then((comments) => {
                  res.json(comments);
                })
                .catch((error) => {
                  res.json(error);
                });
});
 
app.listen(3000);