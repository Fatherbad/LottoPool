angular.module('starter.controllers', [])

.controller('AppCtrl', function (Backand, $scope, $ionicModal, $timeout, registrationService, loginService) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};
    $scope.userInformation = {};
    //$scope.passwordVerification;
    $scope.loggedIn = false;
    $scope.loggedOut = true;

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $ionicModal.fromTemplateUrl('templates/register.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal1 = modal;
    });
    $ionicModal.fromTemplateUrl('templates/alternateMenu.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal2 = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits their login form
    $scope.doLogin = function () {
        $scope.loggedIn = true;
        $scope.loggedOut = false;
        console.log('Doing login', $scope.loginData.username);
        loginService.attemptLogin($scope.loginData);
        // TODO: Add communication with backend, perform the login
        $scope.loginData = {};

        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };

    // Triggered in the register modal to close it
    $scope.closeRegistration = function () {
        $scope.modal1.hide();
    };

    // Open the registration modal
    $scope.register = function () {
        $scope.modal1.show();
    };

    // Perform the registration action when the user submits the registration form
    $scope.doRegister = function () {
        $scope.loggedIn = true;
        $scope.loggedOut = false;
        console.log('Doing Registration', $scope.userInformation.userName);

        registrationService.addUser($scope.userInformation);
        $scope.userInformation = {};

        $timeout(function () {
            $scope.closeRegistration();
        }, 1000);
    };

    $scope.closeAll = function () {
        $scope.modal2.hide();
    };
    $scope.logout = function () {
        console.log('Logging out.......');

        $scope.loggedIn = false;
        $scope.loggedOut = true;
        // TODO: Check password/username combo, verify existance in DB

        $timeout(function () {
            $scope.closeAll();
        }, 1000);
    };

})

.controller('mainPageCtrl', function ($scope) {
    $scope.mainPage = [
      { title: 'Reggae', id: 1 },
      { title: 'Chill', id: 2 },
      { title: 'Dubstep', id: 3 },
      { title: 'Indie', id: 4 },
      { title: 'Rap', id: 5 },
      { title: 'Cowbell', id: 6 }
    ];
})

.controller('ticketManager', function (Backand, $scope, ticketService) {
    $scope.ticketSelect = ticketService.fetchTicket();

    $scope.tickets = [
      { id: 1, ticknum: '00 11 22 33 44 55', date: '3/27/2016' },
      { id: 2, ticknum: '11 22 33 44 55 66', date: '3/27/2016' },
      { id: 3, ticknum: '22 33 44 55 66 77', date: '3/27/2016' },
      { id: 4, ticknum: '01 54 53 67 89 99', date: '3/27/2016' },
      { id: 5, ticknum: '27 68 42 91 04 55', date: '3/28/2016' },
      { id: 6, ticknum: '20 11 12 34 74 85', date: '3/28/2016' },
      { id: 7, ticknum: '51 22 33 44 55 06', date: '3/28/2016' },
      { id: 8, ticknum: '52 33 44 55 66 67', date: '3/28/2016' },
      { id: 9, ticknum: '81 54 53 67 89 39', date: '3/28/2016' },
      { id: 10, ticknum: '17 68 42 91 24 55', date: '3/29/2016'},
      { id: 11, ticknum: '95 67 19 29 02 15', date: '3/29/2016'}
    ];

    $scope.setPassTicket = function (ticket) {
        ticketService.saveTicket(ticket);
    }
})

.controller('PlaylistCtrl', function ($scope, $stateParams) {
});