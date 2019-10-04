const request = require('supertest');
const app = require("../bin/www");

describe('List users', function() {
    it('should return a 401 status code since Authorization is missing', function(done) {
        request(app)
          .get('/listUsers')
          .set('Authorization', 'abc123')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(401,done)
      });

      it('should return a 200 status code ', function(done) {
        request(app)
          .get('/listUsers')
          .set('Authorization', 'ketan')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200,done)
      });

});


describe('Create users', function() {
    let empty_firstname_user = {
        "firstName" : "",
        "lastName" : "test1234",
        "mobile" : "8874125369",
        "email" : "test@test.com"
    };
    let invalid_firstname_user = {
        "firstName" : "555",
        "lastName" : "test1234",
        "mobile" : "8874125369",
        "email" : "test@test.com"
     };
     let empty_lastname_user = {
        "firstName" : "ketan",
        "lastName" : "",
        "mobile" : "8874125369",
        "email" : "test@test.com"
    };
    let invalid_lastname_user = {
        "firstName" : "ketan",
        "lastName" : "555",
        "mobile" : "8874125369",
        "email" : "test@test.com"
     };
     let empty_email_user = {
        "firstName" : "ketan",
        "lastName" : "pradhan",
        "mobile" : "8874125369",
        "email" : ""
    };
    let invalid_email_user = {
        "firstName" : "ketan",
        "lastName" : "pradhan",
        "mobile" : "8874125369",
        "email" : "test"
     };
     let empty_mobile_user = {
        "firstName" : "ketan",
        "lastName" : "",
        "mobile" : "",
        "email" : "test@test.com"
    };
    let invalid_mobile_user = {
        "firstName" : "ketan",
        "lastName" : "555",
        "mobile" : "88741",
        "email" : "test@test.com"
     };

     let insert_user = {
        "firstName" : "ketan",
        "lastName" : "Pradhan",
        "mobile" : "8884755123",
        "email" : "testnew@test.com"
     };

     let duplicate_mobile = {
        "firstName" : "ketan",
        "lastName" : "Pradhan",
        "mobile" : "7795282023",
        "email" : "testnew@test.com"
     };

     let duplicate_email = {
        "firstName" : "ketan",
        "lastName" : "Pradhan",
        "mobile" : "8884755123",
        "email" : "ketan1@gmail.com"
     };

    it('should return a 403 status code firstName is missing', function(done) {
        request(app)
          .post('/createUser')
          .set('Authorization', 'ketan')
          .send(empty_firstname_user)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(403,done)
      });

      it('should return a 403 status code for invalid firstName', function(done) {
        request(app)
          .post('/createUser')
          .send(invalid_firstname_user)
          .set('Authorization', 'ketan')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(403,done)
      });

      it('should return a 403 status code lastName is missing', function(done) {
        request(app)
          .post('/createUser')
          .send(empty_lastname_user)
          .set('Authorization', 'ketan')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(403,done)
      });

      it('should return a 403 status code for invalid lastName', function(done) {
        request(app)
          .post('/createUser')
          .send(invalid_lastname_user)
          .set('Authorization', 'ketan')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(403,done)
      });

      it('should return a 403 status code mobile is missing', function(done) {
        request(app)
          .post('/createUser')
          .send(empty_mobile_user)
          .set('Authorization', 'ketan')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(403,done)
      });

      it('should return a 403 status code for invalid mobile', function(done) {
        request(app)
          .post('/createUser')
          .send(invalid_mobile_user)
          .set('Authorization', 'ketan')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(403,done)
      });

      it('should return a 403 status code email is missing', function(done) {
        request(app)
          .post('/createUser')
          .send(empty_email_user)
          .set('Authorization', 'ketan')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(403,done)
      });

      it('should return a 403 status code for invalid email', function(done) {
        request(app)
          .post('/createUser')
          .send(invalid_email_user)
          .set('Authorization', 'ketan')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(403,done)
      });


      it('should return a 200 status code for insert user', function(done) {
        request(app)
          .post('/createUser')
          .send(insert_user)
          .set('Authorization', 'ketan')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200,done)
      });


      it('should return a 409 status code for duplicate mobile entry', function(done) {
        request(app)
          .post('/createUser')
          .send(duplicate_mobile)
          .set('Authorization', 'ketan')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(409,done)
      });


      it('should return a 409 status code for duplicate email entry', function(done) {
        request(app)
          .post('/createUser')
          .send(duplicate_email)
          .set('Authorization', 'ketan')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(409,done)
      });

});
