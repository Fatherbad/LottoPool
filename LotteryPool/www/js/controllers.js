angular.module('starter.controllers', [])

.controller('AppCtrl', function (Backand, $scope, $location, $ionicModal, $timeout, registrationService, loginService) {

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
        $scope.modal.hide();
        $scope.modal1.hide();

    };
    $scope.logout = function () {
        console.log('Logging out.......');
        //$scope.closeAll();

        $scope.loggedIn = false;
        $scope.loggedOut = true;
        // TODO: Check password/username combo, verify existance in DB
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

.controller('ticketManager', function ($scope, passingService) {
    $scope.ticketSelect = passingService.fetch();

    $scope.tickets = [
      { id: 1, ticknum: '00 11 22 33 44 - 55', date: '3/27/2016', pp: 'yes' },
      { id: 2, ticknum: '11 22 33 44 55 - 66', date: '3/27/2016', pp: 'no' },
      { id: 3, ticknum: '22 33 44 55 66 - 77', date: '3/27/2016', pp: 'no' },
      { id: 4, ticknum: '01 54 53 67 89 - 99', date: '3/27/2016', pp: 'yes' },
      { id: 5, ticknum: '27 68 42 91 04 - 55', date: '3/28/2016', pp: 'no' },
      { id: 6, ticknum: '20 11 12 34 74 - 85', date: '3/28/2016', pp: 'yes' },
      { id: 7, ticknum: '51 22 33 44 55 - 06', date: '3/28/2016', pp: 'yes' },
      { id: 8, ticknum: '52 33 44 55 66 - 67', date: '3/28/2016', pp: 'yes' },
      { id: 9, ticknum: '81 54 53 67 89 - 39', date: '3/28/2016', pp: 'no' },
      { id: 10, ticknum: '17 68 42 91 24 - 55', date: '3/29/2016', pp: 'no' },
      { id: 11, ticknum: '95 67 19 29 02 - 15', date: '3/29/2016', pp: 'no' }
    ];

    $scope.setPassTicket = function (ticket) {
        passingService.save(ticket);
    }
})

.controller('MyPoolController', function ($scope, $stateParams, passingService) {
    $scope.pool = passingService.fetch();

    $scope.pools = [
        { id: 1, date:'3/31/2016', ticknum:'600,000/600,000', pi:0.15},
        { id: 2, date: '4/16/2016', ticknum: '454,789/600,000', pi:0.18},
        { id: 3, date: '4/16/2016', ticknum: '389,724/600,000', pi:1.10},
        { id: 4, date: '5/20/2016', ticknum: '112,899/600,000', pi:0.07 },
        { id: 5, date: '5/20/2016', ticknum: '171,000/600,000', pi:0.04 }
    ];

    $scope.setPool = function (pool){
        passingService.save(pool);
    }
})

.controller('FindPoolController', function ($scope, $ionicPopup, passingService) {
    $scope.pool = passingService.fetch();

    $scope.pools = [
        { id: 2, date:'4/16/2016', taken: '600,000', rem:'0', full: true},
        { id: 3, date: '4/16/2016', taken: '589,724', rem: '10,276', full: false },
        { id: 4, date: '4/16/2016', taken: '312,899', rem: '287,101', full: false },
        { id: 5, date: '4/16/2016', taken: '271,127', rem: '328,873', full: false },
        { id: 6, date: '5/20/2016', taken: '160,980', rem: '439,020', full: false }, 
        { id: 7, date: '5/20/2016', taken: '270,564', rem: '329,436', full: false }
    ];
    $scope.setPool = function (pool) {
        passingService.save(pool);
    }

    $scope.showConfirm = function () {
        var confirmPopup = $ionicPopup.confirm({
            cssClass: 'popup_text',
            title: 'Confirm Join',
            template: 'By confirming you agree to join this pool and pay the requested amount. Are you sure you want to join this lottery pool?'
        });
        confirmPopup.then(function (res) {
            if (res) {
                console.log('Adding user to lottery pool...');
            } else {
                console.log('User declined agreement...');
            }
        });
    };
})

.controller('TicketPurchaseController', function ($scope, $stateParams) {
    $scope.ticket = {};
    //TODO: Add function to submit ticket to backend for player
});