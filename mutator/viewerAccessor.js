var jsonfile = require('jsonfile');
var viewer = require("./../data/viewerData.json");

exports.setValue = function(user, value, option, channel) {
  if (viewer[channel] == undefined) return false;
  if(!(user in viewer[channel])) return false;
  if (option == "points") viewer[channel][user]["points"] += value;
  else viewer[channel][user][option] = value;
  jsonfile.writeFile("./data/viewerData.json", viewer, {spaces: 2}, function(err){
    //console.error(err);
  })
  return true;
}

exports.getValue = function(user, value, channel){
  if(viewer[channel] == undefined) return false;
  if(!(user in viewer[channel])) return false;
  return viewer[channel][user][value];
}

exports.viewerExist = function(user, channel){
  if(user in viewer[channel]) return true;
  return false;
}

exports.createViewer = function(user, channel) {
  if(viewer[channel] == undefined) return false;
  viewer[channel][user] = {"points":100, "mod":false};
  return true;
}

exports.getObject = function(channel) {
  return viewer[channel];
}

exports.createChannel = function(channel){
  viewer[channel] = {"foxbrobot": {"points": null}};
  return true;
}

exports.setAll = function(option, value, channel){
  var list = viewer[channel];
  for(var x in list){
    viewer[channel][x][option] = value;
  }
}
