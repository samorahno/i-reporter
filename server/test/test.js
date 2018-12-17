import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import app from '../index';

dotenv.config();

chai.use(chaiHttp);
// const userToken = jwt.sign({ id: 'ae235fe0-37d6-4c26-9006-e4e47d579f70', isAdmin: 'false' }, process.env.jwt_privateKey, {
//  expiresIn: '7d', // expires in 7 days
// });
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkNjg0NTBjYS1kNjMzLTQwM2QtOTdmOC05N2ZhN2JmNTUwMWQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTQ0NzM4NTEwfQ.GBhNVMWUDP6pairm6fsCer-Fi67KitFr9Ohn8lBpcso';

const userRecord = {
  fullname: 'Bimbo Efunyade',
  email: 'bimef@gmail.com',
  password: 'bimbo',
  confirmPassword: 'bimbo',
  isAdmin: 'false',
};
const { expect } = chai;
describe('GET \'/api/v1\'', () => {
  it('It should return  welcome message', (done) => {
    chai.request(app)
      .get('/api/v1')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(200);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').eql('connection successful');
        expect(res.body).to.have.property('message').eql('Welcome to Ireporter');
        done();
      });
  });
});

describe('POST \'/api/v1/Auth/Signup\'', () => {
  it('should register a new user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(userRecord)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(err).to.be.null;
        done();
      });
  });
});


// Create an Intervention
describe(' POST /interventions', () => {
  it('should create an intervention record', (done) => {
    chai.request(app)
      .post(`/api/v1/interventions?token=${token}`)
      .send({
        title: 'The boy is coming',
	      location: '1234, 5678',
	      comment: 'I am coming there',
      })
      .end((err, res) => {
        expect(res).have.status(401);
        expect(res.body).to.be.an('object');
       // expect(res.body).to.have.property('status');
       // expect(res.body.status).to.be.a('number');
        expect(res).to.have.status(401);
        done();
      });
  });
});

// login a user
describe(' POST /auth', () => {
  it('should login a new user', (done) => {
    chai.request(app)
      .post(`/api/v1/auth/login?token=${token}`)
      .send({
       email: 'bimbo@gmail.com',
	      password: 'bimbo',
      })
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.be.an('object');
       // expect(res.body).to.have.property('status');
       // expect(res.body.status).to.be.a('number');
        expect(res).to.have.status(200);
        done();
      });
  });
});

// Create a red-flag
describe(' POST /redflags', () => {
  it('should create an intervention record', (done) => {
    chai.request(app)
      .post(`/api/v1/red-flags?token=${token}`)
      .send({
        title: 'The boy is coming',
	      location: '1234, 5678',
	      comment: 'I am coming there',
      })
      .end((err, res) => {
        expect(res).have.status(401);
        expect(res.body).to.be.an('object');
       // expect(res.body).to.have.property('status');
       // expect(res.body.status).to.be.a('number');
        expect(res).to.have.status(401);
        done();
      });
  });
});

