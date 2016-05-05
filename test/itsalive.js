// var mocha = require('mocha');
// var chai = require('chai');
// var expect = chai.expect;
// var spies = require('chai-spies');


// chai.use(spies);


// describe('Simple Test', function() {
//     it("Adds 2 + 2", function() {
//         expect(2 + 2).to.equal(4)
//     })
// });

// describe('SetTimeOUt', function() {
//     it('takes 1000ms', function(done) {
//         setTimeout(function() {
//             done();
//         }, 1000);
//     })
//     it('confirms setTimeout\'s timer accuracy', function(done) {
//         var start = new Date();
//         setTimeout(function() {
//             var duration = new Date() - start;
//             expect(duration).to.be.closeTo(1000, 50);
//             done();
//         }, 1000);
//     });
// })

// describe('For Each Works', function(){
// 	it('calls on each element', function(){
// 		var array = [8,7,6,5,4,3,2,1];

// 		function adds(num){
// 			return num + 1;
// 		}
// 		var spy = chai.spy(adds);
// 		array.forEach(spy);

// 		expect(spy).to.have.been.called.exactly(8);
// 	});
// })