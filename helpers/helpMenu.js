var helpList = require('./../data/helpData.json');

exports.showHelp = function(command, user){
  if (command == undefined) {
    var returnStr = "Commands available (use !help <command> for details): ";
    for (var x in helpList){
      returnStr = returnStr + "!"+x+" "}
    return returnStr;}
  else {
    if (command in helpList) {
      return helpList[command]["args"] + " -- "+ helpList[command]["details"]+ " (?=optional)"}
    else {return command+" is not a command"}
  }
}
