let mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var commentSchema = new mongoose.Schema(
    {
      author: {type: String},
      text: {type: String},
      approved: {type: Boolean, default: false},
      articleId: {type: String},
      parentId: {type: String},
      created: {type: Date, default: Date.now }
    },
    { versionKey: false }
);

module.exports = mongoose.model('Comments', commentSchema);