describe('userService', function () {
    let userService, $rootScope, server, $q;

    beforeEach(module('find-ants'));
    beforeEach(module(function($urlRouterProvider) {
        $urlRouterProvider.deferIntercept();
    }));
    beforeEach(inject(function (_userService_, _$rootScope_, _server_, _$q_) {
        userService = _userService_;
        $rootScope = _$rootScope_;
        server = _server_;
        $q = _$q_;
    }));

    describe('when registering', function () {
        let username, password, expectedUser;

        beforeEach(function () {
            username = 'testUsername';
            password = 'testPassword';

            expectedUser = {
                username,
                password,
                accounts: [],
                bills: []
            };

            spyOn(server, 'request')
                .and
                .returnValue($q.resolve({ user: expectedUser }));
        });

        it('should reject missing username', function () {
            userService.register('', password)
                .catch(err => expect(err).toEqual(userService._noUsernamePasswordError));
            $rootScope.$apply();
        });

        it('should reject missing password', function () {
            userService.register(username, '')
                .catch(err => expect(err).toEqual(userService._noUsernamePasswordError));
            $rootScope.$apply();
        });

        it('should create user with provided info and return it', function () {
            userService.register(username, password)
                .then(actualUser => expect(actualUser).toEqual(expectedUser));
            $rootScope.$apply();
        });

        it('should cache the user', function () {
            userService.register(username, password)
                .then(() => expect(userService._cachedUser).toEqual(expectedUser));
            $rootScope.$apply();
        });
    });

    describe('when saving user', function () {
        let userToStore;
        beforeEach(function () {
            userToStore = {
                username: 'testUsername',
                password: 'testPassword',
                accounts: [],
                bills: []
            };
        });

        it('should cache the user', function () {
            userService.saveUser(userToStore);
            expect(userService._cachedUser).toEqual(userToStore);
            $rootScope.$apply();
        });
    });

    describe('when getting user', function () {
        let expectedUser;

        beforeEach(function () {
            expectedUser = {
                username: 'testUsername',
                password: 'testPassword',
                accounts: [],
                bills: []
            };

            spyOn(server, 'request')
                .and
                .returnValue($q.resolve({ user: expectedUser }));
        });

        it('should get user from server if not in cache', function () {
            userService.getUser()
                .then(user => expect(user).toEqual(expectedUser));
            $rootScope.$apply();
            expect(server.request).toHaveBeenCalled();
        });

        it('should get cached user if present', function () {
            userService._cachedUser = expectedUser;
            userService.getUser()
                .then(user => expect(user).toEqual(expectedUser));
            expect(server.request).not.toHaveBeenCalled();
        });
    });

    describe('when updating user', function () {
        let preUpdateUser, userUpdate, updatedUser;

        beforeEach(function () {
            preUpdateUser = {
                _id: 1,
                username: 'testUsername',
                password: 'testPassword',
                accounts: [],
                bills: []
            };

            userUpdate = {
                _id: 1,
                bills: ['testBill']
            };

            updatedUser = {
                _id: 1,
                username: 'testUsername',
                password: 'testPassword',
                accounts: [],
                bills: ['testBill']
            };

            spyOn(server, 'request')
                .and
                .returnValue($q.resolve({ user: updatedUser }));
        });

        it('should send the update and return the updated user', function () {
            userService.update(userUpdate)
                .then(user => expect(user).toEqual(updatedUser));
            $rootScope.$apply();
            expect(server.request).toHaveBeenCalled();
        });

        it('should cache the updated user', function () {
            userService._cachedUser = preUpdateUser;
            userService.update(userUpdate)
                .then(() => expect(userService._cachedUser).toEqual(updatedUser));
            $rootScope.$apply();
        });

        it('should notify listeners with uypdated user', function () {
            const listener = jasmine.createSpy('listener');
            userService.on('update', listener);
            userService.update(userUpdate)
                .then(() => expect(listener).toHaveBeenCalledWith(updatedUser));
            $rootScope.$apply();
        });
    });

    describe('when adding listeners', function () {
        it('should notify all listeners', function () {
            const listener1 = jasmine.createSpy('listener1');
            const listener2 = jasmine.createSpy('listener2');

            spyOn(server, 'request')
                .and
                .returnValue($q.resolve({}));

            userService.on('update', listener1);
            userService.on('update', listener2);

            userService.update({})
                .then(() => {
                    expect(listener1).toHaveBeenCalled();
                    expect(listener2).toHaveBeenCalled();
                });
            $rootScope.$apply();
        });
    });

    describe('when adding account', function () {
        let preUpdateUser, newAccount, updatedUser;
        beforeEach(function () {
            preUpdateUser = { _id: 1, accounts: [] };
            newAccount = { _id: 2, transactions: [] };
            updatedUser = { _id: 1, accounts: [ newAccount ] };
            userService._cachedUser = preUpdateUser;
            spyOn(userService, 'update')
                .and
                .returnValue($q.resolve(updatedUser));
        });

        it('should call update and return updated user', function () {
            userService.addAccount(newAccount)
                .then(user => {
                    expect(user).toEqual(updatedUser);
                    expect(userService.update).toHaveBeenCalled();
                });
            $rootScope.$apply();
        });

        it('should update cached user', function () {
            userService.addAccount(newAccount)
                .then(() => {
                    expect(userService._cachedUser).toEqual(updatedUser);
                });
            $rootScope.$apply();
        });
    });
});
