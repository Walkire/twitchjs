var viewer = require('./../mutator/viewerAccessor')

exports.addOne = function(viewers, channel) {
  var results1, results2;
  for(var i in viewers) {
    if(!(results1 = viewer.setValue(viewers[i], 1, "points", channel))){
      if (!(results2 = viewer.createViewer(viewers[i], channel))){
        viewer.createChannel(channel);}
    }
  }
}

exports.getPoints = function(option, user, channel) {
  var points;
  if(option == undefined) {
    if(points = viewer.getValue(user, "points", channel)) return user+" has "+points+" points";
    else return false;
  }
  else {
      if(points = viewer.getValue(option, "points", channel)) return option+" has "+points+" points";
      return false;
  }
}

exports.givePoints = function (rec, amount, giver, channel) {
  var points;
  amount = Number(amount);
  if(rec == undefined || amount == undefined || amount < 1 || isNaN(amount)) return false;
  if(!(points = viewer.getValue(giver, "points", channel))) return false;
  if(amount > points) {
    return giver+" you are too broke to give that much.(Points: "+points+")";}
  if(viewer.viewerExist(rec, channel)) {
    viewer.setValue(giver, -1*amount, "points", channel);
    viewer.setValue(rec, amount, "points", channel);
    return giver+" gave "+rec+" "+amount+" points <3";
  }
  return false;
}

exports.showLeaderboard = function(channel){
  obj = viewer.getObject(channel);
  var newObj = {};
  var returnStr = "";
  for(var i in obj){newObj[i]=obj[i]["points"];}
  keysSorted = Object.keys(newObj).sort(function(a,b){return newObj[b]-newObj[a]});
  if(keysSorted.length < 5) return false;
  for (var x in keysSorted) {
    var xplus = Number(x) +1;
    returnStr = returnStr + xplus+") "+keysSorted[x]+": "+newObj[keysSorted[x]]+". ";
    if(x >= 4) break;
  }
  return returnStr;
}

exports.betGame = function(amount, user, channel){
  var currentPoints;
  if(!(currentPoints = viewer.getValue(user, "points", channel))) return false;
  if(amount == undefined || amount < 1 || isNaN(amount)) return false;
  if(currentPoints < amount) return "You are too broke to bet that much";
  if (!(viewer.setValue(user, -1*amount, "points", channel))) return false;
  var randNum = Math.floor(Math.random()*100)+1;
  if (randNum < 61) {
    currentPoints = viewer.getValue(user, "points", channel);
    return "Sorry, you lost it all "+user+" :( ("+currentPoints+" points)"}
  if (randNum < 99){
    viewer.setValue(user, amount*2, "points", channel);
    currentPoints = viewer.getValue(user, "points", channel);
    return "You won double the amount you bet "+user+" ("+currentPoints+" points)"}
  if (randNum < 101){
    viewer.setValue(user, amount*4, "points", channel);
    currentPoints = viewer.getValue(user, "points", channel);
    return "Congrats "+user+", you won 4 times the amount you bet! PogChamp ("+currentPoints+" points)"}
  viewer.setValue(user, amount, "points", channel);
  return "Error: Points returned"
}
