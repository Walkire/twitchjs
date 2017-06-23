var state = require("./../mutator/stateAccessor")
var isHost = 0;

exports.sortRaffle = function(arg1, user, host){
  if (user == host) {isHost = 1;}
  else {isHost = 0;}

  if(arg1 == undefined){
    raffleEntry(user, host)}
  else {
    if(isHost && arg1 == "start") {
      return startRaffle(host);}
    if(isHost && arg1 == "end") {
      return endRaffle(host);}
  }
}

function startRaffle(channel){
  if (state.getState("raffle", "state", channel)) {return "Raffle currently in progress"}
  else {
    state.setState("raffle", "state", 1, channel);
    return "Raffle has begun! Use command !raffle to place your name in"}
}

function endRaffle(channel){
  var inGame = state.getState("raffle", "inGame", channel);
  if(state.getState("raffle","state", channel)) {
    state.setState("raffle","state", 0, channel);
    var sizeOf = inGame.length;
    var randNum = Math.floor(Math.random()*sizeOf);
    var winner = inGame[randNum];
    state.setState("raffle", "inGame", [], channel);
    if (winner == undefined) {return "No entry for the raffle"}
    return winner+" has won the raffle! Congrats!";
  }
  else {return "No raffle to end"}
}

function raffleEntry(user, channel){
  var inGame = state.getState("raffle", "inGame", channel);
  if(state.getState("raffle","state", channel)) {
    if(!(inGame.includes(user))) {
      inGame.push(user);
      state.setState("raffle", "inGame", inGame, channel); }
  }
}
