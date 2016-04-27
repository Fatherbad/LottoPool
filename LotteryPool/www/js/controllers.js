angular.module('starter.controllers', [])

.controller('AppCtrl', function (Backand, $scope, $location, $ionicModal, $timeout, $ionicViewService, $state, registrationService, loginService) {

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
                alert('Invalid username/password');

            } else if (results.data.data[0].password == pass) {
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

    //Perform logout
    $scope.logout = function () {
        $ionicViewService.nextViewOptions({
            disableBack: true
        });

        $state.go('app.mainPage');

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
        ticketService.getTickets($scope.currentUser.id).then(function (results) {
            console.log(results.data.myTickets);
            $scope.tickets = results.data.myTickets;
        });
    }

    $scope.setPassTicket = function (ticket) {
        passingService.save(ticket);
    }
})

.controller('MyPoolController', function ($scope, $stateParams, passingService, lottoPoolService) {
    $scope.pool = passingService.fetch();

    $scope.pools = {};
    $scope.init = function () {
        lottoPoolService.getUserPools($scope.currentUser.id).then(function (results) {
            console.log(results.data.player_lotteryPools[0].lotteryPool.id);
            $scope.pools = results.data.player_lotteryPools;
        });
    }

    $scope.setPool = function (pool){
        passingService.save(pool);
    }
})

.controller('FindPoolController', function ($scope, $ionicPopup, passingService, lottoPoolService) {
    //retrieve pool information for single page view.
    $scope.pool = passingService.fetch();

    $scope.pools = {};

    //Retrieve all active/opened lottery pools
    $scope.init = function () {
        lottoPoolService.getOpenPools().then(function (results) {
            $scope.pools = results.data.data;
        });
    }

    //Pass the pool number for the next display that the user would like to view.
    $scope.setPool = function (pool) {
        passingService.save(pool);
    }

    var userPools;
    $scope.isRegistered = false;
    lottoPoolService.getUserPools($scope.currentUser.id).then(function(results) {
        userPools = results.data.player_lotteryPools;
    });

    $scope.showConfirm = function () {
        var confirmPopup = $ionicPopup.confirm({
            cssClass: 'popup_text',
            title: 'Confirm Join',
            template: 'By confirming you agree to pay the amount when before the pool\'s deadline, you also may not leave once you have joined. Are you sure you want to join this lottery pool?'
        });
        confirmPopup.then(function (res) {
            if (res) {
                $scope.registrationInformation = {
                    lotteryPool: $scope.pool.id,
                    owner: $scope.currentUser.id
                };

                /*
                Current buildout for manual pool management
                                                                 VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
                Susceptible to change if process is automated
                */
                
                lottoPoolService.getPool($scope.pool.id).then(function (results) {

                    var registered = results.data.registered,
                        max = results.data.max;
                   

                    for (i = 0; i < userPools.length; i++) {
                        if (userPools[i].lotteryPool.id == $scope.pool.id) {
                            $scope.isRegistered = true;
                        }
                    }
                    if (results.data.isfull || $scope.isRegistered) {
                        console.log('ERROR WAS CAUGHT! User did not join the pool');
                        //TODO: Pool is full or user has joined this pool, need error message
                    } else {
                        $scope.updates;
                        if (1 + registered == max) {

                            $scope.updates = {
                                registered: ++registered,
                                isfull: true
                            }
                        } else {
                            $scope.updates = {
                                registered: ++registered
                            }
                        }
                        console.log('Adding user to lottery pool...');
                        lottoPoolService.updatePool($scope.pool.id, $scope.updates);
                        lottoPoolService.addUser($scope.registrationInformation);
                    };
                })

                
            } else {
                console.log('User declined agreement...');
            }
        });
    };
})

.controller('TicketPurchaseController', function ($scope, $stateParams, $state, ticketService) {
    $scope.ticket = {};
    $scope.price = {
        powerplay: '2.00'
    };
    $scope.isValidPayment = true;
    $scope.pp = false;

    //Function to update mytickets for user
    $scope.storeTicketInfo = function () {
        finalTicket = $scope.ticket.b1 + " " + $scope.ticket.b2 + " " + $scope.ticket.b3 + " "
            + $scope.ticket.b4 + " " + $scope.ticket.b5 + " " + $scope.ticket.b6;
        console.log($scope.price.powerplay);
        if ($scope.price.powerplay == '2.00') {
            $scope.pp = false;
        } else $scope.pp = true;

        if (finalTicket.length >= 11) {
            $scope.ticketInformation = { number: finalTicket, powerplay: $scope.pp, date: '4/30/2016', owner: "" + $scope.currentUser.id }
            ticketService.storeTicket($scope.ticketInformation);
            $state.go('app.payment');
        }
        
    }

})
.controller('paymentController', function($scope, $state, $ionicViewService, ticketService) {
            $scope.cardType = {};
            $scope.card = {};
            
            $scope.makeStripePayment = makeStripePayment;
            
            function makeStripePayment(_cardInformation) {
                //move after plugin is downloaded, to VERIFY
                console.log('here');
                ticketService.addTicket();
                $ionicViewService.nextViewOptions({
                    disableBack: true
                });

                $state.go('app.browse');
                //END move

                return;
            if (!window.stripe) {
            alert("stripe plugin not installed");
            return;
            }
            
            if (!_cardInformation) {
            alert("Invalid Card Data");
            return;
            }
            stripe.charges.create({
                // amount is in cents so * 100
                    amount: _cardInformation.amount * 100,
                    currency: 'usd',
                    card: {
                    "number": _cardInformation.number,
                    "exp_month": _cardInformation.exp_month,
                    "exp_year": _cardInformation.exp_year,
                    "cvc": '123',
                    "name": "Aaron Saunders"
                 },
                     description: "Stripe Test Charge"
                 },
                 function(response) {
                    console.log(JSON.stringify(response, null, 2));
                    alert(JSON.stringify(response, null, 2));
                   //VERIFY, but most likely move here

                 },
                 function(response) {
                    alert(JSON.stringify(response))
                 } // error handler
                 );

            }
            })
.run(function($ionicPlatform) {
     $ionicPlatform.ready(function() {
                          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                          // for form inputs)
                          if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                          
                          }
                          if (window.StatusBar) {
                          StatusBar.styleDefault();
                          }
                          
                          
                          console.log("window.stripe ", window.stripe);
                          //alert(window.stripe);
                          
                          //createCharge()
                          });
     
     function testStripe() {
     // https://stripe.com/docs/api#list_customers
     stripe.customers.list({
                           limit: "2" // both value as string and number are supported
                           },
                           function(response) {
                           console.log(JSON.stringify(response, null, 2));
                           
                           createCustomer();
                           },
                           function(response) {
                           alert(JSON.stringify(response))
                           } // error handler
                           );
     }
     
     
     function createCustomer() {
     // creating a customer: https://stripe.com/docs/api#create_customer
     stripe.customers.create({
                             description: "Aaron Saunders",
                             email: "aaron@clearlyinnovative.com"
                             },
                             function(response) {
                             alert("Customer created:\n\n" + JSON.stringify(response))
                             console.log(JSON.stringify(response, null, 2))
                             },
                             function(response) {
                             alert(JSON.stringify(response))
                             } // error handler
                             );
     }
     });
