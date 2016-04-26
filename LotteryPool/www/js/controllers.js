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
    $scope.currentUser = {};

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
        
        console.log('Doing login', $scope.loginData.password);
        pass = $scope.loginData.password;
        loginService.attemptLogin($scope.loginData).then(function (results) {
            if (results.data.data[0] == null) {
                console.log('error, invalid user information');

            } else if (results.data.data[0].password == pass) {
                console.log("ayyyyyy");
                $scope.loggedIn = true;
                $scope.loggedOut = false;

                //TODO make a getter and setter in the service.js
                $scope.currentUser = results.data.data[0];
                $scope.closeLogin();
            }
        });

        $scope.loginData = {};
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
        $scope.currentUser = {};
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

.controller('ticketManager', function ($scope, passingService, ticketService) {
    $scope.ticketSelect = passingService.fetch();
    $scope.tickets = {};


    $scope.init = function () {
        console.log('AY');
        ticketService.getTickets($scope.currentUser.id).then(function (results) {
            console.log(results.data.myTickets);
            $scope.tickets = results.data.myTickets;
        });
    }
    $scope.init();

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

.controller('TicketPurchaseController', function ($scope, $stateParams, ticketService) {
    $scope.ticket = {};
   
    $scope.addTicket = function (ticketInfo) {
        console.log($scope.currentUser.id);
        finalTicket = $scope.ticket.b1 + " " + $scope.ticket.b2 + " " + $scope.ticket.b3 + " "
            + $scope.ticket.b4 + " " + $scope.ticket.b5 + " " + $scope.ticket.b6;
        if (finalTicket.length >= 11) {
            $scope.ticketInformation = { number: finalTicket, powerplay: true, date: '12/15/2017', owner: "" + $scope.currentUser.id }
            ticketService.addTicket($scope.ticketInformation)
        }
    }

});