var state = require("./../mutator/stateAccessor")
var isHost = 0;
var inGame = [];

exports.sortRaffle = function(arg1, user, host){
  if (user == host) {isHost = 1;}
  else {isHost = 0;}

  if(arg1 == undefined){
    raffleEntry(user)}
  else {
    if(isHost && arg1 == "start") {
      return startRaffle();}
    if(isHost && arg1 == "end") {
      return endRaffle();}
  }
}

function startRaffle(){
  if (state.getState("raffle")) {return "Raffle currently in progress"}
  else {
    state.setState("raffle", 1);
    return "Raffle has begun! Use command !raffle to place your name in"}
}

function endRaffle(){
  if(state.getState("raffle")) {
    state.setState("raffle", 0);
    var sizeOf = inGame.length;
    var randNum = Math.floor(Math.random()*sizeOf);
    var winner = inGame[randNum];
    inGame = [];
    if (winner == undefined) {return "No entry for the raffle"}
    return winner+" has won the raffle! Congrats!";
  }
  else {return "No raffle to end"}
}

function raffleEntry(user){
  if(state.getState("raffle")) {
    if(!(inGame.includes(user))) {
      inGame.push(user);}
  }
}
