var Marker = function() {
	this.position = [ 0, 0 ];
	this.node = document.createElement('div');
	this.node.id = 'marker';
	this.node.innerHTML = '&#9731;';
}
Marker.prototype.getPosition = function() {
	return this.position;
}
Marker.prototype.setPosition = function( rowIndex, boxIndex ) {
	this.position = [ rowIndex, boxIndex ];
}
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
Marker.prototype.move = function( spaces ) {
    var currentPosition = this.getPosition();
    this.moveTo( currentPosition[ 0 ], currentPosition[ 1 ] + spaces );
}
