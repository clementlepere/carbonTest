import * as http from 'http';

describe('GET /index', () => {
  beforeEach(() => {
    require('../public/app.ts');
  });

  it('returns App started', (done) => {
    http.request('http://localhost:3000/index', (message) => {
      expect(message.read()).toBe('App started');
      done();
    });
  });

  it('returns 404', (done) => {
    http.request('http://localhost:3000/mars', (response) => {
      expect(response.statusCode).toBe(404);
      done();
    });
  });
});
