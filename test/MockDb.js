'use strict';

function MockDb(options) {
    this.options = options || {};
}
module.exports = MockDb;

// Mock Collection
function MockCollection() {
}
MockCollection.prototype.findAndModify = function (query, sort, update, options, cb) {
    if (typeof options === 'function') {
        cb = options;
    }
    if (typeof cb === 'function') {
        cb(new Error('findAndModify failed for some unknown reason'));
    }
};
MockCollection.prototype.findAndRemove = function (query, sort, options, cb) {
    if (typeof options === 'function') {
        cb = options;
    }
    if (typeof cb === 'function') {
        cb(new Error('findAndModify failed for some unknown reason'));
    }
};
MockCollection.prototype.findOne = function (query, cb) {
    if (typeof cb === 'function') {
        cb(new Error('findOne failed for some unknown reason'));
    }
};

// MockDb prototype
MockDb.prototype.collection = function (name, options, cb) {
    if (typeof options === 'function') {
        cb = options;
    }
    if (this.options.failOnCollection && (typeof cb === 'function')) {
        cb(new Error('Some database error occurred'));
    }
    else {
        cb(null, new MockCollection());
    }
};
