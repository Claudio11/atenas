'use strict';

describe('Directive: realEstateDetail', function () {

  // load the directive's module
  beforeEach(module('atenasApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<real-estate-detail></real-estate-detail>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the realEstateDetail directive');
  }));
});
