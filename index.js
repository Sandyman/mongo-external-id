/**
 * mongo-external-id
 * Copyright (c) 2015 Sander Huijsen
 * MIT Licensed
 */

/**
 * This plugin adds a field xid to the Schema, which is an external id. It calls a method obfuscate that must be
 * defined in the Schema which obfuscates the internal Mongo ObjectId this._id.
 * @param schema
 * @param options
 */
function externalIdPlugin (schema, options) {
  // External ID is field xid
  schema.add({xid: String});

  // xid is obfuscated version of id - this should be configurable somehow
  schema.pre('save', function externalIdPlugin (next) {
    this.xid = this.obfuscate(this._id.toString());
    next();
  });
}

exports = module.exports = externalIdPlugin;
