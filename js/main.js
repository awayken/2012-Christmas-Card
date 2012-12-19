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
	var box = document.getElementById('row' + ( rowIndex + 1 ) ).childNodes[ boxIndex ];
	box.appendChild( this.node );
	this.setPosition( rowIndex, boxIndex );
}