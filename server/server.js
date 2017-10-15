var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors());
app.options('*', cors());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var bcrypt = require('bcrypt');

var port = process.env.PORT || 8080;
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/zombiepages');

var Zombie = require("./app/models/zombies");

var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'zombiepages api!' });
});
app.use('/api', router);

router.route('/zombies/create').post(function(req, res){
  var z = new Zombie();
  z.zid = 3;
  z.name = req.body.user.username;
  z.email = req.body.user.email;
  bcrypt.hash(req.body.user.password, 10, function(err, hash) {
    if (err) { res.send(err); }
    else{
      z.password = hash;
      z.save(function (saveErr){
        if (saveErr) { res.send(saveErr); }
        res.json({message: "new zombie infected!", profile: z});
      });
    }
  });
});

router.route('/zombies').post(function(req,res){
  Zombie.find({email: req.body.user.email}, function(err, zombie) {
    if (err) { res.send(err); }
    var pw = zombie[0].password;
    //res.json({zombie: zombie, hash: pw});
    bcrypt.compare(req.body.user.password, pw, function(hashErr, result) {
      if (hashErr) { res.send(hashErr); }
      if(result) {
        res.json({message: 'authenticated!'});
      } else {
        res.send({message: "password incorrect"});
      }
    });
  });
});
router.route('/posts').post(function(req, res){
  var zombie = req.body.user.zid;
  var token = req.body.user.token;
  var message = req.body.post.message;

});

app.listen(port);
console.log('Magic happens on port ' + port);
