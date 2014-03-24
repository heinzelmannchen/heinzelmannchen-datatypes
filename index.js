var Q = require('q'),
    _ = require('underscore'),
    path = require('path'),
    fsUtil = require('heinzelmannchen-fs'),
    dataTypes = require('./lib/datatypes'),
    mappingFiles = [{ from: 'pg', to: 'heinzel', file: path.join(__dirname, 'lib/mapping/pg2heinzel.json')},
                    { from: 'mysql', to: 'heinzel', file: path.join(__dirname, 'lib/mapping/mysql2heinzel.json')}],
    me = module.exports;

me.map = function(dataType, sourceFormat, destinationFormat) {
    var q = Q.defer(),
        mapper,
        destinationType;

    getMappingFilePath(sourceFormat, destinationFormat)
        .then(function (path){
            return fsUtil.readFileOrReturnData(path);
        })
        .then(function (file){
            mapper = JSON.parse(file);
            q.resolve(mapper[dataType]);
        })
        .catch(function (error){
            q.reject(error);
        });
    return q.promise;
};

function getMappingFilePath(sourceFormat, destinationFormat){
    var q = Q.defer(),
        mappingFile;

    mappingFile = _.findWhere(mappingFiles, {from: sourceFormat.System, to: destinationFormat.System});

    if (mappingFile === undefined) {
        q.reject('no mapping file defined');
    } else {
        q.resolve(mappingFile.file);
    }

    return q.promise;
}