'use strict';

describe('Filter: transactionImage', function () {

  // load the filter's module
  beforeEach(module('atenasApp'));

  // initialize a new instance of the filter before each test
  var transactionImage;
  beforeEach(inject(function ($filter) {
    transactionImage = $filter('transactionImage');
  }));

  it('should return the input prefixed with "transactionImage filter:"', function () {
    var text = 'angularjs';
    expect(transactionImage(text)).toBe('transactionImage filter: ' + text);
  });

});
