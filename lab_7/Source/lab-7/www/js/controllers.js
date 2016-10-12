angular.module('starter.controllers', [])

//.controller('LoginCtrl', function ($scope, formData) {
//    $scope.user = formData.getForm();
//})

.controller('HomeCtrl', function ($scope, $state, $cordovaGeolocation) {
    var options = { timeout: 10000, enableHighAccuracy: true };

    $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    }, function (error) {
        console.log("Could not get location");
    });
})

.controller('RegisterCtrl', function ($scope, $state, formData) {
    $scope.user = formData.getForm();

    $scope.submitForm = function (user) {
        if (user.firstName && user.lastName) {
            formData.updateForm(user);
            //            alert("user.firstName:" + formData.getForm().firstName);
            $state.go('login');
        } else {
            alert("Please fill out at least first and last name.");
        }
    };
})

.controller('AboutCtrl', function ($scope, $cordovaAppVersion) {

    document.addEventListener("deviceready", function () {

        $cordovaAppVersion.getVersionNumber().then(function (version) {
            //var appVersion = version;
            $scope.appVersion = version;
            //alert(version)
        });
    }, false);

    $cordovaAppVersion.getVersionCode().then(function (build) {
        //var appBuild = build;
        $scope.appBuild = build;
    });


    $cordovaAppVersion.getAppName().then(function (name) {
        //var appName = name;
        $scope.appName = name;
    });


    $cordovaAppVersion.getPackageName().then(function (package) {
        //var appPackage = package;
        $scope.appPackage = package;
    });
});