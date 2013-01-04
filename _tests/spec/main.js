describe('Game', function() {

    describe('board', function() {

        beforeEach(function() {
            spyOn( board.die, 'roll' );
            spyOn( board.card, 'draw' );
        });

        it('should exist', function() {
            expect( board ).toBeDefined();
        });

        it('should roll die', function() {
            expect( board.rollDie ).toBeDefined();
            board.rollDie();
            expect( board.die.roll ).toHaveBeenCalled();
        });

        it('should draw card', function() {
            expect( board.drawCard ).toBeDefined();
            board.drawCard();
            expect( board.card.draw ).toHaveBeenCalled();
        });

    });

    describe('marker', function() {
        var marker;

        beforeEach(function() {
            marker = board.marker;
        });

        it("should exist", function() {
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
                row1 = document.createElement('ol');
                row1.id = 'row_1';

                box_1_1 = document.createElement('li');
                box_1_2 = document.createElement('li');
                box_1_3 = document.createElement('li');
                box_1_4 = document.createElement('li');
                box_1_5 = document.createElement('li');

                row1.appendChild( box_1_1 );
                row1.appendChild( box_1_2 );
                row1.appendChild( box_1_3 );
                row1.appendChild( box_1_4 );
                row1.appendChild( box_1_5 );

                document.body.appendChild( row1 );

                row2 = document.createElement('ol');
                row2.id = 'row_2';

                box_2_1 = document.createElement('li');
                box_2_2 = document.createElement('li');
                box_2_3 = document.createElement('li');
                box_2_4 = document.createElement('li');
                box_2_5 = document.createElement('li');

                row2.appendChild( box_2_1 );
                row2.appendChild( box_2_2 );
                row2.appendChild( box_2_3 );
                row2.appendChild( box_2_4 );
                row2.appendChild( box_2_5 );

                document.body.appendChild( row2 );
            });

            afterEach(function() {
                document.body.removeChild( row1 );
                document.body.removeChild( row2 );
            });

            it('to a known row and box', function () {
                expect( marker.moveTo ).toBeDefined();
                expect( box_1_1.childNodes.length ).toEqual( 0 );
                marker.setup();
                expect( box_1_1.childNodes.length ).toEqual( 1 );
                expect( box_1_1.childNodes[ 0 ] ).toBe( marker.node );
                marker.moveTo( 0, 1 );
                expect( box_1_1.childNodes.length ).toEqual( 0 );
                expect( box_1_2.childNodes.length ).toEqual( 1 );
                expect( box_1_2.childNodes[ 0 ] ).toBe( marker.node );
                marker.moveTo( 1, 0 );
                expect( box_2_1.childNodes.length ).toEqual( 1 );
                expect( box_2_1.childNodes[ 0 ] ).toBe( marker.node );
                marker.moveTo( 1, 4 );
                expect( box_2_5.childNodes.length ).toEqual( 1 );
                expect( box_2_5.childNodes[ 0 ] ).toBe( marker.node );
            });

            it('by a number of spaces', function () {
                expect( marker.move ).toBeDefined();
                marker.moveTo( 0, 0 );
                marker.setup();
                expect( marker.node.parentNode ).toBe( box_1_1 );
                marker.move( 2 );
                expect( marker.node.parentNode ).toBe( box_1_3 );
                marker.move( -1 );
                expect( marker.node.parentNode ).toBe( box_1_2 );
                marker.move( -4 );
                expect( marker.node.parentNode ).toBe( box_1_1 );
                marker.move( 6 );
                expect( marker.node.parentNode ).toBe( box_2_2 );
                marker.move( 3 );
                expect( marker.node.parentNode ).toBe( box_2_5 );
            });

        });

    });

    describe('die', function() {
        var die;

        beforeEach(function() {
            die = board.die;
        });

        it('should exist', function() {
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
                expect( die.getRoll() ).toEqual( 4 );
                die.roll();
                expect( die.getRoll() ).not.toMatch(/0-9+/);
            });

            it('and display that roll value', function() {
                die.roll();
                expect( die.node.className ).toEqual( 'side_' + die.getRoll() );
            });

        });

    });

    describe('card', function() {
        var card;

        beforeEach(function() {
            card = board.card;
        });

        it('should exist', function() {
            expect( card ).toBeDefined();
        });

        it('should have a currentCard', function() {
            expect( card.currentCard ).toBeDefined();
        });

        it('should activate a specific card', function() {
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

            expect( card.activate ).toBeDefined();
            expect( card2.className ).toEqual('');
            card.activate( 1 );
            expect( card2.className ).toContain('drawn');

            document.body.removeChild( life_cards );
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
                card_node = document.getElementById('life-card-list').getElementsByTagName('li')[ card.currentCard ];
                expect( card_node.className ).toContain( 'drawn' );
            });

        });

    });

});
