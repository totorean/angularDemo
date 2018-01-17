describe( '** Location directive ** ', function() {
    beforeEach( module( "darkskyForecast" ) );
    beforeEach( module( 'components' ) );
    beforeEach( module( 'templates' ) );

    var element, elementAsHtml;
    var $rootScope;
    var $httpBackend;
    var $compile;
    var spy = jasmine.createSpy( 'weatherCallback' );

    // Before each test load our darkskyForecast.main module
    beforeEach( inject( function( _$rootScope_, _$compile_, _$httpBackend_ ) {
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        $compile = _$compile_;
    } ) );

    beforeEach( function() {
        $rootScope.$apply( function() {
            $rootScope.loc = {
                tooltip: "Timisoara",
                label: "Timisoara",
                icon: "timisoara"
            };
            $rootScope.weatherCallback = spy;
        } );
        element = $compile( '<location tooltip={{loc.tooltip}} label={{loc.label}} icon={{loc.icon}} ng-click="weatherCallback()"></location>' )( $rootScope );
        $rootScope.$digest();
        elementAsHtml = element.html();
    } );

    describe( 'HTML element', function() {
        it( 'should be rendered correctly', function() {
            expect( elementAsHtml ).toContain( $rootScope.loc.tooltip );
            expect( elementAsHtml ).toContain( $rootScope.loc.icon );
            expect( elementAsHtml ).toContain( $rootScope.loc.label );
        } );
    } );

    describe( 'when the directive is clicked', function() {
        beforeEach( function() {
            element.triggerHandler( 'click' );
        } );
        it( 'the callback should be called', function() {
            expect( spy ).toHaveBeenCalled();
        } );
    } );
} );