describe('authenticator', function () {
    let authenticator, server, $q, $rootScope;
    beforeEach(module('find-ants'));
    beforeEach(module(function($urlRouterProvider) {
        $urlRouterProvider.deferIntercept();
    }));
    beforeEach(inject(function (_authenticator_, _server_, _$q_, _$rootScope_) {
        authenticator = _authenticator_;
        server = _server_;
        $q = _$q_;
        $rootScope = _$rootScope_;
    }));

    describe('when logging in', function () {
        let returnData;
        beforeEach(function () {
            returnData = {
                user: {
                    _id: 1,
                    username: 'testuser',
                    accounts: [],
                    bills: []
                }
            };

            spyOn(server, 'request')
                .and
                .returnValue($q.resolve(returnData));
        });

        it('should return the user', function () {
            let resolvedValue;
            authenticator.login({}).then(user => resolvedValue = user);
            $rootScope.$apply();
            expect(resolvedValue).toBe(returnData.user);
        });
    });
});