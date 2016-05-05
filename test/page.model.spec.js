var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var spies = require('chai-spies');
var Page = require('../models').Page;
var User = require('../models').User;

chai.use(spies);
chai.should();
chai.use(require('chai-things'));

before(function(done) {
    User.sync({ force: true })
        .then(function() {
            return Page.sync({ force: true })
        })
        .then(function() {
            done();
        })
        .catch(done);
});


describe('Page model', function() {

    describe('Virtuals', function() {
        var page;

        beforeEach(function() {
            page = Page.build();

        });

        describe('route', function() {
            it('returns the url_name prepended by "/wiki/"', function() {

                page.urlTitle = 'some_title';
                expect(page.route).to.equal('/wiki/some_title');

            });
        });
        describe('renderedContent', function() {
            it('converts the markdown-formatted content into HTML', function() {

                page.content = "This should be HTML text";
                // console.log('page Rendered', page.renderedContent);
                expect(page.renderedContent.match(/<p>/).length).to.be.equal(1);
            });

        });
    });

    describe('Class methods', function() {
        var page;
        beforeEach(function(done) {
            Page.create({ //has to be create so it is sent to the database
                    title: 'foo',
                    content: 'bar',
                    tags: ['foo', 'bar']
                })
                .then(function(newPage) {
                    page = newPage;
                    done();
                })
                .catch(done);

        });
        describe('findByTag', function() {


            it('gets pages with the search tag', function(done) {


                Page.findByTag('foo')
                    .then(function(pages) {
                        expect(pages).to.have.lengthOf(1) //can also look for page
                        done();
                    })
                    .catch(done);
            });

            it('does not get pages without the search tag', function(done) {

                Page.findByTag('fool')
                    .then(function(pages) {
                        expect(pages).to.have.lengthOf(0)
                        done();
                    })
                    .catch(done);
            });
        });
    });

    describe('Instance methods', function() {
        var pageA, pageB, pageC;

        beforeEach(function(done) {
            Page.create({
                    title: 'Anna',
                    content: 'bar',
                    tags: ['grace', 'hopper']
                })
                .then(function(page) {
                    pageA = page;

                    return Page.create({
                        title: 'Karen',
                        content: 'bar',
                        tags: ['grace', 'kelly']
                    })
                })
                .then(function(page) {
                    pageB = page;

                    return Page.create({
                        title: 'foo',
                        content: 'bar',
                        tags: ['foo', 'bar']
                    })
                })
                .then(function(page) {
                    pageC = page;
                    done();
                })
                .catch(done);
        });

        afterEach(function(done) {
            //console.log("It's me!");
            User.sync({ force: true })
                .then(function() {
                    return Page.sync({ force: true })
                })
                .then(function() {
                    done();
                })
                .catch(done);
        });


        describe('findSimilar', function() {
            it('never gets itself', function(done) {
                pageA.findSimilar()
                    .then(function(similarPages) {
                        expect(similarPages[0]).should.not.include({ title: "Anna" });
                        done();
                    });
            });
            it('gets other pages with any common tags', function(done) {
                pageA.findSimilar()
                    .then(function(similarPages) {
                        expect(similarPages[0]).to.have.property('title').and.equal('Karen');
                        done();
                    });
            });

            it('does not get other pages without any common tags', function(done) {
                pageA.findSimilar()
                    .then(function(similarPages) {
                        expect(similarPages).should.not.include({ title: "foo" });
                        done();
                    });
            });
        });
    });

    describe('Validations', function() {

        var page;

        beforeEach(function() {
            page = Page.build();

        });

        it('errors without title', function(done) {
            page.content = "I'm content";
            page.validate()
                .then(function(pageToValidate) {
                    expect(pageToValidate.errors[0]).to.have.property('path').and.equal('title');
                    done();
                })
        });


        it('errors without content', function(done) {

            page.validate()
                .then(function(pageToValidate) {
                    expect(pageToValidate.errors[2]).to.have.property('path').and.equal('content');
                    done();
                })

        });
        it('errors given an invalid status', function(done) {

            page.title = "A";
            page.urlTitle = "B";
            page.content = 'C';

            page.status = "cat";

            page.save()
                .catch(function(err) {
                    expect(err).to.exist;
                    done();
                });

        });

    });

    describe('Hooks', function() {
         var page;

        beforeEach(function() {
            page = Page.build();

        });

        it('it sets urlTitle based on title before validating', function(done) {
            
            page.title = 'Title of this page';
            page.content = 'Content';


            page.save()
                .then(function(page) {
                    expect(page.urlTitle).to.equal("Title_of_this_page");
                    done();

                })
                .catch(function(error) {
                    console.error(error);
                    done();
                });



        });
    });

});
