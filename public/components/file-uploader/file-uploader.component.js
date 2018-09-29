angular.module('find-ants')
    .component('fileUploader', {
        templateUrl: '/components/file-uploader/file-uploader.component.html',
        bindings: {
            onFileUploaded: '&',
            onFileUploadStarted: '&'
        },
        controller: function (FileUploader, $q) {
            const $ctrl = this;

            $ctrl.$onInit = function $onInit() {
                $ctrl.uploader = new FileUploader();
                $ctrl.uploader.onAfterAddingFile = extractAndNotify;
            };

            $ctrl.openSelector = function openSelector() {
                angular.element('#file-upload-selector').click();
            };

            function extractAndNotify(fileItem) {
                $ctrl.onFileUploadStarted && $ctrl.onFileUploadStarted();
                return extractFileData(fileItem._file)
                    .then(fileData => $ctrl.onFileUploaded({ rawData: fileData }));
            }

            function extractFileData(file) {
                const reader = new FileReader();
                const deferred = $q.defer();
                reader.readAsText(file, "UTF-8");
                reader.onload = function (evt) {
                    deferred.resolve(evt.target.result);
                };
                reader.onerror = function (evt) {
                    deferred.reject(evt);
                };
                return deferred.promise;
            }
        }
    });
