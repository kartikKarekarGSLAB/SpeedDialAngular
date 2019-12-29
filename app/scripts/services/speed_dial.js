angular.module('speedDialApp').service('speedDialService', ['$http', '$q', "CONSTANT", function( $http, $q, CONSTANT) {

    //Get all available locales.
    this.getLocales = function() {
        var deferred = $q.defer();
        var url = CONSTANT.MES_HOST + CONSTANT.LOCALES;
        $http.get(url).then(function(response) {
            if ( response.data && response.data.status && response.data.status.statusCode == 200 ) {
                deferred.resolve(response.data.payloadList || []);
            } else {
                deferred.resolve([]);
            }
        });
        return deferred.promise;
    }

    //Get all departments.
    this.getDepartments = function() {
        var deferred = $q.defer();
        var url = CONSTANT.MES_HOST + CONSTANT.DEPARTMENT;
        $http.get( url ).then(function(response) {
            if ( response.data && response.data.status && response.data.status.statusCode == 200 ) {
                deferred.resolve(response.data.payloadList || []);
            } else {
                deferred.resolve([]);
            }            
        });
        return deferred.promise;
    }

    //Get all Room types.
    this.getRoomTypes = function() {
        var deferred = $q.defer();
        var url = CONSTANT.MES_HOST + CONSTANT.LOCATION_TYPE;      
        $http.get( url ).then(function(response) {
            if ( response.data && response.data.status && response.data.status.statusCode == 200 ) {
                deferred.resolve(response || {});                
            } else {
                deferred.resolve({});
            }
        });
        return deferred.promise;
    }

    //Get all Speed Dial list.
    this.getAllSpeedDialList = function() {        
        var deferred = $q.defer();
        var url = CONSTANT.SPEED_DIAL_HOST + CONSTANT.SPEEDDIAL;
        $http.get( url ).then(function(response) {
            if ( response.data && response.data.status && response.data.status.statusCode == 200 ) {
                deferred.resolve(response.data.payloadList || []);                
            } else {
                deferred.resolve([]);
            }
        });
        return deferred.promise;
    }

    this.reload = function(unitId, roomType, locale) {
        var deferred = $q.defer();
        var filterURL = CONSTANT.SPEED_DIAL_HOST + CONSTANT.SPEEDDIAL + '?unitId='+unitId+'&roomType='+roomType+'&locale='+locale+'&includes=config';
        $http.get(filterURL).then(function(response) {
            if ( response.data && response.data.status && response.data.status.statusCode == 200 ) {
                deferred.resolve(response.data.payloadList || []);
            } else {
                deferred.resolve( [] );
            }
        });
        return deferred.promise;
    }

}]);