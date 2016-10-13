describe('RegisterCtrl', function () {
    var scope;

    beforeEach(angular.mock.module('starter'));
    beforeEach(angular.mock.inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('RegisterCtrl', { $scope: scope }, { $state: '' });
    }));

    it("Checks Register - No Name", function () {
        scope.submitForm({ });
        spyOn(window, 'alert');
        expect(window.alert).toHaveBeenCalledWith('Please fill out at least first and last name.');
    });
});