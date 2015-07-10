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
  it('not be as not specified', function () {
    foo.should.not.be.a('array');
    foo.should.not.equal('foo');
    foo.should.not.have.length(4);
    beverages.should.not.have.property('apple');
  });
});
