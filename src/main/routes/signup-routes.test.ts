import request from 'supertest';
import app from '../config/app';

describe('SignUp Routes', () => {
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
