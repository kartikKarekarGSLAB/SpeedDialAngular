'use strict';

/**
 * @ngdoc function
 * @name speedDialApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the speedDialApp
 */
angular.module('speedDialApp')
.controller('SpeedDialCtrl',["$scope", "$http", "speedDialService", "CONSTANT", function ($scope, $http, speedDialService , CONSTANT) {
  
  //Fields required in add speed dial entry.
  $scope.speedDialNumber = '';
  $scope.speedDialName = '';
  $scope.speedDialPhoneNumber = '';
  $scope.speedDialResolution = '';
  $scope.speedDialDepartment = '';
  $scope.speedDialRoomType = '';
  $scope.speedDialLocale = '';
  //Delete record speedDial pk;
  $scope.deleteSpeedDialKey = '';
  $scope.speeddials = [];
  $scope.speedDialNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
  $scope.resolution = [
    {
      name: "High",
      size: "640x480"
    },
    {
      name: "Low",
      size: "352x288"
    }
  ];
  $scope.locationTypes = [{id:'ALL', name: 'All'}];
  //default Filters
  $scope.department = '';
  $scope.roomType = '';
  $scope.locale = '';  
  $scope.editIndex = -1;

  //Set locales list
  speedDialService.getLocales().then(function (response) {
    $scope.locales = response;
  }, function (e) {
    console.log('** inside get locale failure : ',response);
  });

  //Set Department's list.
  speedDialService.getDepartments().then(function (response) {
    $scope.departments = response;
  }, function (e) {
    console.log('** inside get departments failure : ',response);
  });      

  //Set room types list.
  speedDialService.getRoomTypes().then(function (response) {
    response.data.payload.locationTypes.forEach((element) => {
      var name = element.split('_');
      name = name[0].charAt(0).toUpperCase() + name[0].slice(1).toLowerCase() + ' ' + name[1].charAt(0).toUpperCase() + name[1].slice(1).toLowerCase();
      $scope.locationTypes.push( { id:element, name:name } );  
    });
  }, function (e) {
    console.log('** inside get RoomType failure : ',response);
  });
  
  //Set All list of Speed Dial Entry.
  speedDialService.getAllSpeedDialList().then(function (response) {
    $scope.speeddials = response;
  }, function (e) {
    console.log('** inside get Speed Dial failure : ',response);
  });

  $scope.save = function() {
    var requestData = {
      "speeddialPk":null,
      "contactNo":$scope.speedDialPhoneNumber,
      "speeddialNo":$scope.speedDialNumber,
      "entityName":$scope.speedDialName,
      "imageTitle":null,
      "imageURL":null,
      "departments":$scope.speedDialDepartment.includes('ALL') ? [] : $scope.speedDialDepartment,
      "roomTypes":$scope.speedDialRoomType.includes('ALL') ? [] : $scope.speedDialRoomType,
      "locales":$scope.speedDialLocale.includes('ALL') ? [] : $scope.speedDialLocale,
      "callSettings":{
         "resolution":$scope.speedDialResolution
      }
   };

   var requestConfig = {
    headers: {
      "Access-Control-Allow-Origin":"*",
      "Access-Control-Allow-Methods":"DELETE, POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
    }
   };

   console.log(JSON.stringify(requestData));
    var addSpeedDialEntryURL = 'http://localhost:7073/speeddial/phone/speeddial';
    $http.post(addSpeedDialEntryURL, JSON.stringify(requestData), requestConfig).then(function(response) {
        alert('Speed Dial Entry added!!');
    });
  };

  $scope.edit = function(index, value) {
    $scope.editIndex = index;
  };

  $scope.delete = function(index, value) {
    console.log('inside delete option :',value);
    $scope.deleteSpeedDialKey = value.speeddialPk;
  };

  $scope.deleteRecord = function() {
    var config = {
      headers: {
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Methods":"DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
      }
    };
    var deleteURL = CONSTANT.SPEED_DIAL_HOST + CONSTANT.SPEEDDIAL + '/' + $scope.deleteSpeedDialKey;
    $http.delete(deleteURL, config).then(function () {
      console.log('Record deleted !!');
      // This function handles success
      
      }, function () {
      
      // this function handles error
      
      });
  };

  $scope.changeDepartment = function(value) {
    if(value.departmentId) {
      $scope.department = value.departmentId;
    } else {
      $scope.department = '';
    }
    $scope.reload($scope.department, $scope.roomType, $scope.locale);
  };

  $scope.changeRoomType = function(value) {
    if(value.id !== 'ALL') {
      $scope.roomType = value.id;
    } else {
      $scope.roomType = '';
    }
    $scope.reload($scope.department, $scope.roomType, $scope.locale);
  };

  $scope.changeLocale = function(value) {
    if(value.code) {
      $scope.locale = value.code;
    } else {
      $scope.locale = '';
    }
    $scope.reload($scope.department, $scope.roomType, $scope.locale);
  };

  $scope.reload = function(unitId, roomType, locale) {
    speedDialService.reload(unitId, roomType, locale).then(function (response) {
      $scope.speeddials = response;
    }, function (e) {
      console.log('** inside get SpeedDial : Reload failure : ',response);
    });
  };

  }]);
