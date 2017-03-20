const mongoose = require('mongoose');
const Poll = require('../models/poll');


exports.createPoll = function(req, res, next){
    const { name, user } = req.body;
    var { options } = req.body;

    options = options.map(item => {
      return { option: item, votes: 0};
    });

    const newPoll = new Poll({
      name,
      options,
      user
    });
    newPoll.save(function(err){
      if(err) { return next(); }
      res.json( newPoll );
    });
}

exports.getAllPolls = function(req, res, next){
  Poll.find({}, function(err, docs){
    if(err) { return next(err); }
    res.json(docs);
  });
}

exports.getSinglePoll = function(req, res, next){
    const id = mongoose.Types.ObjectId(req.params.poll);
    Poll.findOne({_id: id}, function(err, doc){
      if(err) { return next(err); }
      res.json(doc);
    });
}

exports.votePoll = function(req, res, next){
  const id = mongoose.Types.ObjectId(req.params.poll);
  const option = req.body.option;
  //Need to do this http://stackoverflow.com/questions/13999232/increment-a-key-value-within-an-array-of-objects-with-mongodb-mongoose-driver
  var update = {$inc: {}};
  update.$inc['options.' + option + ".votes"] = 1;

  Poll.update({_id: id}, update, function(err, updated){
    if(err)
      next(err);
    res.json(updated);
  });

}
