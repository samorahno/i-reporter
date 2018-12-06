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

describe('post /v1/api/red-flags', () => {
  it('should return 200 if all post values are correct', (done) => {
    chai.request(app)
      .post('/api/v1/red-flags')
      .send({
        title: 'A fraud in the yard',
	      address: '28, adewale street',
	      comment: 'He squandled 40 billion',
	      culprits: 'Mr Nwadike',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('status').eql(200);
        expect(res.body.data).to.have.property('message').eql('Created red-flag record');
        expect(res).to.have.status(200);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('post /v1/api/red-flags', () => {
  it('should return 400 error since the post title is empty', (done) => {
    chai.request(app)
      .post('/api/v1/red-flags')
      .send({
        title: '',
	      address: '28, adewale street',
	      comment: 'He squandled 40 billion',
	      culprits: 'Mr Nwadike',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('status').eql(400);
        expect(res.body).to.have.property('error').eql('enter a title for incident');
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});


describe('post /v1/api/red-flags', () => {
  it('should return a 200 OK if the post culprit is empty', (done) => {
    chai.request(app)
      .post('/api/v1/red-flags')
      .send({
        title: 'The Fraud',
	      address: '28, adewale street',
	      comment: 'He squandled 40 billion',
	      culprits: '',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('status').eql(200);
        expect(res.body.data).to.have.property('message').eql('Created red-flag record');
        expect(res).to.have.status(200);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('post /v1/api/red-flags', () => {
  it('should return 400 error since the post comment is empty', (done) => {
    chai.request(app)
      .post('/api/v1/red-flags')
      .send({
        title: 'The Fraud',
	      address: '28, adewale street',
	      comment: '',
	      culprits: 'MR Eze',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('status').eql(400);
        expect(res.body).to.have.property('error').eql('Please enter a comment');
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('post /v1/api/red-flags', () => {
  it('should return 400 error since the title lenght is less than 3', (done) => {
    chai.request(app)
      .post('/api/v1/red-flags')
      .send({
        title: 'T',
        address: '28, adewale street',
        comment: 'The Fraud happened in 2017',
        culprits: 'MR Eze',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.have.property('status').eql(400);
        expect(res.body).to.have.property('error').eql('enter a title for incident');
        expect(res).to.have.status(400);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('DELETE /red-flag/:incident_id/ for a non-existing record', () => {
  it('it should return a 404 status of record not found', (done) => {
    chai.request(app)
      .delete('/api/v1/red-flags/r5')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('status').eql(404);
        expect(res.body).to.not.be.empty;
        expect(res.body).to.have.property('error').eql('The record with the given id was not found');
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('DELETE /red-flag/:incident_id/ for an existing record', () => {
  it('it should return a 200 OK status of record deleted successfully', (done) => {
    chai.request(app)
      .delete('/api/v1/red-flags/2')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.not.be.empty;
        expect(res.body).to.have.property('status').eql(200);
        expect(res.body).to.have.property('data').which.is.an('object').and.has.property('message').eql('red-flag record has been deleted');
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('PUT /red-flag/:incident_id/ for a non-existing record', () => {
  it('it should return a 404 status of record not found', (done) => {
    chai.request(app)
      .put('/api/v1/red-flags/r5')
      .send({
        title: 'The name is good',
	      address: '28, adewale street',
	      comment: 'The Fraud happened in 2017',
	      culprits: 'MR Eze',
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('status').eql(404);
        expect(res.body).to.not.be.empty;      
        expect(res.body).to.have.property('error').eql('The record with the given id was not found');
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('PUT /red-flag/:incident_id/ for an existing record', () => {
  it('it should return a 200 OK status of Edit Successful', (done) => {
    chai.request(app)
      .put('/api/v1/red-flags/1')
      .send({
        title: 'The name is good',
	      address: '28, adewale street',
	      comment: 'The Fraud happened in 2017',
	      culprits: 'MR Eze',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.not.be.empty;
        expect(res.body).to.have.property('status').eql(200);
        expect(res.body).to.have.property('data').which.is.an('object').and.has.property('message').eql('Updated red-flag record');
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('PATCH /red-flag/:incident_id/comment for an existing record', () => {
  it('it should return a 200 OK status of Edit Successful', (done) => {
    chai.request(app)
      .patch('/api/v1/red-flags/1/comment')
      .send({
        comment: 'The Fraud happened in 2017',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.not.be.empty;
        expect(res.body).to.have.property('status').eql(200);
        expect(res.body).to.have.property('data').which.is.an('object').and.has.property('message').eql('Updated red-flag record comment');
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('PATCH /red-flag/:incident_id/comment for an existing record', () => {
  it('it should return a 400 error since other fields was included in body', (done) => {
    chai.request(app)
      .patch('/api/v1/red-flags/1/comment')
      .send({
        comment: 'The Fraud happened in 2017',
        title: 'A big Fraud',
        address: 'Igbejuleki',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.not.be.empty;
        expect(res.body).to.have.property('status').eql(400);
        expect(res.body).to.have.property('error').eql('sorry, Only the comment can be edited');
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('PATCH /red-flag/:incident_id/comment for a non-existing record', () => {
  it('it should return a 404 status of record not found', (done) => {
    chai.request(app)
      .patch('/api/v1/red-flags/g1/comment')
      .send({
	      comment: 'The Fraud happened in 2017',
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('status').eql(404);
        expect(res.body).to.not.be.empty;      
        expect(res.body).to.have.property('error').eql('The record with the given id was not found');
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('PATCH /red-flag/:incident_id/location for an existing record', () => {
  it('it should return a 200 OK status of Edit Successful', (done) => {
    chai.request(app)
      .patch('/api/v1/red-flags/1/location')
      .send({
        address: '23 Adekola,VI',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.not.be.empty;
        expect(res.body).to.have.property('status').eql(200);
        expect(res.body).to.have.property('data').which.is.an('object').and.has.property('message').eql('Updated red-flag record’s location');
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('PATCH /red-flag/:incident_id/location for an existing record', () => {
  it('it should return a 400 error since address is less than 3', (done) => {
    chai.request(app)
      .patch('/api/v1/red-flags/1/location')
      .send({
        address: '23',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.not.be.empty;
        expect(res.body).to.have.property('status').eql(400);
        expect(res.body).to.have.property('error').eql('Please enter a Location');
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('PATCH /red-flag/:incident_id/location for an existing record', () => {
  it('it should return a 400 error since other fields were included in body', (done) => {
    chai.request(app)
      .patch('/api/v1/red-flags/1/location')
      .send({
        comment: 'The Fraud happened in 2017',
        title: 'A big Fraud',
        address: 'Igbejuleki',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res.body).to.not.be.empty;
        expect(res.body).to.have.property('status').eql(400);
        expect(res.body).to.have.property('error').eql('sorry, Only the address can be edited');
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('PATCH /red-flag/:incident_id/location for a non-existing record', () => {
  it('it should return a 404 status of record not found', (done) => {
    chai.request(app)
      .patch('/api/v1/red-flags/g1/location')
      .send({
	      address: 'Mokola, Ibadan',
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('status').eql(404);
        expect(res.body).to.not.be.empty;      
        expect(res.body).to.have.property('error').eql('The record with the given id was not found');
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

