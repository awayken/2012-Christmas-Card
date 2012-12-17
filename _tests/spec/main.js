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

    });

});