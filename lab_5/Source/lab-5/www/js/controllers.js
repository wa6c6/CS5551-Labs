angular.module('starter.controllers', [])

.controller('RegisterCtrl', function ($scope, $state) {

    $scope.goRegister = function () {
        //alert("Register!");
        $state.go('/H')
  };
})

.controller('RegisterCtrl', function ($scope, $state, formData) {
    $scope.user = {};

    $scope.submitForm = function (user) {
        if (user.firstName || user.lastName || user.comments) {
            formData.updateForm(user);
            $state.go('login');
        } else {
            alert("Please fill out at least one field.");
        }
    };

})
