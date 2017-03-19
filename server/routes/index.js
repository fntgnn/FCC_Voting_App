const express = require('express');
const router = express.Router();
const Authentication = require ('../controllers/authentication');
const PollsController = require ('../controllers/polls');
const passportService = require('../services/passport');
const passport = require('passport');

//nn vogliamo usare le sessioni xche usiamo jwt
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

router.get('/', PollsController.getAllPolls);

router.post('/signin', requireSignin, Authentication.signin);
router.post('/signup', Authentication.signup);
router.post('/decode', Authentication.decode);

router.get('/profile', requireAuth, function(req, res){
  res.json({message: 'authenticated'});
});


module.exports = router;
/*module.exports = function(app){
    app.get('/', requireAuth, function(req, res){
          res.send({message: 'Super secret code is ABC123'})
    })

    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
    app.post('/decode', Authentication.decode);

    app.get('/profile', requireAuth, function(req, res){
      res.send({message: 'authenticated'});
    });

}*/
