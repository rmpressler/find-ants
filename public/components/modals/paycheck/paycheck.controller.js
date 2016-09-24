(function() {
    angular.module('find-ants')
        .controller('PaycheckController', PaycheckController);

    PaycheckController.$inject = ['$uibModalInstance', 'CurrentUser', 'userService'];
    function PaycheckController($uibModalInstance, CurrentUser, userService) {
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

            vm.accounts = CurrentUser.accounts;
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

            if (day > 10 && day < 20) {
                return new Date(year, month + 1, 1);
            } else if (day > 25) {
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

            var bills = CurrentUser.bills;
            var billAccountId = CurrentUser.accounts.filter(function(account) {
                return account.name === 'Bill Expense';
            })[0]._id;

            bills.forEach(function(bill) {
                var nextDueDate;
                if (bill.dayOfMonth <= checkDayOfMonth) {
                    nextDueDate = new Date(vm.check.date.getFullYear(), vm.check.date.getMonth() + 1, bill.dayOfMonth);
                } else {
                    nextDueDate = new Date(vm.check.date.getFullYear(), vm.check.date.getMonth(), bill.dayOfMonth);
                }

                if (nextDueDate.getTime() < nextPayDate.getTime()) {
                    allocate(billAccountId, bill.name, bill.amount, true);
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
            vm.allocations.forEach(function(alloc) {
                logTransaction(alloc.account, alloc.description, alloc.amount);
            });

            var updateObj = {
                _id: CurrentUser._id,
                accounts: CurrentUser.accounts
            };

            userService.update(updateObj)
                .then(function() {
                    close();
                });
        }

        function logTransaction(accountId, description, amount) {
            CurrentUser.accounts.forEach(function(account) {
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