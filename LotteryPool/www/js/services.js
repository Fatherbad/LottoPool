angular.module('starter.services', [])

    .service('registrationService', function ($http, Backand) {
        var baseurl = '/1/objects/',
            service = this,
            objName = 'player/';

        function getUrl() {
            return Backand.getApiUrl() + baseurl + objName;
        }

        function getUserUrl(userName) {
            return getUrl() + userName;
        }

        service.addUser = function (userInformation) {
            return $http.post(getUrl(), userInformation);
        }

   });