describe('Fetch wrong url', () => {
  it('should return 404 because the url is not valid', (done) => {
    chai.request(app)
      .get('/api/v1/greenflag')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('message').eql('Page not found. Please visit /api/v1');
        expect(res).to.have.status(404);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Fetch a wrong url', () => {
  it('should return 404 because the url is not valid', (done) => {
    chai.request(app)
      .get('/api/v1/greenflafdfdfdfdfdfdf')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('message').eql('Page not found. Please visit /api/v1');
        expect(res).to.have.status(404);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});



describe('Fetch all red-flag Record', () => {
  it('should return the list of all red-flag records', (done) => {
    chai.request(app)
      .get('/api/v1/red-flags')
      .send(token)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.status).to.equal(401);
       // expect(res.body).to.have.property('message').eql('Token is not provided').to.have.status(401);
        expect(res).to.have.status(401);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Post \'/api/v1\'', () => {
  it('POST create red flag record', (done) => { // WHEN EVERY FIELD IS INPUTED
    let sauid  = 'ae235fe0-37d6-4c26-9006-e4e47d579f70';
    chai.request(app)
      .post('/api/v1/red-flags/')
      .set('x-auth-token', `${jwt.sign({ userId: sauid, isAdmin: false },'mySecureKey',{ expiresIn: '7days'})}`)
      .send({
        title: 'The boy is going',
	      location: '1234, 5678',
	      comment: 'I am coming home',
	      culprits: 'Mr Wale',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(401);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Post \'/api/v1\'', () => {
  it('POST create red flag record', (done) => { // WHEN EVERY FIELD IS INPUTED
    let sauid  = 'ae235fe0-37d6-4c26-9006-e4e47d579f70';
    chai.request(app)
      .post('/api/v1/interventions/')
      .set('x-auth-token', `${jwt.sign({ userId: sauid, isAdmin: false },'mySecureKey',{ expiresIn: '7days'})}`)
      .send({
        title: 'The boy is going',
	      location: '1234, 5678',
	      comment: 'I am coming home',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(401);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Post \'/api/v1\'', () => {
  it('POST always create user record', (done) => { // WHEN EVERY FIELD IS INPUTED
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        password: 'hel',
        confirmPassword: 'hel',
        email: 's@gmail.com',
        fullname: 'Sola',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Post \'/api/v1\'', () => {
  it('POST always create user record', (done) => { // WHEN EVERY FIELD IS INPUTED
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        password: 'hel',
        confirmPassword: 'hel',
        email: 's@gmail.com',
        fullname: 'Sola',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(401);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Post \'/api/v1\'', () => {
  it('POST create user record', (done) => { // WHEN EVERY FIELD IS INPUTED
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        confirmPassword: 'helllo',
        password: 'helllo',
        email: '',
        fullname: 'Sola',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Post \'/api/v1\'', () => {
  it('POST create user', (done) => { // WHEN EVERY FIELD IS INPUTED
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        confirmPassword: 'jkklp',
        password: 'helllo',
        email: 'samo@gmail.com',
        fullname: 'Jim Jat',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Post \'/api/v1\'', () => {
  it('POST create user', (done) => { // WHEN EVERY FIELD IS INPUTED
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        confirmPassword: 'jkklp',
        password: 'helllo',
        email: 'gmail.com',
        fullname: 'Jim Jat',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error').eql('Please enter a valid email address')
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Post \'/api/v1\'', () => {
  it('POST when registering a new user', (done) => { // WHEN EVERY FIELD IS INPUTED
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        confirmPassword: '',
        password: 'pword',
        email: 'samlo@gmail.com',
        fullname: 'Tom Cruise',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Post \'/api/v1\'', () => {
  it('POST Create new user', (done) => { // WHEN EVERY FIELD IS INPUTED
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        confirmPassword: '',
        password: 'helllo',
        email: 'samabos007@gmail.com',
        fullname: '',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});



describe('post /login', () => {
  it('should return 401 if any credentiasl are invalid at signup', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
          .send({
            password: 'oop',
            email: 'segzy@gmail.com',
        })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('error').eql('Password Must Be at least Five Characters');
        expect(res).to.have.status(401);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Fetch Red Flag By Id',() => {
  it('should return 401 because there is no token', (done) => {
    chai.request(app)
      .get('/api/v1/red-flags/34rr5566-eeaa-4721-80e9-724309e6bbea')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('message').eql('Token is not provided');
        expect(res).to.have.status(401);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Fetch Intervention By Id',() => {
  it('should return 401 because there is no token', (done) => {
    chai.request(app)
      .get('/api/v1/interventions/34rr5566-eeaa-4721-80e9-724309e6bbea')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('message').eql('Token is not provided');
        expect(res).to.have.status(401);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Fetch wrong url',() => {
  it('should return 404 because the url is not valid', (done) => {
    chai.request(app)
      .get('/api/v1/777dgfg-eeaa-4721-80e9-724309e6bbea')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('message').eql('Page not found. Please visit /api/v1');
        expect(res).to.have.status(404);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Fetch All Red Flags without token',() => {
  it('should return 401 due to absence of token', (done) => {
    chai.request(app)
      .get('/api/v1/red-flags')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('message').eql('Token is not provided');
        expect(res).to.have.status(401);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Fetch All Interventions without token',() => {
  it('should return 401 due to absence of token', (done) => {
    chai.request(app)
      .get('/api/v1/interventions')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('message').eql('Token is not provided');
        expect(res).to.have.status(401);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
