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

exports.eightBall = function(arg1){
  if(arg1 == null) return false;
  var aReturn = [
    "69% for sure",
    "are you kidding?!",
    "ask again",
    "better not tell you now",
    "definitely... not",
    "don't bet on it",
    "don't count on it",
    "doubtful",
    "for sure",
    "forget about it",
    "hah!",
    "hells no.",
    "if the Twitch gods grant it",
    "in due time",
    "indubitably!",
    "it is certain",
    "it is so",
    "leaning towards no",
    "look deep in your heart and you will see the answer",
    "most definitely",
    "most likely",
    "my sources say yes",
    "never",
    "no wais",
    "no way!",
    "no.",
    "of course!",
    "outlook good",
    "outlook not so good",
    "perhaps",
    "please...",
    "you wish",
    "that's a tough one",
    "that's like totally a yes. Duh!",
    "the answer might not be not no",
    "what does the fox say?",
    "the answer to that isn't pretty",
    "the heavens point to yes",
    "who knows?",
    "without a doubt",
    "yesterday it would've been a yes, but today it's a yep",
    "you will have to wait",
    "hahahahaha",
    "why tho...",
  ]
  var randNum = Math.floor(Math.random()*aReturn.length);
  return "Magic 8-ball says... "+aReturn[randNum];
}
