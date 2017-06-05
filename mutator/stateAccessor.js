var bot = require('./../data/stateData.json');

exports.setState = function(state, value) {
  bot.states[state] = value;
}

exports.getState = function(state) {
  return bot.states[state];
}
