let Comment = require('../models/comment');


let commentModel = require('../models/comment-model');

class CommentService {
  constructor() {
    this.commentCache = {};
  }

  getComments(articleId){
    if(this.commentCache[articleId]) {
      return Promise.resolve(this.commentCache[articleId]);
    }

    return new Promise((resolve, reject) => {
      commentModel.find({approved: true, articleId: articleId}).sort({created: 'asc'}).exec((err, comments) => {
        
        if(err) {
        //   loggerService.logError(err);
          reject('There was an error fetching comments');
          return;
        }

        if(comments.length === 0) {
          resolve([]);
          return;
        }
   
        this.commentCache[articleId] = this.buildCommentBranchRecursive(null, comments);  
        resolve(this.commentCache[articleId]);
      });
    });
  }

  buildCommentBranchRecursive(parentId, allComments) {
    let siblings = allComments.filter(c => c.parentId === parentId);
    let comments = [];    
 
    siblings.forEach((node) => {
      var comment = new Comment(node.author, node.text, node._id.toString(), parentId, node.created);
      comment.children = this.buildCommentBranchRecursive(comment.id, allComments);
      comments.push(comment);
    });

    return comments;
  }
}
module.exports = CommentService;