describe('Game', function() {
	var marker;

	beforeEach(function() {
		marker = new Marker();
	});

	it("should have a marker", function() {
		expect( Marker ).toBeDefined();
		expect( marker ).toBeDefined();
	});

    describe('marker', function() {

        it('should have a position', function() {
            expect( marker.setPosition ).toBeDefined();
            expect( marker.getPosition ).toBeDefined();
        });

        it('should have getter', function() {
            expect( marker.getPosition() ).toEqual( [ 0, 0 ] );
        });

        it('should have setter', function() {
            marker.setPosition( 2, 4 );
            expect( marker.getPosition() ).toEqual( [ 2, 4 ] );
        });

        describe('should move', function () {

            beforeEach(function () {
                row = document.createElement('div');
                row.id = 'row1';

                box1 = document.createElement('div');
                box2 = document.createElement('div');
                box3 = document.createElement('div');

                row.appendChild( box1 );
                row.appendChild( box2 );
                row.appendChild( box3 );

                document.body.appendChild( row );
            });

            afterEach(function() {
                document.body.removeChild( row );
            });

            it('to a known row and box', function () {
                expect( marker.moveTo ).toBeDefined();
                expect( box1.childNodes.length ).toEqual( 0 );
                marker.moveTo( 0, 0 );
                expect( box1.childNodes.length ).toEqual( 1 );
                expect( box1.childNodes[ 0 ] ).toBe( marker.node );
                marker.moveTo( 0, 1 );
                expect( box1.childNodes.length ).toEqual( 0 );
                expect( box2.childNodes.length ).toEqual( 1 );
                expect( box2.childNodes[ 0 ] ).toBe( marker.node );
            });

            it('by a number of spaces', function () {
                expect( marker.move ).toBeDefined();
                marker.moveTo( 0, 0 );
                expect( box1.childNodes.length ).toEqual( 1 );
                expect( box1.childNodes[ 0 ] ).toBe( marker.node );
                marker.move( 2 );
                expect( box1.childNodes.length ).toEqual( 0 );
                expect( box3.childNodes.length ).toEqual( 1 );
                expect( box3.childNodes[ 0 ] ).toBe( marker.node );
                marker.move( -1 );
                expect( box3.childNodes.length ).toEqual( 0 );
                expect( box2.childNodes.length ).toEqual( 1 );
                expect( box2.childNodes[ 0 ] ).toBe( marker.node );
            });

        });

    });

});
