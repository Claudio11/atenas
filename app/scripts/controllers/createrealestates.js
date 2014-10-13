'use strict';

angular.module('atenasApp')
  	.controller('CreateRealEstatesCtrl', function ($scope, $upload, RealEstate, Picture) {

		$scope.realEstate = new RealEstate({});

		$scope.save = function () {
			$scope.realEstate.save();
		}

		$scope.update = function () {
			console.info('update', $scope.realEstate);
		}

		$scope.setRealEstateCurrency = function (type, transactionType) {
			$scope.realEstate.setCurrency(type, transactionType);
		}

		// User upload a file
		$scope.onFileSelect = function($files) {
		    //$files: an array of files selected, each file has name, size, and type.
		    for (var i = 0; i < $files.length; i++) {
		      var file = $files[i];
		      $scope.upload = $upload.upload({
		        url: 'api/uploadImage', //upload.php script, node.js route, or servlet url
		        //method: 'POST' or 'PUT',
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
		        console.info(data);
		        $scope.realEstate.addImage(new Picture($files[0], data.id, data.path));
		        console.info($scope.realEstate);
		      });
		      //.error(...)
		      //.then(success, error, progress); 
		      // access or attach event listeners to the underlying XMLHttpRequest.
		      //.xhr(function(xhr){xhr.upload.addEventListener(...)})
		    }
		    /* alternative way of uploading, send the file binary with the file's content-type.
		       Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
		       It could also be used to monitor the progress of a normal http post/put request with large data*/
		    // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
		  };


  	});
