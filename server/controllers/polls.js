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
