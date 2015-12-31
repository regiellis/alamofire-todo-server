 /**
  * Database Bootstrap
  * @file Bootstrap the database and seed is before using the server
  * @author Regi Ellis <regi@bynine.io>
  */

 'use strict';
 
 const Assert = require('assert');
 const FileSystem = require('fs');
 const Database = require('locallydb');
 const Debug = require('debug')('bootstrap');

 const DatabasePath = './data';
 const DatabaseName = 'Todos';

 /**
  * Seed Collection
  * @desc Adds sample data to the database
  * @param {object} collection
  */

  function seed_collection (collection) {
      collection.insert([
          { name: "Finish Appcoda's new book" },
          { name: "Purchase Appcoda's advanced book"},
          { name: "Submit a app after finishing all Appcoda's tutorials" }
      ]);
      console.info('Data has been seed, ready to use', collection);
      Debug('Data has been seed, ready to use', collection);
  }

  /**
   * Create Collection
   * @desc Creates a new project collection
   * @param {object} database
   */

  function create_collection (database) {
      let collection = database.collection(DatabaseName);
      seed_collection(collection);
  }
 
  FileSystem.stat(DatabasePath, (error, stats) => {
      if (error) {
          console.log('Database doesn\'t exist, creating');
          FileSystem.mkdir(DatabasePath, '0777', (error, stat) => {
              Assert.ifError(error);
              let _database = new Database(DatabasePath);
              create_collection(_database);
          });
          return;
    }
    console.info('Database already exists:', stats);
    Debug('Database already exists:', stats);
  });


