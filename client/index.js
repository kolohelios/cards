'use strict';

angular.module('tic', ['ngDragDrop', 'ui.router', 'firebase']);

//
// function init(){
//   $('#addplayer').click(addPlayer);
//   $('#startgame').click(dealer);
// }
//
// $(document).ready(init);
//
//
//
// var players = [];
//
// function Player(name){
//   this.name = name;
// }
//
// function dealer(){
//   var cards = new DeckOfCards();
//   cards.createDeck();
//   cards.shuffle();
//   // cards.deck.forEach(function(card){
//   //   var colorClass = card.suit === 'D' || card.suit === 'H' ? 'red' : 'black';
//   //   var cardDisp = $('<span data=' + card.points + ' class=' + colorClass + '>' + card.image + '</span>');
//   //   $('#cards').append(cardDisp);
//   // });
// }
//
// function addPlayer(){
//   var playerName = $('#playername').val();
//   players.push(playerName);
// }
