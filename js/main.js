/******************************************************************************
    File: Main.js
    The main JavaScript file for the site.
******************************************************************************/

/******************************************************************************
    Function: Marker
    Defines the Marker object.
******************************************************************************/
var Marker = function() {
    // Variable: position
    // Tracks the current position as row, box
	this.position = [ 0, 0 ];

    // Variable: node
    // The actual DOM node that represents the marker.
	this.node = document.createElement('div');
	this.node.id = 'marker';
    this.node.innerHTML = '&#9731;';

    this.setup();
}
// Function: getPosition
// Getter for <position>
Marker.prototype.getPosition = function() {
	return this.position;
}
// Function: setPosition
// Setter for <position>
Marker.prototype.setPosition = function( rowIndex, boxIndex ) {
	this.position = [ rowIndex, boxIndex ];
}
// Function: setup
// Contains the setup actions.
Marker.prototype.setup = function() {
    var row = document.getElementById('row_1'),
        box;

    if ( row ) {
        box = row.getElementsByTagName('li')[ 0 ];
    }

    if ( box ) {
        box.appendChild( this.node );
    }
}
// Function: moveTo
// Moves the Marker to a specific position as row, box
Marker.prototype.moveTo = function( rowIndex, boxIndex ) {
    var currentPosition = this.getPosition(),
        oldBox,
        newBox,
        oldRow = document.getElementById('row_' + ( currentPosition[ 0 ] + 1 ) ),
	    newRow = document.getElementById('row_' + ( rowIndex + 1 ) );

    if ( oldRow ) {
        oldBox = oldRow.getElementsByTagName('li')[ currentPosition[ 1 ] ];
        if ( oldBox ) {
            oldBox.removeChild( this.node );
        }
    }
    if ( newRow ) {
        newBox = newRow.getElementsByTagName('li')[ boxIndex ];
        if ( newBox ) {
            newBox.appendChild( this.node );
            this.setPosition( rowIndex, boxIndex );
        }
    }
}
// Function: move
// Move the Marker a certain number of spaces
Marker.prototype.move = function( spaces ) {
    var currentPosition = this.getPosition();
    this.moveTo( currentPosition[ 0 ], currentPosition[ 1 ] + spaces );
}

/******************************************************************************
    Function: Die
    Defines the Die object.
******************************************************************************/
var Die = function() {
    var dice = document.getElementById('dice');

    // Variable: roll
    // Tracks the current die roll
    this.rollValue = 0;

    // Variable: node
    // The actual DOM node that represents the die.
    this.node = document.createElement('div');
    this.node.id = 'die';
    this.node.className = 'side_0';
    this.node.innerHTML = '<span id="dot_1">&bull;</span><span id="dot_2">&bull;</span><span id="dot_3">&bull;</span><span id="dot_4">&bull;</span><span id="dot_5">&bull;</span><span id="dot_6">&bull;</span>';
    if ( dice ) {
        dice.appendChild( this.node );
    }
}
// Function: getRoll
// Getter for <roll>
Die.prototype.getRoll = function() {
    return this.rollValue;
}
// Function: setRoll
// Setter for <roll>
Die.prototype.setRoll = function( number ) {
    this.rollValue = number;
}
// Function: roll
// Get a random number for the roll, call setter & update classname.
Die.prototype.roll = function() {
    var newRoll = parseInt( ( Math.random() * 100 ) % 6, 10 );

    this.setRoll( newRoll + 1 );
    this.node.className = 'side_' + this.getRoll();
}

/******************************************************************************
    Function: Card
    Defines the Card object.
******************************************************************************/
var Card = function() {
    // Variable: currentCard
    // Tracks the current life card
    this.currentCard = 0;
    this.totalCards = 0;

    this.setup();
}
// Function: getCurrentCard
// Getter for <currentCard>
Card.prototype.getCurrentCard = function() {
    return this.currentCard;
}
// Function: setCurrentCard
// Setter for <currentCard>
Card.prototype.setCurrentCard = function( number ) {
    this.currentCard = number;
}
Card.prototype.setup = function() {
    var life_container = document.getElementById('life-cards');
    this.life_cards = document.getElementById('life-card-list');
    if ( this.life_cards ) {
        this.totalCards = this.life_cards.getElementsByTagName('li').length;
    }
}
// Function: draw
// Get a random number for the current card, call setter & activate card.
Card.prototype.draw = function() {
    var newCardNumber = parseInt( ( Math.random() * 100 ) % this.totalCards, 10 ),
        life_container = document.getElementById('life-cards'),
        cards = this.life_cards.getElementsByTagName('li'),
        activeClass = 'drawn',
        newCard,
        oldCard;

    if ( newCardNumber == 0 ) {
        this.draw();
    } else {
        if ( cards && cards.length ) {
            newCard = cards[ newCardNumber ];
            oldCard = cards[ this.getCurrentCard() ];
            oldCard.className = oldCard.className.replace( ' ' + activeClass, '' );
            this.setCurrentCard( newCardNumber );
            newCard.className += ' ' + activeClass;
        }
    }
}
