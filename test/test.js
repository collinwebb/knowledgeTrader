var should = require('chai').should(),
    foo = 'bar',
    beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

describe('bar', function() {
  it('be as specified', function () {
    foo.should.be.a('string');
    foo.should.equal('bar');
    foo.should.have.length(3);
    beverages.should.have.property('tea').with.length(3);
  });
});  
