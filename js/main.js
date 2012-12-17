var Marker = function() {
	// this.property
	this.position = [ 0, 0 ];
}
Marker.prototype.getPosition = function() {
	return this.position;
}
Marker.prototype.setPosition = function( rowIndex, boxIndex ) {
	this.position = [ rowIndex, boxIndex ];
}
