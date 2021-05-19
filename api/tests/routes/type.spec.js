const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Tipo, conn } = require('../../src/db.js');

const agent = session(app);
const tipo = {
  name: 'wind',
};

describe('Tipo routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Tipo.sync({ force: true })
    .then(() => Tipo.create(tipo)));
  describe('GET /types', () => {
    it('should get 200', () =>
      agent.get('/types').expect(200)
    );
  });
});
