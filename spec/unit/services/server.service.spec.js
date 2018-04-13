describe('server service', function () {
    let server, $httpBackend, testRoute, testData, responseData, $rootScope;

    beforeEach(module('find-ants'));
    beforeEach(module(function($urlRouterProvider) {
        $urlRouterProvider.deferIntercept();
    }));
    beforeEach(inject(function (_server_, _$httpBackend_, _$rootScope_) {
        server = _server_;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
    }));

    afterEach(function () {
        $httpBackend.flush();
    });

    describe('when executing requests', function () {
        beforeEach(function () {
            testRoute = '/test';
            testData = { testData: 'this' };
            responseData = { response: true };

            $httpBackend.when('GET', '/test').respond(responseData);
            $httpBackend.when('PUT', '/test').respond(responseData);
            $httpBackend.when('POST', '/test').respond(responseData);
            $httpBackend.when('DELETE', '/test').respond(responseData);
        });

        it('should execute get request with data', function () {
            server.request('get', testRoute)
                .then(response => expect(response).toEqual(responseData));
            $httpBackend.expect('GET', testRoute);
        });

        it('should execute post request', function () {
            server.request('post', testRoute, testData)
                .then(response => expect(response).toEqual(responseData));
            $httpBackend.expect('POST', testRoute, testData);
        });

        it('should execute put request', function () {
            server.request('put', testRoute, testData)
                .then(response => expect(response).toEqual(responseData));
            $httpBackend.expect('PUT', testRoute, testData);
        });

        it('should execute delete request', function () {
            server.request('delete', testRoute)
                .then(response => expect(response).toEqual(responseData));
            $httpBackend.expect('DELETE', testRoute);
        });
    });

    describe('when executing bad request', function () {
        let error = 'BAD REQUEST';
        beforeEach(function () {
            $httpBackend.when('GET', '/test').respond({ error: error });
        });

        it('should execute delete request', function () {
            server.request('get', '/test')
                .catch(errorData => expect(errorData).toEqual({ error: error }));
        });
    });
});
