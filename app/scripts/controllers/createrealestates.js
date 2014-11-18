'use strict';

angular.module('atenasApp')
  	.controller('CreateRealEstatesCtrl', ['$scope', '$upload', '$routeParams', 'RealEstate', 'Picture',
  		function ($scope, $upload, $routeParams, RealEstate, Picture) {

	  		if ($routeParams.id) {
	  			RealEstate.get($routeParams.id).then(function(responseRE) { 
	  				$scope.realEstate = responseRE;
	  			});
	  		}
	  		else {
	  			$scope.realEstate = new RealEstate({});
	  		}

			$scope.save = function () {
				$scope.realEstate.save();
			}

			$scope.update = function () {
				$scope.realEstate.update();
			}

			// User upload a file
			// Refactor this on asset.
			$scope.onFileSelect = function($files) {
			    //$files: an array of files selected, each file has name, size, and type.
			    for (var i = 0; i < $files.length; i++) {
			      var file = $files[i];
			      $scope.upload = $upload.upload({
			        url: 'api/uploadImage',
			        method: 'POST',
			        //headers: {'header-key': 'header-value'},
			        //withCredentials: true,
			        //data: {myObj: $scope.myModelObj},
			        file: file, // or list of files ($files) for html5 only
			        //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
			        // customize file formData name ('Content-Disposition'), server side file variable name. 
			        //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file' 
			        // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
			        //formDataAppender: function(formData, key, val){}
			      }).success(function(data, status, headers, config) {
			        // file is uploaded successfully
			        $scope.realEstate.addImage(new Picture($files[0], data.id, data.path));
			      });
			      //.error(...)
			      //.then(success, error, progress); 
			      // access or attach event listeners to the underlying XMLHttpRequest.
			      //.xhr(function(xhr){xhr.upload.addEventListener(...)})
			    }
			};
  		}]);
