/* global $, document */

'use strict';

angular.module('tic', ['ngDragDrop'])
.controller('OverviewCtrl', function($scope) {
  $scope.list1 = {title: 'AngularJS - Drag Me'};
  $scope.list2 = {};
});

var ticCloud = new Firebase('https://tic-kolohelios.firebaseio.com/');

function init(){
  $('#addplayer').click(addPlayer);
  $('#startgame').click(dealer);
}

$(document).ready(init);

function cardImage(suit, value){
  var suitCode, valueCode, prefix = '&#x1f0';
  switch(suit){
    case 'D':
      suitCode = 'c';
      break;
    case 'H':
      suitCode = 'b';
      break;
    case 'S':
      suitCode = 'a';
      break;
    case 'C':
      suitCode = 'd';
      break;
  }
  valueCode = value; // or a non-integer value from the switch below
  switch(value){
    case 'A':
      valueCode = '1';
      break;
    case 'T':
      valueCode = 'a';
      break;
    case 'J':
      valueCode = 'b';
      break;
    case 'Q':
      valueCode = 'd';
      break;
    case 'K':
      valueCode = 'e';
  }
  return suit === '#' ? prefix + 'df' : prefix + suitCode + valueCode;
}

function pointsValue(suit, value){
  if(suit === '#'){return 50;}
  var ptsValue = value;
  switch(value){
    case 'A':
      ptsValue = 20;
      break;
    case 'T':
      ptsValue = 10;
      break;
    case 'J':
      ptsValue = 10;
      break;
    case 'Q':
      ptsValue = 10;
      break;
    case 'K':
      ptsValue = 10;
  }
  return ptsValue;
}

function createCard(suit, value){
  var card = {};
  card.suit = suit;
  card.value = value;
  card.image = cardImage(suit, value);
  card.points = pointsValue(suit, value);
  return card;
}

function DeckOfCards(){
  this.deck = [];
}

DeckOfCards.prototype.createDeck = function(){
  var deckToCreate = this.deck;
  ['C', 'S', 'H', 'D'].forEach(function(suit){
    ['A', 2, 3, 4, 5, 6, 7, 8, 9, 'T', 'J', 'Q', 'K'].forEach(function(value){
      deckToCreate.push(createCard(suit, value));
    });
  });
  deckToCreate.push(createCard('#', '1'));
  deckToCreate.push(createCard('#', '2'));
};

DeckOfCards.prototype.shuffle = function(){
  var firstCard, secondCard, tempCard;
  for(var i = 0; i < 54; i++){
    firstCard = Math.floor(Math.random() * 54);
    do{
      secondCard = Math.floor(Math.random() * 54);
    }while(secondCard === firstCard)
    tempCard = this.deck[firstCard];
    this.deck[firstCard] = this.deck[secondCard];
    this.deck[secondCard] = tempCard;
  }
};

var players = [];

function Player(name){
  this.name = name;
}

function dealer(){
  var cards = new DeckOfCards();
  cards.createDeck();
  cards.shuffle();
  // cards.deck.forEach(function(card){
  //   var colorClass = card.suit === 'D' || card.suit === 'H' ? 'red' : 'black';
  //   var cardDisp = $('<span data=' + card.points + ' class=' + colorClass + '>' + card.image + '</span>');
  //   $('#cards').append(cardDisp);
  // });
}

function addPlayer(){
  var playerName = $('#playername').val();
  players.push(playerName);
}
