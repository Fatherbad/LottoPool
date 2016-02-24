// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])
.constant('log', '1')
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
        if (cordova.plugins.Keyboard.hideKeyboardAccessoryBar) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
      
    .state('app', {
    url: '/app',
    abstract: true,

        /*
        Additional intelligence required!
        
        TODO: update menu options upon login. may need to be done by passing login boolean from controller
        */
         templateUrl: 'templates/alternateMenu.html',

   /* templateProvider: function (log) {
        console.log('in templateUrl ' +log);
        if (log === "1") {
            return 'alternateMenu.html';
        } else {
            return 'menu.html';
        }
    },*/
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.mainPage', {
      url: '/mainPage',
      views: {
        'menuContent': {
          templateUrl: 'templates/mainPage.html',
          controller: 'mainPageCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/mainPage/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/mainPage');
});
