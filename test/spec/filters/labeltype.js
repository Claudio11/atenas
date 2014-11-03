'use strict';

describe('Filter: labelType', function () {

  // load the filter's module
  beforeEach(module('atenasApp'));

  // initialize a new instance of the filter before each test
  var labelType;
  beforeEach(inject(function ($filter) {
    labelType = $filter('labelType');
  }));

  it('should return the input prefixed with "labelType filter:"', function () {
    var text = 'angularjs';
    expect(labelType(text)).toBe('labelType filter: ' + text);
  });

});
