var Q = require('q'),
    _ = require('underscore'),
    path = require('path'),
    fsUtil = require('heinzelmannchen-fs'),
    dataTypes = require('./lib/datatypes'),
    dataTypeProvider = require('./lib/datatypesProvider'),
    mappingFiles = [{ from: dataTypeProvider.pg, to: dataTypeProvider.heinzel, file: path.join(__dirname, 'lib/mapping/pg2heinzel.json') },
                    { from: dataTypeProvider.mysql, to: dataTypeProvider.heinzel, file: path.join(__dirname, 'lib/mapping/mysql2heinzel.json') }],
    me = module.exports;

me.createMapper = function (sourceFormat, destinationFormat) {
    return function map(dataType) {
        var q = Q.defer(),
            mapper,
            destinationType;

        getMappingFilePath(sourceFormat, destinationFormat)
            .then(function (path) {
                return fsUtil.readFileOrReturnData(path);
            })
            .then(function (file) {
                mapper = JSON.parse(file);
                destinationType = mapper[dataType];
                if (mapper[dataType] !== undefined) {
                    q.resolve(destinationType);
                } else {
                    q.reject(new Error('type ' + dataType + 'not defined'));
                }
            })
            .catch(function (error) {
                q.reject(error);
            });
        return q.promise;
    };
};

me.getTypes = function(){
    return dataTypes;
};

function getMappingFilePath(sourceFormat, destinationFormat){
    var q = Q.defer(),
        mappingFile;

    mappingFile = _.findWhere(mappingFiles, {from: sourceFormat, to: destinationFormat});

    if (mappingFile === undefined) {
        q.reject(new Error('no mapping file defined for source ' + sourceFormat + ' and destination ' + destinationFormat));
    } else {
        q.resolve(mappingFile.file);
    }

    return q.promise;
}