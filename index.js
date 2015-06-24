'use strict';

function DeckOfCards(){
  this.deck = [];
}

DeckOfCards.prototype.createDeck = function(){
  var deckToCreate = this.deck;
  ['C', 'S', 'H', 'D'].forEach(function(suit){
    [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'].forEach(function(value){
      deckToCreate.push(value + suit);
    })
  });
  deckToCreate.push('#1');
  deckToCreate.push('#2');
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

var cards = new DeckOfCards();
cards.createDeck();
cards.shuffle();

cards.deck.forEach(function(card){
  var cardDisp = $('<div>' + card + '</div>');
  $('#cards').append(cardDisp);
});
