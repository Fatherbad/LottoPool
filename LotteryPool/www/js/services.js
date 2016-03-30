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
             objName = 'player',
             getClause = '?search=';

    function getLoginUrl() {
        console.log(Backand.getApiUrl());
        return Backand.getApiUrl() + baseurl + objName + getClause;
    }

    service.attemptLogin = function (loginData) {
        console.log(getLoginUrl() + loginData.username);
        var test = $http.get(Backand.getApiUrl() + baseurl + objName +'/3');
        var players = $http.get(getLoginUrl() + loginData.username);
        //var test = JSON.stringify()
        console.log(JSON.stringify(test));
        console.log(players['data']);
        return 1;
        //return $http.post(getUrl(), userInformation);
    }

})

.service('ticketService', function () {
    var ticket = {};

    var service = this;

    function setTicket(ticketInfo) {
        ticket = ticketInfo;
    }
    function getTicket() {
        return ticket;
    }
    service.saveTicket = function (ticket) {
        setTicket(ticket);
        return 1;
    }
    service.fetchTicket = function () {
        return getTicket();
    }
});
