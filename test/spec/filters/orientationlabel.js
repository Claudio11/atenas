'use strict';

describe('Filter: orientationLabel', function () {

  // load the filter's module
  beforeEach(module('atenasApp'));

  // initialize a new instance of the filter before each test
  var orientationLabel;
  beforeEach(inject(function ($filter) {
    orientationLabel = $filter('orientationLabel');
  }));

  it('should return the input prefixed with "orientationLabel filter:"', function () {
    var text = 'angularjs';
    expect(orientationLabel(text)).toBe('orientationLabel filter: ' + text);
  });

});
