const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const Account = new Schema({
  username: String,
  password: String,
  created: { type: Date, default: Date.now }
});

Account.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, 10);
}

Account.methods.validateHash = function(hash) {
  return bcrypt.compareSync(hash, this.password);
}

module.exports = mongoose.model('account', Account);
