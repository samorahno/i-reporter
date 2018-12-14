import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
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

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkNjg0NTBjYS1kNjMzLTQwM2QtOTdmOC05N2ZhN2JmNTUwMWQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTQ0NzM4NTEwfQ.GBhNVMWUDP6pairm6fsCer-Fi67KitFr9Ohn8lBpcso';
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
        expect(res.body).to.have.property('error').eql('Please enter a valid email address');
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
