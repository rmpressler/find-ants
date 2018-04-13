describe('dataService', function () {
    let dataService, $httpBackend, $rootScope, sentData, returnData, testRoute;

    beforeEach(module('find-ants'));
    beforeEach(module(function($urlRouterProvider) {
        $urlRouterProvider.deferIntercept();
    }));
    beforeEach(inject(function (_dataService_, _$httpBackend_, _$rootScope_) {
        dataService = _dataService_;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
    }));
    beforeEach(function () {
        sentData = {
            userId: 'test'
        };

        returnData = {
            test: 'response'
        };

        testRoute = '/api/users';

        $httpBackend.when('POST', testRoute).respond(returnData);
        $httpBackend.when('PUT', testRoute).respond(returnData);
        $httpBackend.when('GET', testRoute).respond(returnData);
    });

    describe('when executing create request', function () {
        it('sends a POST to the table and unpacks the response', function () {
            dataService.create('users', sentData)
                .then(response => expect(response).toEqual(returnData));
            $httpBackend.expect('POST', testRoute, sentData);
        });
    });

    describe('when executing update request', function () {
        it('sends a PUT to the table and unpacks the response', function () {
            dataService.update('users', sentData)
                .then(response => expect(response).toEqual(returnData));
            $httpBackend.expect('PUT', testRoute, sentData);
        });
    });

    describe('when executing read request', function () {
        it('sends a GET to the table and unpacks the response', function () {
            dataService.read('users', sentData)
                .then(response => expect(response).toEqual(returnData));
            $httpBackend.expect('GET', testRoute + '?query=' + JSON.stringify(sentData));
        });
    });
});
