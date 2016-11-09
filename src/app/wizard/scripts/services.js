'use strict';

angular.module('app').service('SegueService', function() {

    var pageContent = [
        {

        /** -- INTRO -- **/
            "index": 0,
            "template": "landing",
            "url": "landing",
            "h1": "You've made it to the Making Sense pilot!",
            "h4": "Let’s get you set up with a Smart Citizen kit, and sensing in no time",
            "segueButton": "LET'S DO THIS"
        },{
            "index": 1,
            "template": "collaborators",
            "url":"making_sense",
            "companyLogo": "app/images/20160301 MAKING SENSE LOGOS-07.png",
            "h2": "Making Sense is a project to help people make sense of their environment.",
            "h4": "We want to help you deploy sensors to help understand sound pollution. By making sense of the issue, we might be able to address it.",
            "segueButton": "SOUNDS GOOD!"
        },
        {
            "index": 2,
            "template": "collaborators",
            "url":"smart_citizen",
            "companyLogo": "app/images/smart_citizen.png",
            "h2": "Smart Citizen is a movement for civic participation in a modern world",
            "h4": "Smart Citizen creates open tools for citizens to be better informed about the world around them.",
            "segueButton": "CONTINUE"
        },{
            "index": 3,
            "template": "basic2",
            "url":"smart_citizen_brief",
            "image": "app/images/sck_glow.png",
            "h2": "The Smart Citizen Kit",
            "h4": "This sensor is a Smart Citizen kit for environmental sensing. It measures sound, air quality, humidity, and lots of other things",
            "segueButton": "CONTINUE"
        },{
            "index": 4,
            "template": "basic2",
            "url":"smart_citizen_brief2",
            "image": "app/images/SCK_macbook.png",
            "h2":"smartcitizen.me",
            "h4": "The sensor sends all the measurements to the Smart Citizen website. It's open and free for all to see, question and play with...",
            "segueButton": "LET'S DO THIS"
        },

    /** -- WHATS IN THE BOX -- **/
        {
            "index": 10,
            "template": "basic",
            "url":"whats_in_the_box",
            "h1": "LET'S SET UP THE SENSOR",
            "h4": "There's a few pieces we need to set up the kit, let's check we have them all",
            "segueButton": "I'M READY"
        },{
            "index": 11,
            "template": "selectparts",
            "url":"kit_parts",
            "h2": "Click on all the things you have received",
            "h4": "We need to know this to make the set up work smoothly",
            "contextButton": "where is my enclosure?",
            "segueButton": "CONTINUE",
            "segueButtonError": "Are you missing parts?"
        },{
            "index": 12,
            "template": "comfirm",
            "url":"confirm_parts",
            "h1": "WELL DONE",
            "h4": "Now let's put it all together",
            "segueButton": "CONTINUE"
        },{
            "index": 13,
            "template": "kitbuild1",
            "url":"kitbuild_1",
            "h2": "First, we connect the sensors",
            "text": "Connect the pins on the [] to the [].",
            "segueButton": "DONE"
        },{
            "index": 14,
            "template": "kitbuild2",
            "url":"kitbuild_2",
            "h2": "Let's give it some power",
            "text": "Connect [] to the [].",
            "segueButton": "DONE"
        },{
            "index": 15,
            "template": "kitbuild3",
            "url":"kitbuild_3",
            "h2": "Turn the sensor on",
            "text": "Push the button on the sensor, once.",
            "segueButton": "IT'S ALIVE"
        },{
            "index": 16,
            "template": "comfirm",
            "url":"confirm_build",
            "h1": "WELL DONE",
            "h4": "Time to connect to the internet",
            "segueButton": "CONTINUE"
        },


    /** -- NAMING -- **/
        {
            "index": 40,
            "template": "basic",
            "url":"sensorName_prep",
            "h1": "LET'S GIVE YOUR SENSOR AN IDENTITY",
            "h4": "This will help us know where this data is coming from...",
            "segueButtonError":"CHECK NAME",
            "segueButton": "CONTINUE"
        },{
            "index": 41,
            "template": "sensorName",
            url: 'sensorName',
            "h1": "Lets give your sensor a name",
            "h4": "This is so we can refer to it later",
            "contextButton": "Chose a random name",
            "segueButtonError":"CHECK NAME",
            "segueButton": "ALL DONE"
        },


    /** -- LOCATION -- **/
        {
            "index": 50,
            "template": "location_prep",
            url: 'location_prep',
            "h2": "Where will you install the sensor?",
            "h4": "PBy pressing 'allow' on the pop up we can determine the current location of the sensor. You can manually adjust this later to anywhere you want to place the sensor.",
            "segueButton": "DONE"
        },{
            "index": 51,
            "template": "location_map",
            url: 'location_map',
            "h2": "If you want to adjust it or pin it elsewhere, you can do that here",
            "h4": "Remember wherever your device goes, it will need wi-fi. Otherwise you'll have to go get it every now and again and connect it to your computer to sync the data",
            "segueButton": "DONE"
        },{
            "index": 52,
            "template": "location_tags",
            url: 'location_tags',
            "h2": "Select which best fits your sensor's home",
            "h4": "This will help us better understand the data you are sensing",
            "segueButton": "All SET"
        },{
            "index": 53,
            "template": "comfirm",
            "url":"confirm_location",
            "h1": "Almost There",
            "h4": "Finally, let's save all this work we've done.",
            "segueButton": "CONTINUE"
        },


    /** -- LIGHT HANDSHAKE -- **/
        {
            "index": 20,
            "template": "wifi_enter",
            "url":"wifi_enter",
            "h2": "What network are you talking to",
            "h4": "We have to type it in manually...",
            "segueButtonError":"CHECK FIELDS",
            "segueButton": "I'M READY"
        },{
            "index": 21,
            "template": "handshake",
            url: 'handshake',
            "h2": "Now let's do some magic...",
            "h4": "Hold up your kit and press it on the screen over the box below and press 'connect'. Make sure the blue side of the kit is facing you",
            "segueButton": "CONNECT"
        },{
            "index": 22,
            "template": "comfirm",
            "url":"confirm_handshake",
            "h1": "WELL DONE",
            "h4": "You've connected your kit to the internet",
            "segueButton": "CONTINUE"
        },


    /** -- WIFI HANDSHAKE -- **/
        {
            "index": 30,
            "template": "pair1",
            "url":"pair_1",
            "h2": "Find your WiFi network from the list below",
            "segueButton": "DONE"
        },{
            "index": 31,
            "template": "pair2",
            "url":"pair_2",
            "h2": "Almost there. What is the Password for the network?",
            "h4": "We need this to set up your device’s connection to the internet",
            "segueButton": "CHECK PASSWORD"
        },{
            "index": 32,
            "template": "basic2",
            "url": 'wifi_success',
            "image": "app/images/sck_iso-1295.jpg",
            "h1": "Success! We've got the sensor online",
            "h4": "Now just go to your wi-fi menu and connect back to your wi-fi network to continue the setup.",
            "segueButton": "ITS ALIVE"
        },


    /** -- ACCOUNT HERE -- **/
        {
            "index": 90,
            "template": "account1",
            url: 'email',
            "h2": "We can save the sensor with your email address",
            "h4": "If you already have an account, we'll add it to that. If not, we'll quickly make a new one",
            "segueButtonError":"CHECK EMAIL",
            "segueButton": "CONTINUE"
        },{
            "index": 91,
            "template": "login",
            url: 'login',
            "h2a": "Awesome, welcome back",
            "h2b":"enter your password below to finish!",
            "h4": "This will push all of your new sensor's data to your account",
            "segueButton": "CONTINUE"
        },{
            "index": 95,
            "template": "make1",
            url: 'username',
            "h2": "And now a username so the community can identify you",
            "h4": "This will be publicly linked to your sensors data",
            "segueButton": "YAY FRIENDS"
        },{
            "index": 96,
            "template": "make2",
            url: 'password',
            "h2": "Now, filly a password to secure everything",
            "h4a": "the password has to be at least 8 characters long",
            "h4b":"And one more time to make sure there are no mistakes",
            "segueButton": "ALL DONE!"
        },{
            "index": 100,
            "template": "final",
            url: 'final',
            "h1":"ITS ALIVE!",
            "h2": "You have successfully installed and connected the Smart Citizen kit to the internet, and then added the kit to the global community of sensors",
            "h4": "Visit SmartCitizen.me to see your sensor in action capturing data. Don't forget to read the manual for assembly instructions and good tips on placing your sensor in the wild",
            "segueButton": "VISIT SMARTCITIZEN.ME"
        }

    ];

    function getPageContent(val){
        for(var i = 0; i < pageContent.length; i++)
        {
            if(pageContent[i].index == val)
            {
                return(pageContent[i]);
            }
        }
    }
    function getURLContent(url){
        for(var i = 0; i < pageContent.length; i++)
        {
            if(pageContent[i].url == url)
            {
                return(pageContent[i]);
            }
        }
    }

    this.prep = function(val){
        return payloadGenerate(getPageContent(val))
    };

    this.nextPage = function(val){
        if (val == 4) {
            return('whats_in_the_box');
        } else if (val == 16) {
            return ('wifi_enter');
        } else if (val == 22) {
            return ('sensorName_prep');
        } else if (val == 41) {
            return ('location_prep');
        } else if (val == 53) {
            return ('email');
        } else if(val == 91){
            return ('final');
        }
        else {
            return getPageContent(val + 1).url;
        }
    };
    this.previousPage = function(val){
        if (val == 10) {
            return('smart_citizen_brief2')
        } else if (val == 20){
            return('confirm_build')
        } else if (val == 40) {
            return ('confirm_handshake');
        } else if (val == 50) {
            return ('sensorName');
        }
        else
        {
            return getPageContent(val - 1).url;
        }
    };

    function payloadGenerate(content){
        var payload = content;
        payload.progressVal = ((content.index + 1) / pageContent.length) * 100;

        payload.companyLogo = content.companyLogo;
        payload.image = content.image;


        if (content.index >= 1) {
            payload.backBlock = '';
        } else {
            payload.backBlock = 'hide';
        }
        if (content.index >= 1) {
            payload.forwardBlock = 'blocked';
        } else {
            payload.forwardBlock = 'hide';
        }

        return payload;
    }

    this.templateRowCounter = function(index){

        var tuples;
        switch (getPageContent(index).template) { //constants for getting rows in templates
            case "basic":
            case "pair1":
                tuples=2;
                break;
            case "sensorName":
            case "final":
                tuples=4;
                break;
            case "make2":
            case "wifi_enter":
                tuples=5;
                break;
            default:
                tuples = 3;
        }
        return tuples; //change to array syntax
    };

}).controller('baseController', function($scope, scopePayload, AnimationService){
    $scope.$parent.payload = scopePayload;
    AnimationService.animate(scopePayload.index);
    $scope.$parent.segueControl ='ready';
    $scope.$parent.smartCitizenToggle = '';
}).controller('smartCitizenController', function($scope, scopePayload, AnimationService){
    $scope.$parent.payload = scopePayload;
    AnimationService.animate(scopePayload.index);
    $scope.$parent.segueControl ='ready';
    $scope.$parent.smartCitizenToggle = 'smartCitizen';
});