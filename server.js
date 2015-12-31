/** APPCODA ALAMOFIRE NETWORKING SERVER
 *  http://www.appcoda.com/alamofire-beginner-guide/
 *  
 *  Rewrite of the node server used for the appcoda code
 *  base. Removed the need for what I feel distracts from 
 *  goals of the article.
 *
 * Server Module
 * @module Base Server export and routes
 * @author Regi Ellis <regi@bynine.io>
 */

 'use strict';

 const Assert = require('assert');
 const Express = require('express');
 const BodyParser = require('body-parser');
 const Morgan = require('morgan');
    
 const Server = Express();
 Server.use(Morgan('dev'));
 Server.use(BodyParser.json());

 const API = require('./api');
 Server.use('/', API);

 module.exports = Server

