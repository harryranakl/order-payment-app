// Import the dependencies for testing
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('./../index');

// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Payment API", () => {
    describe("GET /", () => {
        // Test home page orders
        it("should be payment home page message", (done) => {
             chai.request(app)
                 .get('/api/payment/')
                 .end((err, res) => {
                     res.should.have.status(200);
                     // res.body.should.be.a('string');
                     done();
                  });
         });

        // Test payment - success case
        it("create payment", (done) => {
             chai.request(app)
                 .post('/api/payment/',{
                    "order": "5e08c77d2d76a30aa4499635",
                    "mode": "cash",
                    "amount": "200"
                 })
                 .end((err, res) => {
                     // res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });

        // Test payment - fail case - invaild order
        it("create payment -> invaild order ", (done) => {
             chai.request(app)
                 .post('/api/payment/',{
                    "order": "5e08c77d2d76a30aa4499636",
                    "mode": "cash",
                    "amount": "200"
                 })
                 .end((err, res) => {
                     // res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });

        // Test payment - fail case - Amount must be greater than zero
        it("create payment -> Amount must be greater than zero", (done) => {
             chai.request(app)
                 .post('/api/payment/',{
                    "order": "5e08c77d2d76a30aa4499635",
                    "mode": "cash",
                    "amount": "0"
                 })
                 .end((err, res) => {
                     // res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
    });
});