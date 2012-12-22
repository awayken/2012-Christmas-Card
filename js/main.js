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
// Function: moveTo
// Moves the Marker to a specific position as row, box
Marker.prototype.moveTo = function( rowIndex, boxIndex ) {
    var currentPosition = this.getPosition(),
        oldBox,
        newBox,
        oldRow = document.getElementById('row' + currentPosition[ 0 ] ),
	    newRow = document.getElementById('row' + ( rowIndex + 1 ) );

    if ( oldRow != null ) {
        oldBox = oldRow.childNodes[ currentPosition[ 1 ] ];
        oldBox.removeChild( this.node );
    }
    if ( newRow != null ) {
        newBox = newRow.childNodes[ boxIndex ];
        newBox.appendChild( this.node );
        this.setPosition( rowIndex, boxIndex );
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
    // Variable: roll
    // Tracks the current die roll
    this.roll = 0;
}
// Function: getRoll
// Getter for <roll>
Die.prototype.getRoll = function() {
    return this.roll;
}
// Function: setRoll
// Setter for <roll>
Die.prototype.setRoll = function( number ) {
    this.roll = number;
}
