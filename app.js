var tmi = require('tmi.js');
var request = require('request');
var points = require('./helpers/pointHelper');
var options = require('./config.json');
var url = 'https://tmi.twitch.tv/group/user/walkire/chatters';
var client = new tmi.client(options);

client.connect();

setInterval(function() {
  var viewers = [];
  request(url, function(err, res, body){
    let json = JSON.parse(body);
    viewers = viewers.concat(json.chatters.moderators);
    viewers = viewers.concat(json.chatters.viewers);
    viewers = viewers.concat(json.chatters.staff);
    viewers = viewers.concat(json.chatters.global_mods);
    viewers = viewers.concat(json.chatters.admins);
    var i = viewers.indexOf(options.identity.username);
    if(i != -1) viewers.splice(i , 1);
    points.addOne(viewers);
  })
}, 5000);

client.on("ping", function(){
  client.ping();
});

client.on("chat", function (channel, userstate, message, self){
  if(self) return;
  var result;
  var user = userstate.username;
  var startsWith = message.split(" ")[0];
  var arg1 = message.split(" ")[1];
  var arg2 = message.split(" ")[2];

  switch(startsWith) {
    case "!points":
      if (result = points.getPoints(arg1, user)) {
        client.action(channel, result); }
      break;
    case "!give":
      if(result = points.givePoints(arg1, arg2, user)) {
        client.action(channel, result); }
      break;
    case "!leaderboard":
      if(result = points.showLeaderboard()) {
        client.action(channel, result)}
      break;
    default:
  }
});
