'use strict';
/**
 * Created by Lucian on 10/14/16.
 */
angular.module('app').controller('handshakeController', function($scope, scopePayload, AnimationService, $rootScope, platform, $state, $interval, $timeout) {
    $scope.$parent.payload = scopePayload;
    AnimationService.animate(scopePayload.index);

    $scope.handshakeLabel = 'Place Kit Here';
    $scope.handshakeSubLabel = '';

    $scope.$parent.segueControl = 'blocked';

    if ($scope.submittedData.wifi.ssid) {
        $scope.$parent.segueControl = 'ready';
    }

    $scope.showPasswordToggle = 'password';

    recoverPrevWiFi(); //On init recover prev wifi settings when going back

    $scope.ssidListener = function() {
        if ((typeof wifi_ssid.ssid.value !== "undefined") && wifi_ssid.ssid.value.length > 0) {
            $scope.$parent.segueControl = 'ready';
            $scope.payload.segueButton = 'CONTINUE';
            $rootScope.$broadcast('removeError');
            $scope.submittedData.wifi.ssid = wifi_ssid.ssid.value;
        } else {
            $scope.$parent.segueControl = 'blocked';
        }
    };
    $scope.passwordListener = function() {
        $scope.submittedData.wifi.password = wifi_ssid.pass.value;
    };

    $scope.showPassword = function() {
        if ($scope.showPasswordToggle == 'password') {
            $scope.showPasswordToggle = 'text';
        } else {
            $scope.showPasswordToggle = 'password';
        }
    };


    /** -- Handshake Action-- **/
    var gamma = 2.0;
    var levelNum = 9;
    var MIN = 0;
    var MAX = levelNum - 2;
    var REPEAT = levelNum - 1;
    var previousDigit = levelNum + 1;
    var checksum = 0;
    var period = 170;
    var queue = [];
    var payload = "";
    var index = 0;
    var myInterval;
    var lightElement = document.getElementById('handShakeSpace');

    function getColor(value, levelNum) {
        var previous = (value * (255.0 / (levelNum - 1)));
        var final = 255.0 * Math.pow((previous / 255.0), (1.0 / gamma));
        return 'rgb(' + Math.round(final) + ',' + Math.round(final) + ',' + Math.round(final) + ')';
    }
    // Fills div with the requested color value
    function paint(colorValue) {
        lightElement.style.setProperty('background-color', getColor(colorValue, levelNum));
    };

    function outDigit(digit) {
        digit = parseInt(digit);
        if (digit == previousDigit) {
            previousDigit = levelNum + 1;
            queue.push(REPEAT);
        } else {
            queue.push(digit);
            previousDigit = digit
        }
    };

    function ramp(valores) {
        for (var i = 0; i < valores; i++) {
            queue.push(i);
        }
    };

    function sendChar(char) {
        checksum = checksum + char.charCodeAt(0);
        char = char.charCodeAt(0).toString(8);
        while (char.length < 3) {
            char = "0".concat(char)
        }
        for (var i = 0; i < char.length; i++) {
            outDigit(char[i]);
        }
    }

    function setWord(word) {
        payload = payload.concat(word);
        for (var i = 0; i < word.length; i++) {
            sendChar(word[i]);
        }
    }

    function sendChecksum() {
        var toSend = checksum.toString(8);
        while (toSend.length < 6) {
            toSend = "0".concat(toSend);
        }
        for (var i = 0; i < toSend.length; i++) {
            outDigit(toSend[i]);
        }
        console.log("checksum: " + toSend);
    }

    function start(t, callback) {
        if (t) {
            myInterval = $interval(function() {
                paint(queue[index]);
                index = index + 1;
                if (index >= queue.length) {
                    $interval.cancel(myInterval);
                    start(false, callback);
                }
            }, period);
        } else {
            $interval.cancel(myInterval);
            paint(MIN);
            callback();
        }
    }

    function INIT() {
        queue.push(MAX, REPEAT);
        ramp(levelNum);
        queue.push(MIN, REPEAT, MIN, REPEAT);
    }

    function STX() {
        outDigit(0);
        outDigit(0);
        outDigit(2);
    }

    function newLine() {
        outDigit(0);
        outDigit(1);
        outDigit(2);
    }

    function ETX() {
        outDigit(0);
        outDigit(0);
        outDigit(3);
    }

    function EOT() {
        outDigit(0);
        outDigit(0);
        outDigit(4);
    }

    function load(callback) {
        $scope.handshakeLabel = ' ';
        lightElement.style.setProperty('background-color', 'rgb(0, 0, 0)');

        queue = [];
        payload = "";
        checksum = 0;
        index = 0;

        INIT();
        STX();

        console.log($scope.submittedData.wifi.ssid);
        console.log($scope.submittedData.wifi.password);
        console.log($scope.submittedData.deviceData.device_token);

        setWord("auth\n");
        setWord($scope.submittedData.wifi.ssid + "\n"); 
        setWord($scope.submittedData.wifi.password + "\n");
        setWord($scope.submittedData.deviceData.device_token + "\n");

        ETX();
        sendChecksum();
        EOT();

        start(true, callback);
    };

    // On handshake event from wizard controller trigger process (Check this, it might change...)
    $scope.$on('handshake', function() {
        blockSegue();

        platform.listenToken($scope.submittedData.deviceData.device_token, $scope);

        $scope.$on('token', function(e, data) {
            console.log("Token received...");
            prepSegue();
        });

        load(function() {
            waitSegue();
            console.log("Light process done...");
            $scope.watchDog = $timeout(function() {
                if ($scope.$parent.handShakeRepeats < $scope.$parent.handShakeRetries) {
                    $scope.waitForResart = $timeout(function() {
                        blockRestart();
                    }, 3000);
                }
                blockError();
            }, 15000);
        });
    });

    // Starts the handshake
    function blockSegue() {
        $scope.payload.segueButton = 'SENDING';
        $scope.$parent.segueControl = 'blocked';
    }

    //  Handshake finishes and waits for the platform

    function waitSegue() {
        lightElement.style.setProperty('background-color', '#61CD72');
        $scope.$parent.handShakeState = true;
        $scope.handshakeLabel = 'Done! Please, wait';
        $scope.payload.segueButton = 'WAIT';
        $scope.$parent.segueControl = 'blocked';
    }

    //  Platform replies and we move forward

    function prepSegue() {
        $scope.$parent.handShakeRepeats = 0;
        if ($scope.watchDog) $timeout.cancel($scope.watchDog);
        if ($scope.waitForResart) $timeout.cancel($scope.waitForResart); //This is temporary for demo to jump no next step if you have trouble
        $scope.payload.segueButton = 'CONTINUE';
        $scope.$parent.segueControl = 'ready';
        $state.go('wizard.confirm_handshake');
    }

    //  Platform doesn't reply and we show error for a few seconds

    function blockError() {
        $scope.$parent.handShakeState = false;
        $scope.$parent.handShakeRepeats++;
        lightElement.style.setProperty('background-color', '#EF5854');
        $scope.handshakeLabel = "The kit can't connect";
        $scope.payload.segueButton = 'RESTART';
        $scope.$parent.segueControl = 'blocked';
    }

    //  After the error is shown we move user to retype his password

    function blockRestart() {
        $scope.$parent.handShakeState = false;
        $scope.payload.segueButton = 'RESTART';
        $scope.$parent.segueControl = 'blocked';
        $state.go('wizard.wifi_enter');
    }

    function recoverPrevWiFi() {
        setTimeout(function() {
            if (typeof wifi_ssid !== "undefined") {
                wifi_ssid.ssid.value = ($scope.submittedData.wifi.ssid) ? $scope.submittedData.wifi.ssid : '';
                wifi_ssid.pass.value = ($scope.submittedData.wifi.password) ? $scope.submittedData.wifi.password : '';
            }
        }, 0); // This is a trick for ng render cycle
    }

});