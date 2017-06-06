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
  if(rec == undefined || amount == undefined || amount < 1) return false;
  else if(!(points = viewer.getValue(giver))) return false;
  else if(amount > points) {
    return giver+" you are too broke to bet that much.(Points: "+points+")";}
  else if(viewer.viewerExist(rec)) {
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
  }
  return returnStr;
}
