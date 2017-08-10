var helpList = require('./../data/helpData.json');
var viewer = require('./../mutator/viewerAccessor');

exports.showHelp = function(command, user, channel){
  if (command == undefined) {
    var returnStr = "Commands available (use !help <command> for details): ";
    for (var x in helpList){
      if(helpList[x]["hostOnly"] && (user != channel)){}
      else {
        returnStr = returnStr + "!"+x+" ";
      }
    }
    return returnStr;
  } else {
    if (command in helpList && !(helpList[command]["hostOnly"] && (user != channel))) {
      if (command == 'aboutme') {
        return helpList[command]["args"] + " -- "+ helpList[command]["details"];
      }
      return helpList[command]["args"] + " -- "+ helpList[command]["details"]+ " (?=optional)"
    } else {
      return command+" is not a command"
    }
  }
}

exports.setMods = function(mods, host) {
  mods.push(host);
  mods.forEach(function(val){
    viewer.setValue(val, true, "mod", host);
  });
}

exports.removeMods = function(channel){
  viewer.setAll(false, "mod", channel)
}
