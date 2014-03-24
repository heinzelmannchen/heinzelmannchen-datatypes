var heinzelDatatypes = require('../heinzel-datatypes'),
    dataTypes = require('../lib/datatypes');

require('mocha-as-promised')();

describe('Datatypes', function() {
    describe('#map', function() {
        it('should map postgres integer to heinzel integer', function() {
            return heinzelDatatypes.map(dataTypes.pg.Integer, dataTypes.pg, dataTypes.heinzel).should.become('int');
        });

        it('should map postgres double prescision to heinzel double', function() {
            return heinzelDatatypes.map(dataTypes.pg['double precision'], dataTypes.pg, dataTypes.heinzel).should.become('double');
        });

        it('should fail if mapping file doesn\'t exist', function() {
            return heinzelDatatypes.map(dataTypes.pg.Integer, 'nonExistingMappingSource', dataTypes.heinzel).should.be.rejected;
        });
    });
});