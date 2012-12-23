describe('Game', function() {

    describe('marker', function() {
        var marker;

        beforeEach(function() {
            marker = new Marker();
        });

        it("should exist", function() {
            expect( Marker ).toBeDefined();
            expect( marker ).toBeDefined();
        });

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
                row = document.createElement('ol');
                row.id = 'row_1';

                box1 = document.createElement('li');
                box2 = document.createElement('li');
                box3 = document.createElement('li');

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
                marker.setup();
                expect( box1.childNodes.length ).toEqual( 1 );
                expect( box1.childNodes[ 0 ] ).toBe( marker.node );
                marker.moveTo( 0, 1 );
                expect( box1.childNodes.length ).toEqual( 0 );
                expect( box2.childNodes.length ).toEqual( 1 );
                expect( box2.childNodes[ 0 ] ).toBe( marker.node );
            });

            it('by a number of spaces', function () {
                expect( marker.move ).toBeDefined();
                marker.setup();
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

    describe('die', function() {
        var die;

        beforeEach(function() {
            die = new Die();
        });

        it('should exist', function() {
            expect( Die ).toBeDefined();
            expect( die ).toBeDefined();
        });

        it('should have a roll', function() {
            expect( die.getRoll ).toBeDefined();
            expect( die.setRoll ).toBeDefined();
        });

        it('should have getter', function() {
            expect( die.getRoll() ).toEqual( 0 );
        });

        it('should have setter', function() {
            die.setRoll( 4 );
            expect( die.getRoll() ).toEqual( 4 );
        });

        describe('should roll', function () {

            beforeEach(function() {
                dice = document.createElement('div');
                dice.id = 'dice';
                document.body.appendChild( dice );
            });

            afterEach(function() {
                document.body.removeChild( dice );
            });

            it('and set the roll value', function () {
                expect( die.roll ).toBeDefined();
                expect( die.getRoll() ).toEqual( 0 );
                die.roll();
                expect( die.getRoll() ).not.toEqual( 0 );
            });

            it('and display that roll value', function() {
                expect( die.node.className ).toEqual( 'side_0' );
                die.roll();
                expect( die.node.className ).not.toEqual( 'side_0' );
                expect( die.node.className ).toEqual( 'side_' + die.getRoll() );
            });

        });

    });

    describe('card', function() {
        var card;

        beforeEach(function() {
            card = new Card();
        });

        it('should exist', function() {
            expect( Card ).toBeDefined();
            expect( card ).toBeDefined();
        });

        it('should have a currentCard', function() {
            expect( card.getCurrentCard ).toBeDefined();
            expect( card.setCurrentCard ).toBeDefined();
        });

        it('should have getter', function() {
            expect( card.getCurrentCard() ).toEqual( 0 );
        });

        it('should have setter', function() {
            card.setCurrentCard( 2 );
            expect( card.getCurrentCard() ).toEqual( 2 );
        });

        describe('should draw', function () {

            beforeEach(function() {
                life_cards = document.createElement('ul');
                life_cards.id = 'life-card-list';

                card1 = document.createElement('li');
                card2 = document.createElement('li');
                card3 = document.createElement('li');

                life_cards.appendChild( card1 );
                life_cards.appendChild( card2 );
                life_cards.appendChild( card3 );

                document.body.appendChild( life_cards );

                card.setup();
            });

            afterEach(function() {
                document.body.removeChild( life_cards );
            });

            it('and display that card', function() {
                var card_node;
                card.draw();
                card_node = document.getElementById('life-card-list').getElementsByTagName('li')[ card.getCurrentCard() ];
                expect( card_node.className ).toContain( 'drawn' );
            });

        });

    });

});
