var tmi = require('tmi.js');
var request = require('request');
var points = require('./helpers/pointHelper');
var raffle = require('./helpers/raffleHelper');
var games = require('./helpers/minigameHelper');
var help = require('./helpers/utils')
var options = require('./config.json');
var client = new tmi.client(options);
var startup = true;

client.connect();

setInterval(function() {
  options.channels.forEach(function(res){
    var host = res.substring(1);
    if(startup){
      help.removeMods(host);
      startup = false;
    }
    var viewers = [];
    var mods = [];
    var url = 'https://tmi.twitch.tv/group/user/'+host+'/chatters';
    request(url, function(err, res, body){
      try {
        let json = JSON.parse(body);
        viewers = viewers.concat(json.chatters.moderators);
        viewers = viewers.concat(json.chatters.viewers);
        viewers = viewers.concat(json.chatters.staff);
        viewers = viewers.concat(json.chatters.global_mods);
        mods = mods.concat(json.chatters.moderators);
        viewers = viewers.concat(json.chatters.admins);
        var i = viewers.indexOf(options.identity.username);
        if(i != -1) viewers.splice(i , 1);
        points.addOne(viewers, host);
        help.setMods(mods, host);
      }catch(err){ console.log(err); }
    });
  })
}, 10000);

client.on("ping", function(){
  client.ping();
});

client.on("chat", function (channel, userstate, message, self){
  if(self) return;
  var result;
  var channel = channel.substring(1);
  var user = userstate.username;
  var startsWith = message.split(" ")[0];
  var args = message.split(" ");

  switch(startsWith) {
    case "!points":
      if (result = points.getPoints(args[1], user, channel))
        client.action(channel, result)
      break;
    case "!give":
      if(result = points.givePoints(args[1], args[2], user, channel))
        client.action(channel, result)
      break;
    case "!leaderboard":
      if(result = points.showLeaderboard(channel))
        client.action(channel, result)
      break;
    case "!bet":
      if(result = points.betGame(args[1], user, channel))
        client.action(channel, result)
      break;
    case "!raffle":
      if(result = raffle.sortRaffle(args[1], user, channel))
        client.action(channel, result)
      break;
    case "!help":
      if(result = help.showHelp(args[1], user, channel))
        client.whisper(user, result)
      break;
    case "!roulette":
      client.action(channel, "places the revolver to "+user+"'s head");
      setTimeout(function() {
        if(result = games.roulette(user, channel))
          if(result.charAt(0) == '@') {
            client.timeout(channel, user, 30)
            result = result.substr(1);
          }
          client.action(channel, result);
      }, 1750);
      break;
    case "!8ball":
      if(result = games.eightBall(args[1]))
        client.action(channel, result);
      break;
  }
});
