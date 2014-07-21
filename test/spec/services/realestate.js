'use strict';

describe('Service: realEstate', function () {

  // load the service's module
  beforeEach(module('atenasApp'));

  // instantiate service
  var realEstate;
  beforeEach(inject(function (_realEstate_) {
    realEstate = _realEstate_;
  }));

  it('should do something', function () {
    expect(!!realEstate).toBe(true);
  });

});
