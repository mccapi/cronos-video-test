const request = require('supertest');
const app = require('../../app');

describe('Test the root path', () => {
  test('It should response the 404 not found', (done) => {
    request(app).get('/').then((response) => {
      expect(response.statusCode).toBe(404);
      done();
    });
  });
});

describe('Test unknown path', () => {
  test('It should response the 404 not found', (done) => {
    request(app).get('/unknown').then((response) => {
      expect(response.statusCode).toBe(404);
      done();
    });
  });
});
