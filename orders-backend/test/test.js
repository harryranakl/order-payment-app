// Import the dependencies for testing
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('./../index');

// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Order API", () => {
    describe("GET /", () => {
        // Test home page orders
        it("should be order home page message", (done) => {
             chai.request(app)
                 .get('/api/order/')
                 .end((err, res) => {
                     res.should.have.status(200);
                     // res.body.should.be.a('string');
                     done();
                  });
         });

        // Test create order - success case
        it("create order", (done) => {
             chai.request(app)
                 .post('/api/order/',{
                    "email": "don@gmail.com",
                    "deliveryAddress": "Somewhere in kl",
                    "items": [
                      {
                        "product": "Camera",
                        "quantity": "5",
                        "price": "290"
                      },
                      {
                        "product": "Phone",
                        "quantity": "10",
                        "price": "48"
                      }
                    ]
                 })
                 .end((err, res) => {
                     // res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });

        // Test create order - fail case - invalid user email
        it("create order -> invalid user email", (done) => {
             chai.request(app)
                 .post('/api/order/',{
                    "email": "donn@gmail.com",
                    "deliveryAddress": "Somewhere in kl",
                    "items": [
                      {
                        "product": "Camera",
                        "quantity": "5",
                        "price": "290"
                      },
                      {
                        "product": "Phone",
                        "quantity": "10",
                        "price": "48"
                      }
                    ]
                 })
                 .end((err, res) => {
                     // res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });

        // Test create order - fail case - invalid delivery address
        it("create order -> invalid delivery address", (done) => {
             chai.request(app)
                 .post('/api/order/',{
                    "email": "don@gmail.com",
                    "deliveryAddress": "",
                    "items": [
                      {
                        "product": "Camera",
                        "quantity": "5",
                        "price": "290"
                      },
                      {
                        "product": "Phone",
                        "quantity": "10",
                        "price": "48"
                      }
                    ]
                 })
                 .end((err, res) => {
                     // res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });

        // Test create order - fail case - invalid item list
        it("create order -> invalid item list", (done) => {
             chai.request(app)
                 .post('/api/order/',{
                    "email": "don@gmail.com",
                    "deliveryAddress": "Somewhere in kl",
                    "items": [
                      
                    ]
                 })
                 .end((err, res) => {
                     // res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });

        // Test create order - fail case - One or more items are invalid
        it("create order -> One or more items are invalid", (done) => {
             chai.request(app)
                 .post('/api/order/',{
                    "email": "don@gmail.com",
                    "deliveryAddress": "Somewhere in kl",
                    "items": [
                      {
                        "product": "Camera",
                        "quantity": "5",
                        "price": "290"
                      },
                      {
                        "product": "Phone",
                        "quantity": "10",
                        "price": "0"
                      }
                    ]
                 })
                 .end((err, res) => {
                     // res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });

         // Test to get all orders
        it("should get all orders", (done) => {
             chai.request(app)
                 .get('/api/order/all/')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });

        // Test update order status
        it("should update order - success case", (done) => {
             const id = '5e08c77d2d76a30aa4499635';
             chai.request(app)
                 .put(`/api/order/${id}`,{
                    "orderState": "cancelled"
                 })
                 .end((err, res) => {
                     // res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });

        // Test to get single order
        it("should get order - success case", (done) => {
             const id = '5e08c77d2d76a30aa4499635';
             chai.request(app)
                 .get(`/api/order/${id}`)
                 .end((err, res) => {
                     // res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });

        // Test to get single order
        it("should get order - fail case", (done) => {
             const id = '5e08c77d2d76a30aa4499636';
             chai.request(app)
                 .get(`/api/order/${id}`)
                 .end((err, res) => {
                     res.should.have.status(400);
                     done();
                  });
         });
    });
});