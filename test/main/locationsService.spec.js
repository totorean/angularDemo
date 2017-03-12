describe('Locations provider', function () {
    var locationsService;
    var $httpBackend;

    // Before each test load our api.users module
    beforeEach(module('darkskyForecast.main'));

    // Before each test set our injected Users factory (_Users_) to our local Users variable
    beforeEach(inject(function (_locationsService_, _$httpBackend_) {
        locationsService = _locationsService_;
        $httpBackend = _$httpBackend_;
    }));

    it("when loading the locations", function () {
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