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
        let returnData, loginData;
        beforeEach(function () {
            loginData = {
                username: 'testuser',
                password: 'testpassword'
            };

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

        it('should call the login endpoint', function () {
            authenticator.login(loginData);
            expect(server.request).toHaveBeenCalledWith('post', '/authenticate', loginData);
        });

        it('should return the user', function () {
            let resolvedValue;
            authenticator.login({}).then(user => resolvedValue = user);
            $rootScope.$apply();
            expect(resolvedValue).toBe(returnData.user);
        });

        it('should notify listeners', function () {
            let called = false;
            authenticator.on('login', () => called = true);
            authenticator.login({});
            $rootScope.$apply();
            expect(called).toBe(true);
        });
    });

    describe('when logging out', function () {
        beforeEach(function () {
            spyOn(server, 'request')
                .and
                .returnValue($q.resolve());
        });

        it('should call the logout endpoint', function () {
            authenticator.logout();
            expect(server.request).toHaveBeenCalledWith('get', '/authenticate/logout');
        });

        it('should alert listeners', function () {
            let called = false;
            authenticator.on('logout', () => called = true);
            authenticator.logout();
            $rootScope.$apply();
            expect(called).toBe(true);
        });
    });

    describe('when getting login state', function () {
        beforeEach(function () {
            spyOn(server, 'request')
                .and
                .returnValue($q.resolve({isLoggedIn: true}));
        });

        it('should return true when logged in', function () {
            let isLoggedIn;
            authenticator.getLoginState().then(returnValue => isLoggedIn = returnValue);
            $rootScope.$apply();
            expect(isLoggedIn).toBe(true);
        });
    });
});
