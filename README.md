mongo-external-id
=================

This plugin for mongoose creates a new field called xid in the Schema. This xid is an obfuscated version of the
internal _id, which is a Mongoose ObjectId.

## Installation

  ```npm install mongo-external-id --save```

## Usage

  ```
  var obfuscate = require('monguscate').obfuscate;      // for example
  var mongoExternalId = require('mongo-external-id');
  var SomeSchema = new Schema({...});
  SomeSchema.methods.obfuscate = obfuscate;
  SomeSchema.plugin(mongoExternalId);
  ```

## Tests

  ```npm test```

## Release History

* 0.1.0 Initial release
