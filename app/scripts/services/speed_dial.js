angular.module('speedDialApp').service('speedDialService', function( $http ) {

    var self = this;
    this.locales = {};
    this.getLocales = function() {
        return self.locales;
    }
    this.setLocales = function() {
        $http.get('http://localhost:8080/mes/locales').then(function(response) {
            console.log('************ : ',self.getLocales());
            self.locales = response.data.payloadList;
        }); 
    }
});