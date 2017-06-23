var tmi = require('tmi.js');
var request = require('request');
var points = require('./helpers/pointHelper');
var raffle = require('./helpers/raffleHelper');
var help = require('./helpers/helpMenu')
var options = require('./config.json');
var client = new tmi.client(options);

client.connect();

setInterval(function() {
  options.channels.forEach(function(res){
    var host = res.substring(1);
    var viewers = [];
    var url = 'https://tmi.twitch.tv/group/user/'+host+'/chatters';
    request(url, function(err, res, body){
      try {
        let json = JSON.parse(body);
        viewers = viewers.concat(json.chatters.moderators);
        viewers = viewers.concat(json.chatters.viewers);
        viewers = viewers.concat(json.chatters.staff);
        viewers = viewers.concat(json.chatters.global_mods);
        viewers = viewers.concat(json.chatters.admins);
        var i = viewers.indexOf(options.identity.username);
        if(i != -1) viewers.splice(i , 1);
        points.addOne(viewers, host);
      }catch(err){console.log("API call failed");}
    });
  })
}, 5000);

client.on("ping", function(){
  client.ping();
});

client.on("chat", function (channel, userstate, message, self){
  if(self) return;
  var result;
  var channel = channel.substring(1);
  var user = userstate.username;
  var startsWith = message.split(" ")[0];
  var arg1 = message.split(" ")[1];
  var arg2 = message.split(" ")[2];

  switch(startsWith) {
    case "!points":
      if (result = points.getPoints(arg1, user, channel)) {
        client.action(channel, result)}
      break;
    case "!give":
      if(result = points.givePoints(arg1, arg2, user, channel)) {
        client.action(channel, result)}
      break;
    case "!leaderboard":
      if(result = points.showLeaderboard(channel)) {
        client.action(channel, result)}
      break;
    case "!bet":
      if(result = points.betGame(arg1, user, channel)) {
        client.action(channel, result)}
      break;
    case "!raffle":
      if(result = raffle.sortRaffle(arg1, user, channel)) {
        client.action(channel, result)}
      break;
    case "!help":
      if(result = help.showHelp(arg1, user)) {
        client.whisper(user, result)}
      break;
  }
});
