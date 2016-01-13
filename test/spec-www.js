/**
 * Spec Tests 
 * @file Simple server based test for the application
 * @author Regi Ellis <regi@bynine.io>
 */

 'use strict';

 const Assert = require('assert');
 const Request = require('supertest');
 const Database = require('locallydb');
 const ChildProcess = require('child_process');

 describe('API Server Functions', function() {
    let Server = null;
    const _database = new Database('data/');
    const _collection = _database.collection('test');
    // Simple hack to map "Test Case [idx]" via range/array
    const _test_content = [...Array(10).keys()].map((idx) => {
        let _data = {};
        _data['name'] = `${idx}: Test Data`;
        return _data;
    });

    before('Create the test database', function(done) { 
        _collection.insert(_test_content);
        done();
    });

    beforeEach('Create test database', function(done) {
        Server = require('../server');
        Server.listen();
        done();
    })
    
    describe('All these routes should return 200: ', function() {

        it('GET /TLD should return the deafult route', function tld_spec (done) {
            Request(Server).get('/').expect(200).end(function (error, response) {
                let _reply = response.body;
                Assert.deepEqual(_reply, { status: 200, message: 'Default Route' });
                done();
            });
        });

        it('GET /todos should return a list from the database', function list_spec (done) {
            let _content = _collection.items;
            Request(Server).get('/todos').expect(200).end(function (error, response) {
                let _todos = response.body;
                Assert.deepEqual(_todos, _content);
                done();
            });
        });

        it('GET /todo/:id should return a single object from the database', function find_spec (done) {
            let _content = _collection.get(5);
            Request(Server).get('/todo/5').expect(200).end(function (error, response) {
                let _todo = response.body.todo;
                Assert.deepEqual(_todo, _content);
                done();
            });
        });

        it('PUT /todo/:id should update a single object in the database', function update_spec (done) {
            let _content = {status: 200, updated: true};
            Request(Server).put('/todo/0').send({'name': 'Updated Test'}).expect(200).end(function (error, response) {
                let _todo = response.body;
                Assert.deepEqual(_todo, _content)
                done();
            });
        });

        it('DELETE /todo/:id should delete a single object in the database', function delete_spec (done) {
            let _content = {status: 200, deleted: true };
            Request(Server).delete('/todo/5').expect(200).end(function (error, response) {
                let _todo = response.body;
                Assert.deepEqual(_todo, _content);
                done();
            });
        });

        it('POST /todo should create a single object in the database', function create_spec (done) {
            let _content = {status: 200, saved: true };
            Request(Server).post('/todo').type('json').send({ "name": 'Posted Todo'}).expect(200).end(function (error, response) {
                let _todo = response.body;
                Assert.deepEqual(_todo.saved, _content.saved);
                done();
            });
        }); 
    });

    after('Test Teardown', function(done) {
        ChildProcess.exec('rm -rf data/test', function(error, stdout, stderr) {
            Assert.ifError(error);
            done();
        });
    });

 });
