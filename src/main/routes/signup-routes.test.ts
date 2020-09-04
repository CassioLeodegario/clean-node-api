import request from 'supertest';
import app from '../config/app';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';

describe('SignUp Routes', () => {
  beforeAll(async() => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async() => {
    await MongoHelper.disconnect();
  });

  beforeEach(async() => {
    const accountCollection = MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  test('Should return on account on success', async() => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Teste',
        email: 'test@test.com',
        password: 'any_pass',
        passwordConfirmation: 'any_pass'
      })
      .expect(200);
  });
});
