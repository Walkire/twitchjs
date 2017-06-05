var jsonfile = require('jsonfile');
var viewer = require("./../data/viewerData.json");

exports.setValue = function(user, value, option) {
  if(!(user in viewer)) createViewer(user);
  if (option == "points") viewer[user]["points"] += value;
  else viewer[user][option] = value;
  jsonfile.writeFile("./data/viewerData.json", viewer, function(err){
    //console.error(err);
  })
}

exports.getValue = function(user){
  if(!(user in viewer)) return false;
  return viewer[user]["points"];
}

function createViewer(user) {
  viewer[user] = {"points": 100}
}
