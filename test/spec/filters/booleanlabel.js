'use strict';

describe('Filter: booleanLabel', function () {

  // load the filter's module
  beforeEach(module('atenasApp'));

  // initialize a new instance of the filter before each test
  var booleanLabel;
  beforeEach(inject(function ($filter) {
    booleanLabel = $filter('booleanLabel');
  }));

  it('should return the input prefixed with "booleanLabel filter:"', function () {
    var text = 'angularjs';
    expect(booleanLabel(text)).toBe('booleanLabel filter: ' + text);
  });

});
