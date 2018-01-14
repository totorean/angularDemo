describe('Forecast controller', function () {
    beforeEach(module('darkskyForecast'));
    beforeEach(module('services'));
    beforeEach(module('components'));

    var scope, $routeParams, createCtrl, $httpBackend;;

    beforeEach(inject(function ($rootScope, _$routeParams_, $controller, _$httpBackend_) {
        scope = $rootScope.$new();
        $routeParams = _$routeParams_;
        $httpBackend = _$httpBackend_;
        createCtrl = function () {
            return $controller('forecastController', {
                $scope: scope,
                _$routeParams_: $routeParams
            })
        };
        var localStorage = window.localStorage;
        spyOn(localStorage, 'setItem').and.callFake(function (key, val) {
            return store[key] = value;
        });
    }));

    it('should have the location data on scope', function () {
        localStorage['timisoara'] = JSON.stringify({
            tooltip: "Timisoara",
            label: "Timisoara",
            icon: "timisoara",
            id: "timisoara"
        });
        $routeParams.location = 'timisoara';
        var ctrl = createCtrl();
        expect(scope.location.label).toEqual('Timisoara');
    });
});