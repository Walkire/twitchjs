var viewer = require('./../mutator/viewerAccessor')

exports.addOne = function(viewers) {
  for(var i in viewers) {
    viewer.setValue(viewers[i], 1, "points");
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
      else return false;
  }
}
