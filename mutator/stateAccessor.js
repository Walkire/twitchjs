var bot = require('./../data/stateData.json');

exports.setState = function(game, option, value, channel) {
  bot[channel][game][option] = value;
}

exports.getState = function(game, option, channel) {
  return bot[channel][game][option];
}
