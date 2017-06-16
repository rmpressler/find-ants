(function() {
    angular.module('find-ants')
        .service('addAccountModal', AddAccountModal);

    AddAccountModal.$inject = ['$uibModal'];
    function AddAccountModal($uibModal) {
        this.open = () => {
            return $uibModal.open({
                size: 'md',
                templateUrl: 'components/modals/add-account/add-account.html',
                controller: AddAccountController,
                controllerAs: 'ctrl'
            }).result;
        }
    }

    AddAccountController.$inject = ['$uibModalInstance'];
    function AddAccountController($uibModalInstance) {
        var ctrl = this;

        ctrl.close = close;
        ctrl.submit = submit;

        init();

        function init() {
            ctrl.accountName = '';
            ctrl.initialBalance = 0;
        }

        function close() {
            $uibModalInstance.dismiss();
        }

        function submit() {
            if (!ctrl.accountName || ctrl.accountName.length === 0) {
                return ctrl.error = 'Please enter a name';
            }
            const newAccount = {
                name: ctrl.accountName,
                transactions: [
                    {
                        date: new Date(),
                        description: 'Initial',
                        amount: ctrl.initialBalance
                    }
                ]
            };

            $uibModalInstance.close(newAccount);
        }
    }
})();