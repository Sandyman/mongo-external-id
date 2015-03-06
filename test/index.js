/**
 * mongo-external-id
 * Copyright (c) 2015 Sander Huijsen
 * MIT Licensed
 */
expect = require('chai').expect;
should = require('chai').should();
mongoose = require('mongoose');
obfuscate = require('monguscate').obfuscate;
mongoExternalId = require('../index.js');

mongoose.connect("mongodb://:@localhost:27017/mongo-external-id-test");

Schema = mongoose.Schema;

function model(name, schema) {
  if ('string' !== typeof name) {
    schema = name;
    name = 'Model';
  }
  return mongoose.model(name, schema, null, {cache: false});
}


function someSchema() {
  return new Schema({
    username: String
  });
}


describe('mongo-external-id', function() {
  it('Before saving the xid field does not exist, i.e., is undefined', function() {
    var schema = someSchema(),
      User, user;

    schema.plugin(mongoExternalId);
    schema.methods.obfuscate = obfuscate;

    User = model(schema);
    user = new User({username: 'foo'});

    expect(user.xid).to.eql(undefined);
  });

  it('After saving the xid field does exist and equals: obfuscated(user._id.toString())', function() {
    var schema = someSchema(),
      User, user;

    schema.plugin(mongoExternalId);
    schema.methods.obfuscate = obfuscate;

    User = model(schema);
    user = new User({username: 'foo'});

    user.save(function () {
      expect(user.xid).to.eql(obfuscate(user._id.toString()));

      // Clean up
      user.remove();
    });

  });

});
