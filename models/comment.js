class Comment {

    constructor (author,text,id,parentId,created) {
      this.id = id;
      this.author = author;
      this.text = text;
      this.parentId = parentId;
      this.created = created;
      this.children = [];
    }
  }
  
  module.exports = Comment;