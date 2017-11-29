describe('Locations provider', function () {
    // Before each test load our darkskyForecast.main module
    beforeEach(module('darkskyForecast.main'));

    var locationsService;
    var $httpBackend;

    beforeEach(inject(function (_locationsService_, _$httpBackend_) {
        locationsService = _locationsService_;
        $httpBackend = _$httpBackend_;
    }));

    it("should load the locations", function () {
        $httpBackend.whenGET('app/main/locations.json').respond({
            locations: [{
                tooltip: "Timisoara",
                label: "Timisoara",
                icon: "timisoara",
                id: "timisoara"
		}, {
                tooltip: "Cluj-Napoca",
                label: "Cluj-Napoca",
                icon: "cluj-napoca",
                id: "cluj"
		}]
        });
        locationsService.getLocations().then(function (locations) {
            expect(locations.length).toBe(2);
        });
        $httpBackend.flush();
    });
});