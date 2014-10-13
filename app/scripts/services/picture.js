'use strict';

angular.module('atenasApp')
  .factory('Picture', function Picture($http, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    /**
     *  Picture constructor
     */
    function Picture(data, id, path) {
    	this.name = data.name;
    	this.size = data.size;
    	this.type = data.type;
        this.id   = id;
        this.path = path;
    	this.webkitRelativePath = data.webkitRelativePath;
    }

    /**
     *  Save {this}.
     */
    // Picture.prototype.save = function(){
    //     var deferred = $q.defer();
    //     var collectedData = {'data': this};
    //     console.info(collectedData);
    //     var self = this;
    //     $http({
    //         data: collectedData,
    //         method: 'POST',
    //         url: 'api/properties/new'
    //     })
    //     .then(function(response) {
    //         if (response.data.status) {
    //             self.id = response.data.id;
    //             alert("Se insertó la propiedad correctamente");
    //         }
    //         else {
    //             alert("La propiedad no ha podido ser insertada");
    //         }
    //     });
    // }

    return Picture;
  });
