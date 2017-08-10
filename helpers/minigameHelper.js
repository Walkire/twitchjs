var viewer = require('./../mutator/viewerAccessor')

exports.roulette = function(user, host){
  var randNum = Math.floor(Math.random()*100)+1;
  if(randNum >= 50) {
    if(user == host){
      return user+" pulls the trigger, and the revolver fires! A bright light flashes through chat and instantly revives "+user;
    } else {
      if (viewer.getValue(user, "mod", host)) {
        return "The trigger is pulled, but the revolver malfunctions! "+user+" has miraculously lived to survive roulette!";
      } else {
        return "@The trigger is pulled, and the revolver fires! "+user+" lies dead in chat";
      }
    }
  } else {
    return "The trigger is pulled, and the revolver clicks. "+user+" has lived to survive roulette!";
  }
}
