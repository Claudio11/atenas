'use strict';

describe('Directive: filterSection', function () {

  // load the directive's module
  beforeEach(module('atenasApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<filter-section></filter-section>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the filterSection directive');
  }));
});
