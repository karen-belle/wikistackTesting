var supertest = require('supertest');
var app = require('../app');
var agent = supertest.agent(app);

describe('http requests', function() {

    describe('GET /wiki/', function() {
        it('responds with 200', function(done) {
            agent
                .get('/wiki')
                .expect(200, done);
        });
    });

    describe('GET /wiki/add', function() {
        it('responds with 200');
    });

    describe('GET /wiki/:urlTitle', function() {
        it('responds with 404 on page that does not exist');
        it('responds with 200 on page that does exist');
    });

    describe('GET /wiki/search', function() {
        it('responds with 200');
    });

    describe('GET /wiki/:urlTitle/similar', function() {
        it('responds with 404 for page that does not exist');
        it('responds with 200 for similar page');
    });

    describe('POST /wiki', function() {
        it('responds with 302');
        it('creates a page in the database');
    });

});
