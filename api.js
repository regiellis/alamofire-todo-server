/** appcoda alamofire networking server
 *  http://www.appcoda.com/alamofire-beginner-guide/
 *  
 *  rewrite of the node server used for the appcoda code
 *  base. removed the need for what i feel distracts from 
 *  goals of the article.
 */

 'use strict';
 
 const Assert = require('assert');
 const FileSystem = require('fs');
 const Express = require('express');
 const API = require('express').Router();
 const Database = require('locallydb');

 const DatabasePath = new Database('./data');
 const DatabaseCollection = (process.env.NODE_ENV === 'test') 
     ? DatabasePath.collection('Test')
     : DatabasePath.collection('Todos');

 /**
  * Default Route
  * @desc Default request route returns a simple JSON object
  * @return object
  */

 API.get('/', (request, response) => response.json({
     status: 200,
     message: 'Default Route'
 }));

 /**
  * List Route
  * @desc Returns a lists of todos in the database
  * @return object
  */

 API.get('/todo', (request, response) => {
     response.json(DatabaseCollection.items)
 });

 /**
  * Find by ID
  * @desc Returns a single object by ID
  * @param {number} id
  * @return object
  */

 API.get('/todo/:id', (request, response) => {
     let _todo = parseInt(request.params.id, 10);
     let result = (!DatabaseCollection.get(_todo)) 
         ? { status: 404, message: 'Todo not found' }
         : { status: 200, todo: DatabaseCollection.get(_todo) };

         response.status(result.status).json(result);
 });

 /**
  * Update by ID
  * @desc Updates a single object by ID
  * @param {number} id
  * @return object
  */

 API.put('/todo/:id', (request, response) => {
    let result = null;
    let _todo = parseInt(request.params.id);
    let content = { name: request.body.name };

        result = (!DatabaseCollection.get(_todo))
        ? { status: 400, message: 'Todo could not be updated or does not exist' }
        : { status: 200, action: DatabaseCollection.update(_todo, content) }

        response.status(result.status).json(result);
 });

 /**
  * Delete by ID
  * @desc Deletes a single object by ID
  * @param {number} id
  * @return object
  */

 API.delete('/todo/:id', (request, response) => {
     let _todo = parseInt(request.params.id, 10);
     let _temp = DatabaseCollection.get(_todo) || null;
     let result = (!DatabaseCollection.get(_todo)) 
         ? { status: 400, message: 'Todo has already been deleted or doesn\'t exist' }
         : { status: 200, message: `Deleted`, deleted: DatabaseCollection.remove(_todo) };

         response.status(result.status).json(result);
 });

 /**
  * Create new Todo
  * @desc Creates a new todo based on name
  * @return object
  */
 
 API.post('/todo', (request, response) => {
     let _todo = DatabaseCollection.insert(request.body);
     let result = (!DatabaseCollection.get(_todo)) 
         ? { status: 400, message: 'Todo was not saved' }
         : { status: 200, message: DatabaseCollection.get(_todo), saved: true  };

         response.status(result.status).json(result);
 });

 module.exports = API;

    
