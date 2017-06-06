var jsonfile = require('jsonfile');
var viewer = require("./../data/viewerData.json");

exports.setValue = function(user, value, option) {
  if(!(user in viewer)) return false;
  if (option == "points") viewer[user]["points"] += value;
  else viewer[user][option] = value;
  jsonfile.writeFile("./data/viewerData.json", viewer, function(err){
    //console.error(err);
  })
  return true;
}

exports.getValue = function(user){
  if(!(user in viewer)) return false;
  return viewer[user]["points"];
}

exports.viewerExist = function(user){
  if(user in viewer) return true;
  return false;
}

exports.createViewer = function(user) {
  viewer[user] = {"points": 100}
}

exports.getObject = function(user) {
  return viewer;
}
