var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ZombieSchema   = new Schema({
    zid: String,
    email: String,
    name: String,
    password: String
});

module.exports = mongoose.model('Zombie', ZombieSchema);
