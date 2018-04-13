describe('accountService', function () {
    let accountService, $q, server, $rootScope;

    beforeEach(module('find-ants'));
    beforeEach(module(function($urlRouterProvider) {
        $urlRouterProvider.deferIntercept();
    }));
    beforeEach(inject(function (_accountService_, _$q_, _server_, _$rootScope_) {
        accountService = _accountService_;
        $q = _$q_;
        server = _server_;
        $rootScope = _$rootScope_;
    }));

    describe('when getting account balance', function () {
        let emptyAccount, populatedAccount;

        beforeEach(function () {
            emptyAccount = {
                transactions: []
            };

            populatedAccount = {
                transactions: [
                    {
                        amount: 5
                    },
                    {
                        amount: 3.2
                    },
                    {
                        amount: 10.64
                    }
                ]
            };
        });

        it('should return 0 for empty account', function () {
            const balance = accountService.getAccountBalance(emptyAccount);
            expect(balance).toEqual(0);
        });

        it('should return accurate balance', function () {
            const balance = accountService.getAccountBalance(populatedAccount);
            expect(balance).toEqual(18.84);
        });
    });

    describe('when getting accounts', function () {
        let accountList;

        beforeEach(function () {
            accountList = [
                {
                    _id: 1,
                    name: 'test1',
                    transactions: []
                },
                {
                    _id: 2,
                    name: 'test2',
                    transactions: []
                }
            ];

            spyOn(server, 'request')
                .and
                .returnValue($q.resolve({ accounts: accountList }));
        });

        it('should return fetched accounts', function () {
            accountService.getAccounts()
                .then(accounts => expect(accounts).toEqual(accountList));
            $rootScope.$apply();
        });
    });

    describe('when updating account', function () {
        let update, updatedAccount;

        beforeEach(function () {
            const newTransaction = {
                amount: 5
            };

            update = {
                _id: 1,
                transactions: [newTransaction]
            };

            updatedAccount = {
                _id: 1,
                name: 'test1',
                transactions: [newTransaction]
            };

            spyOn(server, 'request')
                .and
                .returnValue($q.resolve(updatedAccount));
        });

        it('should update and return updated account', function () {
            accountService.update(update)
                .then(account => expect(account).toEqual(updatedAccount));
            $rootScope.$apply();
        });
    });

    describe('when creating account', function () {
        let newAccount;

        beforeEach(function () {
            newAccount = {
                _id: 1,
                name: 'test1',
                transactions: []
            };

            spyOn(server, 'request')
                .and
                .returnValue($q.resolve({ account: newAccount }));
        });

        it('should update and return updated account', function () {
            accountService.create(newAccount)
                .then(account => expect(account).toEqual(newAccount));
            $rootScope.$apply();
        });
    });

    describe('when subscribing and notifying', function () {
        it('should register subscribers and notify', function () {
            const listener1 = jasmine.createSpy('listener1');
            const listener2 = jasmine.createSpy('listener2');

            accountService.subscribe(listener1);
            accountService.subscribe(listener2);

            accountService.notify();

            expect(listener1).toHaveBeenCalled();
            expect(listener2).toHaveBeenCalled();
        });
    });
});
