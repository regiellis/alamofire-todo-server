#!/usr/bin/env node

 /**
  * Database Bootstrap
  * @file Bootstrap the database and seed is before using the server
  * @author Regi Ellis <regi@bynine.io>
  */

 'use strict';
 
 const Assert = require('assert');
 const FileSystem = require('fs');
 
 const CLI = require('commander');
 const Chalk = require('chalk');
 const Database = require('locallydb');
 const Debug = require('debug')('bootstrap');

 const internals = {
    seed_data: [...Array(20).keys()].map((idx) => {
       let _data = {};
       _data['name'] = `${idx}: Sample Seeded Data, generated...`;
       return _data;
    })
 };

 CLI
    .version('1.0.0')
    .option('-n, --new', 'Create a new database')
    .option('-c, --collection', 'Create a new collection')
    .option('-s, --seed', 'Seed data into a collection')
    .option('-a, --all', 'Complete setup')
    .parse(process.argv);

 internals.create_container = (func) => {
   FileSystem.stat(internals.path, (error, stats) => {
     if (error) {
       console.log(Chalk.green("Container doesn\'t exist, creating at: \n"), error);
       FileSystem.mkdir(internals.path, '0777', (mkdir_error, stat) => {
         if (error) return func(mkdir_error, null);
         return func(null, stat);
       });
       return;
     }
     console.log(Chalk.red("A database already exists with that name: \n"), stats);
   });
 }

 internals.create_database = (database) => {
   internals.create_container(function(error, stat) {
     Assert.ifError(error);
     internals.database = new Database(internals.path);
   });
 }

 /**
  * Create Collection
  * @desc Creates a new project collection
  * @param {object} database
  */

 internals.create_collection = (collection) => {
   let database = (internals.database)
   ? internals.database
   : new Database('./data')

   process.nextTick(function() {
     return internals.collection = database.collection(collection)
   });
 }
 
 if (CLI.new) {
   internals.path = CLI.args[0].toLowerCase(); 
   process.nextTick(function() {
     return internals.create_database(internals.path);
   });
 }

 if (CLI.collection) {
   internals.collection = CLI.args[0].toLowerCase();
   process.nextTick(function() {
     return internals.create_collection(internals.collection);
   });
 }
 
 if (CLI.seed) {
   let collection = (internals.collection)
     ? internals.collection
     : internals.create_collection(CLI.args[0].toLowerCase());
     
    process.nextTick(function() {
      console.info(Chalk.green('Data has been seed, ready to use'));
      return internals.collection.insert(internals.seed_data);
    })
 }

 if (CLI.all) {
   internals.path = CLI.args[0].toLowerCase();
   internals.database = new Database(CLI.args[0].toLowerCase());
   internals.create_collection(CLI.args[1].toLowerCase());
   
   process.nextTick(function() {
     console.info(Chalk.green('Data has been seed, ready to use'));
     return internals.collection.insert(internals.seed_data);
   })
 } 

 process.on('uncaughtException', function(error) {
   console.error(Chalk.red(`Something blew up, bailing...\n ${error.stack}`));
   process.exit(1);
 });
