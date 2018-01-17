describe( '** Forecast controller **', function() {
    beforeEach( module( 'darkskyForecast' ) );

    var scope, $routeParams, createCtrl;

    beforeEach( inject( function( $rootScope, _$routeParams_, $controller ) {
        scope = $rootScope.$new();
        $routeParams = _$routeParams_;
        createCtrl = function() {
            return $controller( 'forecastController', {
                $scope: scope,
                _$routeParams_: $routeParams
            } )
        };
        var localStorage = window.localStorage;
        spyOn( localStorage, 'setItem' ).and.callFake( function( key, val ) {
            return store[ key ] = value;
        } );
    } ) );

    it( 'should have the location data on scope', function() {
        localStorage[ 'timisoara' ] = JSON.stringify( {
            tooltip: "Timisoara",
            label: "Timisoara",
            icon: "timisoara",
            id: "timisoara"
        } );
        $routeParams.location = 'timisoara';
        var ctrl = createCtrl();
        expect( scope.location.label ).toEqual( 'Timisoara' );
    } );
} );