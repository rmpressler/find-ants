(function() {
    angular.module('find-ants')
        .controller('PaycheckController', PaycheckController);

    PaycheckController.$inject = ['$uibModalInstance', '$filter', 'accountService',
        'CurrentUser', '$q'];
    function PaycheckController($uibModalInstance, $filter, accountService,
        CurrentUser, $q) {
        var vm = this;

        vm.check = {};
        vm.allocations = [];
        vm.accounts = [];
        vm.showPayTable = false;

        vm.close = close;
        vm.setPayData = setPayData;
        vm.getRemaining = getRemaining;
        vm.addAllocation = addAllocation;
        vm.removeAllocation = removeAllocation;
        vm.logPaycheck = logPaycheck;

        init();

        function init() {
            vm.check.date = new Date();
            vm.check.amount = 0;

            accountService.getAccounts()
                .then(accounts => vm.accounts = accounts);
        }

        function close() {
            $uibModalInstance.close();
        }

        function allocate(account, description, amount, disabled) {
            vm.allocations.push({
                account: account,
                description: description,
                amount: amount,
                disabled: disabled
            });
        }

        function getNextPayDate(fromDate) {
            var day = fromDate.getDate();
            var month = fromDate.getMonth();
            var year = fromDate.getFullYear();

            if (day > 9 && day < 20) {
                return new Date(year, month + 1, 1);
            } else if (day > 20) {
                return new Date(year, month + 1, 15);
            } else if (day < 5) {
                return new Date(year, month, 15);
            } else {
                return null;
            }
        }

        function setPayData() {
            if (vm.check.amount === 0) {
                return;
            }

            var nextPayDate = getNextPayDate(vm.check.date);
            if (!nextPayDate) {
                return setError('Invalid pay date!');
            }

            var checkDayOfMonth = vm.check.date.getDate();
            var checkMonth = vm.check.date.getMonth();
            var checkYear = vm.check.date.getFullYear();
            if (checkDayOfMonth >= 25) {
                checkDayOfMonth = 1;
                checkMonth++;
                if (checkMonth > 11) {
                    checkMonth = 0;
                }
            } else if (checkDayOfMonth <= 5) {
                checkDayOfMonth = 1;
            } else {
                checkDayOfMonth = 15;
            }

            var bills = $filter('orderBy')(CurrentUser.bills, 'dayOfMonth');
            var billAccountId = vm.accounts.filter(function(account) {
                return account.name.indexOf('Bill Expense') !== -1;
            })[0]._id;

            bills.forEach(function(bill) {
                var nextDueDate;
                if (bill.dayOfMonth <= checkDayOfMonth) {
                    nextDueDate = new Date(checkYear, checkMonth + 1, bill.dayOfMonth);
                } else {
                    nextDueDate = new Date(checkYear, checkMonth, bill.dayOfMonth);
                }

                if (nextDueDate.getTime() <= nextPayDate.getTime()) {
                    allocate(billAccountId, bill.name, bill.amount);
                }
            });

            vm.showPayTable = true;
        }

        function getRemaining() {
            var amount = vm.check.amount;

            vm.allocations.forEach(function(alloc) {
                amount -= alloc.amount;
            });

            return amount;
        }

        function addAllocation() {
            var newAlloc = {
                account: '',
                description: 'Paycheck',
                amount: 0
            };
            vm.allocations.push(newAlloc);
        }

        function removeAllocation(alloc) {
            vm.allocations.splice(vm.allocations.indexOf(alloc), 1);
        }

        function logPaycheck() {
            let updates = {}, promises = [];
            vm.allocations.forEach(function(alloc) {
                if (!updates[alloc.account]) {
                    updates[alloc.account] = [];
                }

                updates[alloc.account].push({
                    date: vm.check.date,
                    description: alloc.description,
                    amount: alloc.amount
                })
            });

            for (let accountId in updates) {
                if (updates.hasOwnProperty(accountId)) {
                    const update = accountService.logTransactions(accountId, updates[accountId]);
                    promises.push(update);
                }
            }

            $q
                .all(promises)
                .then(accountService.notify)
                .then(close);
        }

        function logTransaction(accountId, description, amount) {
            vm.accounts.forEach(function(account) {
                if (account._id === accountId) {
                    account.transactions.push({
                        date: vm.check.date,
                        description: description,
                        amount: amount
                    });
                }
            });
        }

        function setError(err) {
            console.log(err);
        }
    }
})();
