const request = require('supertest');
const { Mockgoose } = require('mockgoose');
const app = require('../../app');
const serviceLocator = require('../libs/service-locator');

const mongoose = serviceLocator.get('mongoose');
const mockgoose = new Mockgoose(mongoose);

// mockgoose injection :)
beforeAll((done) => {
  jest.setTimeout(30000);
  mockgoose.prepareStorage().then(() => {
    mongoose.connect('mongodb://inMemory/db', (err) => {
      done(err);
    });
  });
});

describe('Test empty video repository', () => {
  test('empty repository should return 404', (done) => {
    request(app).get('/videos').then((response) => {
      expect(response.statusCode).toBe(404);
      done();
    });
  });
});

describe('Test post endpoint', () => {
  test('post one video should add a video', (done) => {
    request(app).post('/videos')
      .send({ description: 'test', url: 'https://cronos.vidoes/1' })
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.description).toEqual('test');
        done();
      });
  });

  test('post more than one video should add n videos', (done) => {
    request(app).post('/videos')
      .send([{ description: 'test2', url: 'https://cronos.vidoes/2' }, { description: 'test3', url: 'https://cronos.vidoes/3' }])
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(2);
        done();
      });
  });
});

describe('Test get endpoint', () => {
  test('unknown endpoint should return 404', (done) => {
    request(app).get('/videos/unknown').then((response) => {
      expect(response.statusCode).toBe(404);
      done();
    });
  });

  test('get all videos should return all videos', (done) => {
    request(app).get('/videos').then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveLength(3);
      done();
    });
  });

  test('get one video should return one video', (done) => {
    request(app).get('/videos/1').then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].description).toEqual('test');
      done();
    });
  });

  test('unknown id should return 404', (done) => {
    request(app).get('/videos/4').then((response) => {
      expect(response.statusCode).toBe(404);
      done();
    });
  });
});
