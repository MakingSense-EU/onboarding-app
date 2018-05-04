'use strict';

angular.module('app').factory('platformNotify', function (socketFactory) {
    return socketFactory({
        ioSocket: io.connect('wss://ws.smartcitizen.me')
    });
});

angular.module('app').factory('platform', function($rootScope, SegueService, Restangular, platformNotify) {

    var sessionHeaders = {};

    function setSession(session) {
        sessionHeaders.OnboardingSession = session.onboarding_session;
        Restangular.setDefaultHeaders(sessionHeaders);
    }

    function setAuth(auth) {
        sessionHeaders.Authorization = 'Bearer '  + auth.access_token;
        Restangular.setDefaultHeaders(sessionHeaders);
    }

    function getSession() {
        return Restangular.all('onboarding/device').post({});
    }

    function updateDevice(data) {
        if (data.user_tags_array) data.user_tags = data.user_tags_array.toString(); // Convert Array to String. Restangular fails?
        return Restangular.one('onboarding/device').patch(data);
    }

    function bakeDevice(data) {
        return Restangular.all('onboarding/register').post(data);
    }

    function checkEmail(identity) {
        var data = {
            email: identity
        };
        return Restangular.all('onboarding/user').post(data);
    }

    function login(loginData) {
        return Restangular.all('sessions').post(loginData);
    }

    function createUser(signupData) {
        return Restangular.all('users').post(signupData);
    }


    function listenDevices(then){
        platformNotify.on('data-received', then);
    }

    function listenDevice(id, scope){
        listenDevices(function(data){
          if(id == data.device_id) scope.$emit('published', data);
        })
    }

    function listenTokens(then){
        platformNotify.on('token-received', then);
    }

    function listenToken(token, scope){
        listenTokens(function(data){
          if(token == data.device_token) scope.$emit('token', data);
        })
    }

    function resetPassword(emailString){
        var data = {
            email_or_username: emailString
        };
        return Restangular.all('password_resets').post(data);
    }

    function getTags() {
        return Restangular.all('tags')
          .getList({'per_page': 100})
          // We add .plain() because we don't need full CRUD on Tags.
          .then(function(fetchedTags){
            return fetchedTags.plain();
          });
    }

    return {
        setSession: setSession,
        setAuth: setAuth,
        getSession: getSession,
        updateDevice: updateDevice,
        bakeDevice: bakeDevice,
        checkEmail: checkEmail,
        login: login,
        createUser: createUser,
        listenDevice: listenDevice,
        listenToken: listenToken,
        resetPassword: resetPassword,
        getTags: getTags
    };

});