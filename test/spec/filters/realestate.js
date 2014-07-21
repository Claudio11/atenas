'use strict';

describe('Filter: realEstate', function () {

  // load the filter's module
  beforeEach(module('atenasApp'));

  // initialize a new instance of the filter before each test
  var realEstate;
  beforeEach(inject(function ($filter) {
    realEstate = $filter('realEstate');
  }));

  it('should return the input prefixed with "realEstate filter:"', function () {
    var text = 'angularjs';
    expect(realEstate(text)).toBe('realEstate filter: ' + text);
  });

});
