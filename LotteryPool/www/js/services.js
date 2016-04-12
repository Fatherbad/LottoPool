angular.module('starter.services', [])

    .service('registrationService', function ($http, Backand) {
        var baseurl = '/1/objects/',
            service = this,
            objName = 'player/';

        function getUrl() {
            console.log(Backand.getApiUrl());
            return Backand.getApiUrl() + baseurl + objName;
        }

        service.addUser = function (userInformation) {
            return $http.post(getUrl(), userInformation);
        }

    })

.service('loginService', function ($http, Backand) {
    var baseurl = '/1/objects/',
             service = this,
             objName = 'player/',
             getClause = '?search=';

    function getLoginUrl() {
        console.log(Backand.getApiUrl());
        return Backand.getApiUrl() + baseurl + objName + getClause;
    }

    service.attemptLogin = function (loginData){
        console.log('URL: ' + getLoginUrl() + loginData.username);
        return $http.get(getLoginUrl() + loginData.username);
    }
})

.service('passingService', function () {
    var variable = {};

    var baseurl = '/1/objects/',
             service = this,
             objName = 'player',
             getClause = '?search=';

    function set(info) {
        variable = info;
    }
    function get() {
        return variable;
    }
    service.save = function (info) {
        set(info);
        return 1;
    }
    service.fetch = function () {
        return get();
    }
});
