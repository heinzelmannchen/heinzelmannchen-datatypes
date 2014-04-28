var heinzelDatatypes = require('../index'),
    dataTypes = require('../lib/datatypes'),
    dataTypeProvider = require('../lib/datatypesProvider');

require('mocha-as-promised')();

describe('Datatypes', function() {
    describe('#map', function() {
        it('should map postgres integer to heinzel integer', function () {
            var mapper = heinzelDatatypes.createMapper(dataTypeProvider.pg, dataTypeProvider.heinzel);
            return mapper(dataTypes.pg.Integer).should.become('int');
        });

        it('should map postgres double prescision to heinzel double', function() {
            var mapper = heinzelDatatypes.createMapper(dataTypeProvider.pg, dataTypeProvider.heinzel);
            return mapper(dataTypes.pg['double precision']).should.become('double');
        });

        it('should fail if mapping file doesn\'t exist', function () {
            var mapper = heinzelDatatypes.createMapper('nonExistingMappingSource', dataTypeProvider.heinzel);
            return mapper(dataTypes.pg.Integer).should.be.rejected;
        });
    });
});