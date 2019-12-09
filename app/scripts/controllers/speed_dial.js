'use strict';

/**
 * @ngdoc function
 * @name speedDialApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the speedDialApp
 */
angular.module('speedDialApp')
.controller('SpeedDialCtrl', function ($scope, $http) {
  
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
   console.log(JSON.stringify(requestData));
    // var addSpeedDialEntryURL = 'http://pcstaci04.ec.stagrp.com:7073/speeddial/phone/speeddial';
    // $http.post(addSpeedDialEntryURL, JSON.stringify(requestData)).then(function(response) {
    //     alert('Speed Dial Entry added!!');
    // });
  };

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


    // Set Department's list.
    $http.get('http://localhost:8080/mes/departments').then(function(response) {
            $scope.departments = response.data.payloadList;
    });

    // Set room types list.
    $http.get('http://localhost:8080/mes/locations/types').then(function(response) {
      response.data.payload.locationTypes.forEach((element) => {
        var name = element.split('_');
        name = name[0].charAt(0).toUpperCase() + name[0].slice(1).toLowerCase() + ' ' + name[1].charAt(0).toUpperCase() + name[1].slice(1).toLowerCase();
        $scope.locationTypes.push( { id:element, name:name } );  
      });
    });

    // Set locales list.
    $http.get('http://localhost:8080/mes/locales').then(function(response) {
            $scope.locales = response.data.payloadList;
    });

    // Set All list of Speed Dial Entry.
    //pcstaci04.ec.stagrp.com
    
    $http.get('http://localhost:7073/speeddial/phone/speeddial').then(function(response) {
      $scope.speeddials = response.data.payloadList;
    });

    $scope.edit = function(index, value) {
      $scope.editIndex = index;
      console.log('inside edit option :',value);
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
      var deleteURL = 'http://localhost:7073/speeddial/phone/speeddial/' + $scope.deleteSpeedDialKey;
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
      var filterURL = 'http://pcstaci04.ec.stagrp.com:7073/speeddial/phone/speeddial?unitId='+unitId+'&roomType='+roomType+'&locale='+locale+'&includes=config';
      $http.get(filterURL).then(function(response) {
        $scope.speeddials = response.data.payloadList;
      });
    };

  });
