var viewer = require('./../mutator/viewerAccessor')

exports.addOne = function(viewers) {
  var results;
  for(var i in viewers) {
    if(!(results = viewer.setValue(viewers[i], 1, "points"))){
      viewer.createViewer(viewers[i])}
  }
}

exports.getPoints = function(option, user) {
  var points;
  if(option == undefined) {
    if(points = viewer.getValue(user)) return user+" has "+points+" points";
    else return false;
  }
  else {
      if(points = viewer.getValue(option)) return option+" has "+points+" points";
      return false;
  }
}

exports.givePoints = function (rec, amount, giver) {
  var points;
  amount = Number(amount);
  if(rec == undefined || amount == undefined || amount < 1 || isNaN(amount)) return false;
  if(!(points = viewer.getValue(giver))) return false;
  if(amount > points) {
    return giver+" you are too broke to bet that much.(Points: "+points+")";}
  if(viewer.viewerExist(rec)) {
    viewer.setValue(giver, -1*amount, "points");
    viewer.setValue(rec, amount, "points");
    return giver+" gave "+rec+" "+amount+" points <3";
  }
  return false;
}

exports.showLeaderboard = function(){
  obj = viewer.getObject();
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

exports.betGame = function(amount, user){
  if(amount == undefined || amount < 1 || isNaN(amount)) return false;
  if (!(viewer.setValue(user, -1*amount, "points"))) return false;
  var randNum = Math.floor(Math.random()*100)+1;
  if (randNum < 51) {
    return "Sorry, you lost it all "+user+" :("}
  if (randNum < 76) {
    var randNum2 = Math.floor(Math.random()*(amount*2))+1;
    viewer.setValue(user, randNum2, "points");
    return "You won back "+randNum2+" points "+user}
  if (randNum < 100){
    viewer.setValue(user, amount*2, "points");
    return "You won double the amount you bet "+user}
  if (randNum == 100){
    viewer.setValue(user, amount*4, "points");
    return "Congrats "+user+", you won 4 times the amount you bet! PogChamp"}
  viewer.setValue(user, amount, "points");
  return "Error: Points returned"
}
