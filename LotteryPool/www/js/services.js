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
})


.service('ticketService', function ($http, Backand) {
    var ticket = {};
    var baseurl = '/1/objects/',
            service = this,
            objName = 'userTickets/',
            retrievebaseurl = '/1/objects/player/';

    function getTicketUrl() {
        return Backand.getApiUrl() + baseurl + objName;
    }

    function getUserTicketUrl(userid){
        return Backand.getApiUrl()+retrievebaseurl+userid+'?deep=true';
    }

    service.addTicket = function () {
        console.log("add ticket: " + ticket);
        return $http.post(getTicketUrl(), ticket);
    }

    service.storeTicket = function (ticketInformation) {
        ticket = ticketInformation;
        console.log('storing ' + ticket)
    }

    service.getTickets = function (userID) {
        console.log('GET URL: ' + getUserTicketUrl(userID));
        return $http.get(getUserTicketUrl(userID));
    }

})

.service('lottoPoolService', function ($http, Backand) {

    var baseurl = '/1/objects/',
            service = this,
            objName = 'lotteryPools/',
            retrievebaseurl = '/1/objects/player_lotteryPools/',
            players = 'player/';

    function getComboUrl() {
        return Backand.getApiUrl() + retrievebaseurl;
    }

    function getPoolUrl() {
        return Backand.getApiUrl() + baseurl + objName;
    }

    function getUserPoolUrl(userid) {
        return Backand.getApiUrl() + baseurl + players + userid + '?deep=true';
    }

    service.getOpenPools = function (userID) {
        return $http.get(getPoolUrl());
    }

    service.addUser = function (registrationInformation) {
        return $http.post(getComboUrl(), registrationInformation);
    }
    service.getPool = function(poolID) {
        return $http.get(getPoolUrl() + poolID);
    }
    service.updatePool = function (poolID, updates) {
        console.log(getPoolUrl()+poolID);
        return $http.put(getPoolUrl() + poolID, updates);
    }
    service.getUserPools = function (userID) {
        return $http.get(getUserPoolUrl(userID));
    }

});
