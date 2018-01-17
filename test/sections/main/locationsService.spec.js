describe( '** Locations service **', function() {
    beforeEach( module( 'darkskyForecast' ) );

    var locationsService;
    var $httpBackend;
    var $rootScope;

    beforeEach( inject( function( _locationsService_, _$httpBackend_, _$rootScope_ ) {
        locationsService = _locationsService_;
        $httpBackend = _$httpBackend_;
        $rootScope = $rootScope;
    } ) );

    it( "should load the locations", function() {
        $httpBackend.when( 'GET', 'app/sections/main/mainView.html' ).passThrough();
        $httpBackend.when( 'GET', 'app/sections/main/locations.json' ).respond( {
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
        $rootScope.$digest();
        $httpBackend.flush();
    } );
} );