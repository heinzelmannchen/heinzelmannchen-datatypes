var heinzelDatatypes = require('../index'),
    dataTypes = require('../lib/datatypes');

require('mocha-as-promised')();

describe('Datatypes', function() {
    describe('#map', function() {
        it('should map postgres integer to heinzel integer', function () {
            var mapper = heinzelDatatypes.createMapper(dataTypes.pg.System, dataTypes.heinzel.System);
            return mapper(dataTypes.pg.Integer).should.become('int');
        });

        it('should map postgres double prescision to heinzel double', function() {
            var mapper = heinzelDatatypes.createMapper(dataTypes.pg.System, dataTypes.heinzel.System);
            return mapper(dataTypes.pg['double precision']).should.become('double');
        });

        it('should fail if mapping file doesn\'t exist', function () {
            var mapper = heinzelDatatypes.createMapper('nonExistingMappingSource', dataTypes.heinzel);
            return mapper(dataTypes.pg.Integer).should.be.rejected;
        });
    });
});