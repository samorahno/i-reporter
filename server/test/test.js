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

describe('Fetch all red-flag Record', () => {
  it('should return the list of all red-flag records', (done) => {
    chai.request(app)
      .get('/api/v1/red-flags')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('status').eql(200);
        expect(res).to.have.status(200);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('GET /red-flag/:incident_id/ for a record not existing', () => {
  it('should return an error that record not found', (done) => {
    chai.request(app)
      .get('/api/v1/red-flags/ac')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('status').eql(404);
        expect(res.body).to.have.property('error').eql('The record with the given id was not found');
        expect(res.body).to.not.be.empty;
        done();
      });
  });
});

describe('GET /red-flag/:incident_id/ for an existing record', () => {
  it('it should return the a page that has the record information', (done) => {
    chai.request(app)
      .get('/api/v1/red-flags/2')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status').eql(200);
        expect(res.body).to.not.be.empty;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
