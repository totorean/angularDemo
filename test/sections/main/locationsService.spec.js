describe( '** Locations service **', function() {
    beforeEach( module( 'darkskyForecast' ) );
    beforeEach( module( 'templates' ) );

    var locationsService;
    var $httpBackend;

    beforeEach( inject( function( _locationsService_, _$httpBackend_ ) {
        locationsService = _locationsService_;
        $httpBackend = _$httpBackend_;
    } ) );

    it( "should load the locations", function() {
        $httpBackend.whenGET( 'app/sections/main/locations.json' ).respond( {
            locations: [ {
                tooltip: "Timisoara",
                label: "Timisoara",
                icon: "timisoara",
                id: "timisoara"
            }, {
                tooltip: "Cluj-Napoca",
                label: "Cluj-Napoca",
                icon: "cluj-napoca",
                id: "cluj"
            } ]
        } );
        locationsService.getLocations().then( function( locationsList ) {
            expect( locationsList.length ).toBe( 2 );
        } );
        $httpBackend.flush();
    } );
} );