describe("Main", function() {
	var marker;

	beforeEach(function() {
		marker = new Marker();
	});

	it("should have a marker", function() {
		expect( Marker ).toBeDefined();
		expect( marker ).toBeDefined();
	});

    describe("Marker", function() {

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

        it('should be able to move', function () {
            expect( marker.moveTo ).toBeDefined();
        });

        it('should move to a known row and box', function () {
            row = document.createElement('div');
            row.id = 'row1';
            box1 = document.createElement('div');
            box2 = document.createElement('div');
            row.appendChild( box1 );
            row.appendChild( box2 );
            document.body.appendChild( row );

            expect( box1.childNodes.length ).toEqual( 0 );
            marker.moveTo( 0, 0 );
            expect( box1.childNodes.length ).toEqual( 1 );
            expect( box1.childNodes[ 0 ] ).toBe( marker.node );
            marker.moveTo( 0, 1 );
            expect( box1.childNodes.length ).toEqual( 0 );
            expect( box2.childNodes.length ).toEqual( 1 );
            expect( box2.childNodes[ 0 ] ).toBe( marker.node );
        });

    });

});