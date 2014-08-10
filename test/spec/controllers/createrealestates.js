'use strict';

describe('Controller: CreaterealestatesCtrl', function () {

  // load the controller's module
  beforeEach(module('atenasApp'));

  var CreaterealestatesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreaterealestatesCtrl = $controller('CreaterealestatesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
