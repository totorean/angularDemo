describe('Location directive', function () {
    beforeEach(module('darkskyForecast'));
    beforeEach(module('services'));
    beforeEach(module('components'));

    var element;
    var outerScope;
    var innerScope;
    var $httpBackend;

    // Before each test load our darkskyForecast.main module
    beforeEach(inject(function ($rootScope, $compile, _$httpBackend_) {
        element = angular.element('<location tooltip={{loc.tooltip}} label={{loc.label}} icon={{loc.icon}} ng-click="weatherCallback()"></location>');
        outerScope = $rootScope;
        $compile(element)(outerScope);
        innerScope = element.isolateScope();
        outerScope.$digest();
        $httpBackend = _$httpBackend_;
    }));

    describe('HTML element', function () {
        beforeEach(function () {
            outerScope.$apply(function () {
                outerScope.loc = {
                    tooltip: "Timisoara",
                    label: "Timisoara",
                    icon: "timisoara",
                    id: "timisoara"
                };
            });
        });
        it('should be rendered correctly', function () {
            $httpBackend.whenGET(/^\/html\//).passThrough();
            expect(element[0].title).toBe('Timisoara');
            expect(element[0].children[0].src).toContain('timisoara.png');
            expect(element[0].children[1].innerHTML).toBe('Timisoara');
        });
    });

    describe('when the directive is clicked', function () {
        var spy = jasmine.createSpy('weatherCallback');
        beforeEach(function () {
            outerScope.$apply(function () {
                outerScope.weatherCallback = spy;
            });
        });
        beforeEach(function () {
            var event = document.createEvent("MouseEvent");
            event.initMouseEvent("click", true, true);
            element[0].dispatchEvent(event);
        });
        it('the callback should be called', function () {
            $httpBackend.whenGET(/^\/html\//).passThrough();
            expect(spy).toHaveBeenCalled();
        });
    });
});